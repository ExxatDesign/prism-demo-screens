/**
 * Commit and push using project deps (isomorphic-git + gh token).
 * Use when system git is unavailable; run from repo root via npm run push.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const DEFAULT_AUTHOR = {
  name: "ExxatDesign",
  email: "41898282+ExxatDesign@users.noreply.github.com",
};

function usage() {
  console.error(`Usage: npm run push -- "<commit message>"

Stages all changed tracked/untracked files (except node_modules, __pycache__, .claude/)
and pushes origin/main using \`gh auth token\`.`);
  process.exit(1);
}

const argv = process.argv.slice(2);
const dashIdx = argv.indexOf("--");
const messageParts = dashIdx >= 0 ? argv.slice(dashIdx + 1) : argv;
const message = messageParts.join(" ").trim();
if (!message) usage();

const token = execSync("gh auth token", { encoding: "utf8", cwd: dir }).trim();

function shouldSkip(filepath) {
  return (
    filepath.includes("__pycache__") ||
    filepath.startsWith(".claude/") ||
    filepath === "node_modules" ||
    filepath.startsWith("node_modules/")
  );
}

const matrix = await git.statusMatrix({ fs, dir });
const paths = matrix
  .filter(
    ([fp, head, workdir, stage]) =>
      !shouldSkip(fp) && (head !== workdir || head !== stage || workdir !== stage),
  )
  .map(([fp]) => fp);

if (paths.length === 0) {
  console.log("Nothing to commit; checking push…");
} else {
  for (const filepath of paths) {
    await git.add({ fs, dir, filepath });
  }

  const sha = await git.commit({
    fs,
    dir,
    message,
    author: DEFAULT_AUTHOR,
  });
  console.log(`Committed ${paths.length} path(s):`, sha);
}

await git.push({
  fs,
  http,
  dir,
  remote: "origin",
  ref: "main",
  onAuth: () => ({ username: token, password: "x-oauth-basic" }),
});

console.log("Pushed main → origin (GitHub Pages deploy runs on push to main).");
