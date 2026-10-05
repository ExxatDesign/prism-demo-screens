/**
 * Admin > CAAS faculty compliance By Group, and the faculty-facing CAAS page.
 */
import { FACULTY_GROUPS } from "../universe.mjs";

const trunc16 = (s) => (s.length > 16 ? s.slice(0, 16) + "..." : s);

// Table order is alphabetical in the capture; keep alphabetical with the new names.
const GROUP_ROWS = [
  ["Adjunct &amp; Part-time Faculty", 24, 19, 3, 2, 1],
  ["Clinical Instructors – Dallas", 31, 24, 5, 3, 1],
  ["Clinical Instructors – Fort Worth", 22, 17, 3, 2, 2],
  ["Health Sciences Administration", 8, 7, 1, 0, 0],
  ["Nursing Clinical Faculty", 18, 13, 4, 1, 1],
  ["Occupational Therapy Faculty", 12, 10, 1, 1, 0],
  ["Pharmacy Preceptors", 20, 14, 4, 2, 2],
  ["Physical Therapy Core Faculty", 16, 14, 2, 1, 0],
  ["Physician Assistant Faculty", 11, 9, 1, 1, 1],
  ["Simulation Lab Staff", 6, 5, 1, 0, 0],
];
const TOTAL_FACULTY = GROUP_ROWS.reduce((s, r) => s + r[1], 0);

const JUNK_GROUPS = [
  "A R41 Faculty Compliance Testing", "AA R43 Prod Testing", "Compliance Group 1", "Compliance Group 2",
  "Group Prod testing (R41)", "R42 - Group", "R43 - Group", "R44 - Group", "Test Group", "k1 test group",
];

const REQ = {
  "Background Check Universal": "Background Check - Initial",
  "Background Check -Custom": "Background Check - Annual Renewal",
  "Covid- 19 vaccination": "COVID-19 Vaccination",
  "Covid-19 Vaccination-Custom": "COVID-19 Vaccination Waiver",
  "Covid Test": "COVID-19 Test",
  "Drug Screening Universal": "Drug Screening (10 Panel)",
  Influenza: "Influenza Vaccination",
  "User Defined": "Faculty ID Badge",
  "Prod testing (RN)": "State Professional License",
  "Clinical Faculty Annual Compliance &amp; DFWHC Training": "Annual Compliance Training",
  test_Newt: "Faculty Handbook",
  "k1 ud test": "Teaching Eval",
  Test: "Safety Training",
  "R41-Testing": "Sharps Safety",
  AIDS: "HIV Awareness",
  Required: "Fingerprinting",
  "RR CHECK": "Reference Check",
  "RR CHECK 2": "Reference Letter",
  CV_Resume: "CV / Resume",
  "R42 Review Not Required": "Conflict of Interest Disclosure",
  "R44 Regression Requirement - 02 Optional": "Professional Liability Insurance",
};

const STATUS = "(?:Get Started|In Progress|Pending Review|Approved|Not Approved|Expiring|Expired)";
const ARIA = new RegExp(`^ ?(.+?) (${STATUS} [\\d,]+)$`);

function nameRule() {
  const exact = new Map(Object.entries(REQ));
  const truncMap = new Map();
  for (const [from, to] of Object.entries(REQ)) {
    if (from.length > 16) truncMap.set(trunc16(from), trunc16(to));
  }
  return (t) => {
    if (exact.has(t)) return exact.get(t);
    if (truncMap.has(t)) return truncMap.get(t);
    const m = t.match(ARIA);
    if (m && exact.has(m[1])) return `${exact.get(m[1])} ${m[2]}`;
    return undefined;
  };
}

function groupRules(h) {
  const nameMap = new Map(JUNK_GROUPS.map((j, i) => [j, GROUP_ROWS[i][0]]));
  let pairs = 0;
  let digitsLeft = 0;
  let idx = 0;
  const table = (t) => {
    if (/^\d+ \/ \d+$/.test(t) && pairs < GROUP_ROWS.length * 2) {
      const [, T, c] = GROUP_ROWS[pairs >> 1];
      const out = pairs % 2 === 0 ? `${c} / ${T}` : `${T - c} / ${T}`;
      if (pairs % 2 === 1) {
        digitsLeft = 3;
        idx = pairs >> 1;
      }
      pairs++;
      return out;
    }
    if (digitsLeft > 0 && /^\d+$/.test(t)) {
      const r = GROUP_ROWS[idx];
      const v = r[3 + (3 - digitsLeft)];
      digitsLeft--;
      return String(v);
    }
    return undefined;
  };
  return [
    table,
    (t) => (nameMap.has(t) ? nameMap.get(t) : undefined),
    (t) => (t === "(155)" ? `(${TOTAL_FACULTY})` : undefined),
    nameRule(),
  ];
}

function facultyPageRules() {
  const map = {
    "CPR Certification": "CPR / BLS Certification",
    "Flu(Influenza)": "Influenza Vaccination",
    "Health & Safety Test": "Annual Compliance Training",
    "Health &amp; Safety Test": "Annual Compliance Training",
    "Instructional guidebook": "Faculty Handbook",
    "Physical Examination Form": "Annual Health Screening Form",
    "RN License": "State PT License",
    "TB Test": "TB Screening",
    Resume: "CV / Resume on File",
    "Adjunct Faculty 2026": "Adjunct &amp; Part-time Faculty",
    "Sep 5, 2023": "Sep 5, 2026",
    "Oct 1, 2023": "Oct 1, 2026",
  };
  return [(t) => (Object.hasOwn(map, t) ? map[t] : undefined)];
}

export default {
  files: ["CaasFacultyHomeBygroup", "FacultyCaas"],
  rules(h, filename) {
    return filename.includes("FacultyCaas") ? facultyPageRules() : groupRules(h);
  },
};
