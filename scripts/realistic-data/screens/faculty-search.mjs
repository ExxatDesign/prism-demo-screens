import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { student, FACULTY, facultyEmail } from "../universe.mjs";

const NODE_RE = /(>)([^<>{}]{1,400})(<)/g;
const here = path.dirname(fileURLToPath(import.meta.url));

function readSource(filename) {
  const a = process.argv.slice(2);
  const dir = a.includes("--from") ? path.resolve(a[a.indexOf("--from") + 1]) : path.resolve(here, "../../../src/imports");
  return fs.readFileSync(path.join(dir, filename), "utf8");
}

const STAFF_NAMES = new Set(["Denise Carlisle", "Gregory Lang"]);
// Extra people beyond the 15 in the universe, built from the shared student name lists.
const extras = [];
for (let i = 55; extras.length < 20; i++) {
  const s = student(i);
  const name = `${s.first} ${s.last}`;
  if (!FACULTY.some((f) => f.name === name) && !extras.some((e) => e.name === name)) extras.push({ name });
}
const facultyPeople = [...FACULTY.filter((f) => !STAFF_NAMES.has(f.name)), ...extras.slice(0, 14)];
const staffPeople = [...FACULTY.filter((f) => STAFF_NAMES.has(f.name)), ...extras.slice(14)];

const RANKS = new Set(["Associate Lecturer", "Assistant Lecturer", "Full Lecturer", "Assistant Professor", "Associate Professor", "Full Professor", "Other Rank"]);
const SENIOR_POS = /Dean|Chair|Director/;
const DATES = ["10/02/2026", "09/28/2026", "09/23/2026", "09/15/2026", "09/09/2026", "08/31/2026", "08/24/2026", "08/17/2026", "07/29/2026", "07/14/2026", "06/26/2026", "06/12/2026", "05/20/2026"];

function buildPlan(filename) {
  const raw = [];
  readSource(filename).replace(NODE_RE, (m, a, t) => { if (t.trim()) raw.push(t.trim()); return m; });
  const plan = new Map();
  const hdr = raw.indexOf("Last updated on");
  const end = raw.indexOf("Items per page:");
  if (hdr < 0 || end < 0) return { raw, plan };
  let rowStart = hdr + 1, row = 0, fi = 0, si = 0;
  const isDate = (t) => /^\d\d\/\d\d\/\d{4}$/.test(t);
  for (let i = hdr + 1; i < end; i++) {
    if (!isDate(raw[i])) continue;
    const nodes = []; for (let j = rowStart; j <= i; j++) nodes.push(j);
    rowStart = i + 1;
    const comma = nodes.find((j) => raw[j] === ",");
    const typeIdx = nodes.find((j) => j >= comma + 3 && (raw[j] === "Faculty" || raw[j] === "Staff"));
    const activeIdx = nodes.find((j) => j > typeIdx && raw[j] === "Active");
    const isStaff = raw[typeIdx] === "Staff";
    const p = isStaff ? staffPeople[si++ % staffPeople.length] : facultyPeople[fi++ % facultyPeople.length];
    const [first, ...rest] = p.name.split(" ");
    const last = rest.join(" ");
    // last name fragments (before comma)
    for (let j = nodes[0]; j < comma; j++) plan.set(j, j === nodes[0] ? last : "");
    // first name fragments + id (id is the last node before the type cell)
    const idIdx = typeIdx - 1;
    for (let j = comma + 1; j < idIdx; j++) plan.set(j, j === comma + 1 ? first : "");
    plan.set(idIdx, `${isStaff ? "S" : "F"}${10400 + row * 7}`);
    // email fragments
    for (let j = typeIdx + 1; j < activeIdx; j++) plan.set(j, j === typeIdx + 1 ? facultyEmail(p.name) : "");
    // phone
    const phoneIdx = activeIdx + 1;
    if (row % 3 !== 2 || /\d{3}-\d{3}-\d{4}/.test(raw[phoneIdx])) plan.set(phoneIdx, `(214) 555-${String(1100 + row * 37).padStart(4, "0")}`);
    // positions / rank
    const tail = nodes.filter((j) => j > phoneIdx && j < i);
    const firstPos = raw[tail[0]] ?? "";
    for (const j of tail) {
      if (raw[j] === "dds") plan.set(j, "Clinical Coordinator");
      else if (/^Pharma incharge/.test(raw[j])) plan.set(j, "Pharmacy Coordinator");
      else if (raw[j] === "other fac") plan.set(j, "Other Rank");
    }
    const lastTail = tail[tail.length - 1];
    if (lastTail !== undefined && RANKS.has(raw[lastTail]) && SENIOR_POS.test(firstPos) && !isStaff) {
      plan.set(lastTail, row % 2 ? "Professor" : "Associate Professor");
    }
    plan.set(i, DATES[row % DATES.length]);
    row++;
  }
  return { raw, plan };
}

export default {
  files: ["FacultySearch"],
  rules(h, filename) {
    const { raw, plan } = buildPlan(filename);
    let ptr = 0;
    return [
      (text) => {
        if (ptr >= raw.length || raw[ptr] !== text) return undefined;
        return plan.get(ptr++);
      },
    ];
  },
};
