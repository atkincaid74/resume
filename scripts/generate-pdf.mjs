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

import { createServer } from "node:http";
import { setTimeout as sleep } from "node:timers/promises";
import { mkdir, copyFile, access, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

const PORT = Number(process.env.PDF_PREVIEW_PORT || 4325);
const HOST = `http://127.0.0.1:${PORT}`;
const DIST = join(ROOT, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

async function fileExists(p) {
  try {
    const s = await stat(p);
    return s.isFile();
  } catch {
    return false;
  }
}

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const safe = normalize(clean).replace(/^(\.\.[/\\])+/, "");
  const base = join(DIST, safe);
  const candidates = [
    base,
    base.endsWith("/") || !extname(base) ? join(base, "index.html") : null,
    extname(base) ? null : `${base}.html`,
  ].filter(Boolean);
  for (const c of candidates) {
    if (await fileExists(c)) return c;
  }
  return null;
}

function startServer() {
  return new Promise((resolve, reject) => {
    const srv = createServer(async (req, res) => {
      try {
        const file = await resolveFile(req.url || "/");
        if (!file) {
          res.writeHead(404, { "content-type": "text/plain" });
          res.end("not found");
          return;
        }
        const body = await readFile(file);
        res.writeHead(200, {
          "content-type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
          "cache-control": "no-store",
        });
        res.end(body);
      } catch (e) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end(String(e));
      }
    });
    srv.on("error", reject);
    srv.listen(PORT, "127.0.0.1", () => resolve(srv));
  });
}

const PDF_OUT_DIST = join(ROOT, "dist", "andrew-kincaid-resume.pdf");
const PDF_OUT_PUBLIC = join(ROOT, "public", "andrew-kincaid-resume.pdf");
const OG_OUT_DIST = join(ROOT, "dist", "og-image.png");
const OG_OUT_PUBLIC = join(ROOT, "public", "og-image.png");

async function ensureDist() {
  try {
    await access(join(DIST, "index.html"), constants.F_OK);
  } catch {
    throw new Error(
      "No ./dist found. Run `npm run build` before `npm run pdf`."
    );
  }
}

async function main() {
  await ensureDist();
  await mkdir(join(ROOT, "public"), { recursive: true });

  console.log(`▸ Starting static server on ${HOST}`);
  const server = await startServer();

  const cleanup = () => {
    try {
      server.close();
    } catch {
      /* ignore */
    }
  };
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: 2 });

    const NAV = { waitUntil: "load", timeout: 30_000 };

    // ----- PDF -----
    console.log("▸ Rendering /resume/print → PDF");
    const page = await context.newPage();
    page.setDefaultTimeout(30_000);
    await page.goto(`${HOST}/resume/print`, NAV);
    await page.emulateMedia({ media: "print" });
    try {
      await page.evaluate(() => document.fonts && document.fonts.ready);
    } catch {
      /* old Chromium safety */
    }
    await sleep(150);

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
    ogPage.setDefaultTimeout(30_000);
    await ogPage.setViewportSize({ width: 1200, height: 630 });
    await ogPage.goto(`${HOST}/og`, NAV);
    try {
      await ogPage.evaluate(() => document.fonts && document.fonts.ready);
    } catch {
      /* ignore */
    }
    await sleep(150);
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
