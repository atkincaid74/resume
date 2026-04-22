// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Canonical production host. The site is also served at andrew.kinca.id,
// which 301s here via Firebase Hosting rewrites (see firebase.json).
const SITE = "https://andrew.kincaid.io";

export default defineConfig({
  site: SITE,
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "auto",
  },
  integrations: [sitemap()],
  compressHTML: true,
});
