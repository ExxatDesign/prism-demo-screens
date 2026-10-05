// Curriculum list: every row between the last real program ("Health Informatics MS") and the
// "Leo AI ..." banner is placeholder data. Replaced positionally with realistic curricula.
// Truncated originals ("xxx...") get long names so the 16-char + "..." look is preserved.
const PROGS_LONG = [
  "Doctor of Physical Therapy", "Occupational Therapy OTD", "Physician Assistant MS", "Bachelor of Science in Nursing",
  "Speech-Language Pathology MS", "Athletic Training MSAT", "Clinical Mental Health Counseling", "Master of Public Health",
  "Doctor of Pharmacy", "Respiratory Therapy BS", "Medical Laboratory Science BS", "Health Informatics MS",
];
const LONG = [];
const forms = (y) => [`– ${y} Curriculum`, `– ${y - 1} Curriculum (Revised)`, `– ${y - 2} Curriculum`];
for (let k = 0; k < 3; k++) for (const [i, p] of PROGS_LONG.entries()) LONG.push(`${p} ${forms(2026)[k]}`);
LONG.splice(3, 0, "Clinical Experience Map – DPT", "DPT Curriculum 2025 (Revised)");
LONG.splice(11, 0, "Interprofessional Education Curriculum", "Academic Year 2025 - 2026 Curriculum");
LONG.splice(19, 0, "Clinical Education Map – OTD", "Academic Year 2026 - 2027 Curriculum");

const ABBR = ["DPT", "OTD", "DPT", "PA", "BSN", "DPT", "SLP", "MSAT", "OTD", "MPH", "PharmD", "DPT", "RT", "MLS", "HI", "BSN", "PA"];
const SHORT = [];
const seen = new Set();
for (let i = 0; SHORT.length < 260 && i < 2000; i++) {
  const p = ABBR[i % ABBR.length];
  const y = 2021 + ((i * 5 + Math.floor(i / 17)) % 7);
  const f = [`${p} Curriculum ${y}`, `${p} ${y} Revised`, `${p} Cohort ${y}`][(i + Math.floor(i / 3)) % 3];
  if (f.length > 19 || seen.has(f)) continue;
  seen.add(f);
  SHORT.push(f);
}
const CURATED = ["Class of 2027 Map", "Class of 2026 Map", "Fall 2026 Cohort", "Spring 2026 Cohort", "DPT Clinical Map", "OTD Clinical Map", "Professional Year", "Summer Intensive", "Bridge Program 2026", "Academic Yr 25-26"];
for (const [i, c] of CURATED.entries()) SHORT.splice(i * 14 + 6, 0, c);

export default {
  files: ["CmapCurriculum"],
  rules() {
    let inList = false, si = 0, li = 0;
    return [
      (t) => {
        if (t === "Health Informatics MS" && !inList) { inList = true; return undefined; }
        if (t.startsWith("Leo AI is ready")) inList = false;
        return undefined;
      },
      (t) => {
        if (!inList || t === "*" || /^[-\s]+$/.test(t)) return undefined;
        if (t.endsWith("...")) return LONG[li++ % LONG.length].slice(0, 16) + "...";
        return SHORT[si++ % SHORT.length];
      },
    ];
  },
};
