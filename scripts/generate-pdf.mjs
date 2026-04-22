#!/usr/bin/env node
// Generate the resume PDF (and OG image) from the built Astro site.
//
// Flow:
//   1. Spin up `astro preview` against ./dist on a local port.
//   2. Open /resume/print in Chromium via Playwright, emit PDF.
//   3. Open /og, screenshot to public/og-image.png.
//   4. Copy both into dist/ so a subsequent deploy sees them.
//
// Run after `astro build`. See package.json — `npm run build:full`.

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { mkdir, copyFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const PORT = process.env.PDF_PREVIEW_PORT || "4325";
const HOST = `http://127.0.0.1:${PORT}`;

const PDF_OUT_DIST = join(ROOT, "dist", "andrew-kincaid-resume.pdf");
const PDF_OUT_PUBLIC = join(ROOT, "public", "andrew-kincaid-resume.pdf");
const OG_OUT_DIST = join(ROOT, "dist", "og-image.png");
const OG_OUT_PUBLIC = join(ROOT, "public", "og-image.png");

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return true;
    } catch {
      /* not up yet */
    }
    await sleep(300);
  }
  throw new Error(`Preview server never became ready at ${url}`);
}

async function ensureDist() {
  try {
    await access(join(ROOT, "dist", "index.html"), constants.F_OK);
  } catch {
    throw new Error(
      "No ./dist found. Run `npm run build` before `npm run pdf`."
    );
  }
}

async function main() {
  await ensureDist();
  await mkdir(join(ROOT, "public"), { recursive: true });

  console.log(`▸ Starting astro preview on ${HOST}`);
  const server = spawn(
    "npx",
    ["astro", "preview", "--host", "127.0.0.1", "--port", PORT],
    { cwd: ROOT, stdio: ["ignore", "pipe", "inherit"] }
  );
  // surface preview output without breaking termination logic
  server.stdout?.on("data", (b) => process.stdout.write(`[preview] ${b}`));

  const cleanup = () => {
    if (!server.killed) server.kill("SIGTERM");
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });

  try {
    await waitForServer(HOST);
    console.log("▸ Preview is up.");

    const browser = await chromium.launch();
    const context = await browser.newContext({
      deviceScaleFactor: 2,
    });

    // ----- PDF -----
    console.log("▸ Rendering /resume/print → PDF");
    const page = await context.newPage();
    await page.goto(`${HOST}/resume/print`, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    // wait for fonts
    await page.evaluate(() => document.fonts?.ready);

    await page.pdf({
      path: PDF_OUT_DIST,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
    });
    await copyFile(PDF_OUT_DIST, PDF_OUT_PUBLIC);
    console.log(`  ✓ ${PDF_OUT_DIST}`);

    // ----- OG image -----
    console.log("▸ Rendering /og → PNG");
    const ogPage = await context.newPage();
    await ogPage.setViewportSize({ width: 1200, height: 630 });
    await ogPage.goto(`${HOST}/og`, { waitUntil: "networkidle" });
    await ogPage.evaluate(() => document.fonts?.ready);
    const ogEl = await ogPage.$(".og");
    if (!ogEl) throw new Error("OG container .og not found on /og");
    await ogEl.screenshot({ path: OG_OUT_DIST, type: "png" });
    await copyFile(OG_OUT_DIST, OG_OUT_PUBLIC);
    console.log(`  ✓ ${OG_OUT_DIST}`);

    await browser.close();
  } finally {
    cleanup();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
