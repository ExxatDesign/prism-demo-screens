import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { student, DEMO_STUDENT } from "../universe.mjs";

const NODE_RE = /(>)([^<>{}]{1,400})(<)/g;
const here = path.dirname(fileURLToPath(import.meta.url));

function readSource(filename) {
  const a = process.argv.slice(2);
  const dir = a.includes("--from") ? path.resolve(a[a.indexOf("--from") + 1]) : path.resolve(here, "../../../src/imports");
  return fs.readFileSync(path.join(dir, filename), "utf8");
}

const NICK = { Daniel: "Dan", Hannah: "Hanna", Samuel: "Sam", Anthony: "Tony", Elijah: "Eli", Jonah: "Jon", Isaiah: "Zay", Dominic: "Dom", Julian: "Jules", Marcus: "Marc", Brandon: "Bran", Harrison: "Harry", Victor: "Vic", Maya: "Mia", Caleb: "Cal", Ethan: "E.J.", Noah: "Noey" };
const OFFSET = { DPT: 3, OTD: 3, PA: 2, SLP: 2, MSAT: 2, MPH: 2, PharmD: 4, RT: 2, MLS: 2, HI: 2 };
const pad = (n) => String(n).padStart(2, "0");

/** Enrollment term + start date and graduation derived from the cohort label. */
function enrollment(cohort) {
  const m = cohort.match(/^(\w+)\s+(?:Class of|Cohort)\s+(\d{4})$/);
  if (m) {
    const y = Number(m[2]) - OFFSET[m[1]];
    return { term: `Fall ${y}`, date: `(08/${pad(17 + (y % 5))}/${y})` };
  }
  const b = cohort.match(/^BSN (Fall|Spring) (\d{4})$/);
  return { term: `${b[1]} ${b[2]}`, date: b[1] === "Fall" ? `(08/24/${b[2]})` : `(01/12/${b[2]})` };
}

function buildPlan(filename) {
  const raw = [];
  readSource(filename).replace(NODE_RE, (m, a, t) => { if (t.trim()) raw.push(t.trim()); return m; });
  const plan = new Map(); // index -> replacement
  const hdr = raw.indexOf("Student category");
  const end = raw.indexOf("Items per page:");
  if (hdr < 0 || end < 0) return { raw, plan };
  const starts = [];
  for (let i = hdr + 1; i < end; i++) if (raw[i].includes(",") && !raw[i].includes("@")) starts.push(i);
  let counter = 1;
  starts.forEach((s, k) => {
    const e = k + 1 < starts.length ? starts[k + 1] : end;
    const nodes = []; for (let i = s; i < e; i++) nodes.push(i);
    const isDemo = /^Alyson,/.test(raw[s]);
    const st = isDemo ? null : student(k === 0 ? 0 : counter++);
    const S = isDemo
      ? { ...DEMO_STUDENT, category: "Full-time" }
      : st;
    const pref = raw[s].match(/\(([^)]*)\)/);
    let display = `${S.first}, ${S.last}`;
    if (pref && !isDemo) display = `${S.first} (${NICK[S.first] ?? S.first.slice(0, 4)}), ${S.last}`;
    if (k === 0) display = `${S.first} , ${S.last}`;
    plan.set(s, display);
    const en = enrollment(S.cohort);
    const aIdx = nodes.find((i) => raw[i] === "Active");
    for (const i of nodes) {
      const t = raw[i];
      if (i === s) continue;
      if (k === 0 && t === "Preferred name : alex)") plan.set(i, `Preferred name : ${NICK[S.first] ?? S.first.slice(0, 4)})`);
      else if (/^\d{6,}$/.test(t) && i < aIdx) plan.set(i, S.id);
      else if (t.includes("@")) plan.set(i, S.email);
      else if (/^\(\d{3}\) /.test(t)) plan.set(i, S.phone);
    }
    if (k === 0) {
      // Row with extra columns: cohort, enrollment, graduation, campus, category
      const after = nodes.filter((i) => i > aIdx).map((i) => i);
      plan.set(after[0], S.cohort);
      plan.set(after[1], "Fall 2026");
      plan.set(after[2], "Spring 2029");
      plan.set(after[3], S.campus);
      plan.set(after[4], S.category);
      return;
    }
    const after = nodes.filter((i) => i > aIdx);
    const dateIdx = after.find((i) => /^\(\d\d\/\d\d\/\d{4}\)$/.test(raw[i]));
    plan.set(after[0], S.cohort);
    const termIdx = after[after.indexOf(dateIdx) - 1];
    plan.set(termIdx, en.term);
    plan.set(dateIdx, en.date);
    for (const i of after.slice(1, after.indexOf(termIdx))) plan.set(i, `Lab Group ${1 + (k % 4)}`);
  });
  return { raw, plan };
}

export default {
  files: ["ProfileSearch"],
  rules(h, filename) {
    const { raw, plan } = buildPlan(filename);
    let ptr = 0;
    return [
      (text) => {
        if (ptr >= raw.length || raw[ptr] !== text) return undefined;
        const to = plan.get(ptr++);
        return to;
      },
    ];
  },
};
