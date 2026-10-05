#!/usr/bin/env node
/**
 * Apply realistic demo data to the generated import components.
 * Run after every h2d regeneration:  node scripts/realistic-data/run.mjs
 *
 *   --from <dir>   read pristine imports from <dir> instead of rewriting src/imports in place
 *   --only <name>  only run screen rule files whose name contains <name>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHelpers, transform } from "./engine.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const importsDir = path.resolve(here, "../../src/imports");
const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const fromDir = opt("--from") ? path.resolve(opt("--from")) : importsDir;
const only = opt("--only");

const screenFiles = fs
  .readdirSync(path.join(here, "screens"))
  .filter((f) => f.endsWith(".mjs") && (!only || f.includes(only)));

let totalChanged = 0;
for (const sf of screenFiles) {
  const screen = (await import(pathToFileURL(path.join(here, "screens", sf)).href)).default;
  const targets = fs
    .readdirSync(fromDir)
    .filter((f) => f.endsWith(".tsx") && screen.files.some((s) => f.includes(s)));
  for (const file of targets) {
    const source = fs.readFileSync(path.join(fromDir, file), "utf8");
    const { out, changed } = transform(source, screen.rules(createHelpers(), file));
    fs.writeFileSync(path.join(importsDir, file), out);
    totalChanged += changed;
    console.log(`${String(changed).padStart(5)}  ${sf.replace(".mjs", "")}  ${file.slice(0, 70)}`);
  }
  if (!targets.length) console.warn(`  !!   ${sf}: no matching import file`);
}
console.log(`\n${totalChanged} replacements`);
