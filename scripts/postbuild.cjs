// scripts/postbuild.cjs
// GitHub Pages has no server-side rewrites, so a deep refresh like
// /rjv_studio_tvr/portfolio returns a 404. Shipping 404.html as an exact
// copy of index.html makes GH Pages serve the app for any unknown path,
// and React Router restores the requested route from the URL.
const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "dist", "index.html");
const target = path.join(__dirname, "..", "dist", "404.html");

if (!fs.existsSync(source)) {
  console.error("dist/index.html not found — run vite build first.");
  process.exit(1);
}

fs.copyFileSync(source, target);
console.log("OK dist/404.html created (SPA fallback for GitHub Pages)");