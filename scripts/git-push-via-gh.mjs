import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import { execSync } from "node:child_process";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const token = execSync("gh auth token", { encoding: "utf8" }).trim();

const paths = [
  "src/app/App.tsx",
  "src/app/DemoNav.tsx",
  "scripts/responsive-audit.mjs",
  "src/styles/h2d-render-fixes.css",
  "src/imports/StepsExxatComAdminTenantApps1440WDefault.tsx",
  "public/assets/asset_956cce07.png",
  "public/assets/asset_1d6b58d2.svg",
];

for (const filepath of paths) {
  const full = path.join(dir, filepath);
  if (!fs.existsSync(full)) {
    console.error(`Missing: ${filepath}`);
    process.exit(1);
  }
  await git.add({ fs, dir, filepath });
}

const sha = await git.commit({
  fs,
  dir,
  message:
    "Add Tenant Apps demo screen and tune layout for full-height tiles.",
  author: {
    name: "ExxatDesign",
    email: "41898282+ExxatDesign@users.noreply.github.com",
  },
});

console.log("Committed:", sha);

await git.push({
  fs,
  http,
  dir,
  remote: "origin",
  ref: "main",
  onAuth: () => ({ username: token, password: "x-oauth-basic" }),
});

console.log("Pushed main to origin");
