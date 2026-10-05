// Course Offerings grid (30 rows). Cells wrap into several text nodes in the capture, so rows are
// rewritten positionally: slots = text-node count per field in the pristine capture.
// Fields: num, name, P(placement marker, kept), ay, yr, term, cohort, start, end, fac, reg.
// Gate: only active when the first row starts with the pristine "00" so re-runs are no-ops.
const F = {
  ortho: ["DPT 612", "Orthopedic Management"],
  pharm: ["DPT 630", "Pharmacology for PT"],
  neuro: ["DPT 640", "Neurological Rehabilitation"],
  cardio: ["DPT 655", "Cardiopulmonary Physical Therapy"],
  sem: ["DPT 695", "Clinical Practicum Seminar"],
  cp1: ["DPT 701", "Clinical Practicum I"],
  cp2: ["DPT 702", "Clinical Practicum II"],
  lic: ["DPT 790", "Licensure Preparation"],
};
const T = {
  sp26: ["Spring 2026", "01/12/2026", "05/01/2026"], su26: ["Summer 2026", "05/18/2026", "08/07/2026"],
  fa26: ["Fall 2026", "08/24/2026", "12/11/2026"], sp27: ["Spring 2027", "01/11/2027", "05/07/2027"],
  fa25: ["Fall 2025", "08/25/2025", "12/12/2025"],
};
const AY25 = "2025 - 2026", AY26 = "2026 - 2027";
const OK = "Dr. Helen Okafor", EL = "Dr. Marcus Ellery", BR = "Dr. Samuel Brooks", RA = "Dr. Priya Raman",
  CH = "Dr. Linda Cho", ME = "Dr. Rachel Mendez", ZH = "Dr. Mei-Ling Zhao", OB = "Dr. Kevin O'Brien",
  HA = "Dr. Robert Haines", LA = "Gregory Lang", RAH = "Dr. Fatima Rahman";
// [counts(num,name,P,ay,yr,term,cohort,start,end,fac,reg), values]
const row = (c, num, name, ay, yr, t, cohort, fac, reg, end) => ({ c, v: [num, name, "P", ay, yr, t[0], cohort, t[1], end ?? t[2], fac, String(reg)] });
const ROWS = [
  row([1,2,1,1,1,2,2,1,1,1,1], ...F.cardio, AY25, "Year 2", T.sp26, "DPT Class of 2027", BR, 42),
  row([1,2,1,1,1,1,2,1,1,1,1], ...F.neuro, AY25, "Year 2", T.sp26, "DPT Class of 2027", OK, 42, "04/24/2026"),
  row([1,1,1,1,1,1,1,1,1,1,1], ...F.cp1, AY26, "Year 3", T.fa26, "DPT Class of 2027", EL, 41),
  row([1,1,1,1,1,2,2,1,1,1,1], ...F.ortho, AY25, "Year 2", T.sp26, "DPT Class of 2027", OK, 42),
  row([1,1,1,1,1,1,2,1,1,1,1], ...F.pharm, AY25, "Year 2", T.sp26, "DPT Class of 2027", RAH, 42),
  row([1,1,1,1,1,1,1,1,1,1,1], ...F.lic, AY26, "Year 3", T.fa26, "DPT Class of 2027", CH, 41, "12/04/2026"),
  row([1,1,1,1,1,2,1,1,1,1,1], ...F.sem, AY25, "Year 2", T.su26, "DPT Class of 2027", EL, 41),
  row([1,1,1,1,1,1,1,1,1,5,1], ...F.cp2, AY26, "Year 3", T.sp27, "DPT Class of 2027", [EL + ",", BR + ",", ME], 41),
  row([1,1,1,1,1,3,2,1,1,1,1], "OTD 610", "Occupational Performance", AY26, "Year 2", T.fa26, "OTD Class of 2028", ZH, 38),
  row([1,1,1,1,1,2,2,1,1,1,1], "OTD 655", "Upper Extremity Rehab", AY25, "Year 2", T.sp26, "OTD Class of 2027", ZH, 36),
  row([1,1,1,1,1,1,1,1,1,1,1], "PA 520", "Clinical Medicine II", AY26, "Year 1", ["Fall 2026", "08/17/2026", "12/18/2026"], "PA Class of 2028", OB, 34),
  row([1,1,1,1,1,1,2,1,1,1,1], "NURS 340", "Adult Health Nursing II", AY25, "Year 1", T.sp26, "BSN Fall 2025", HA, 58),
  row([1,1,1,1,1,3,1,1,1,1,1], "NURS 410", "Community Health Nursing", AY26, "Year 2", T.fa26, "BSN Fall 2025", LA, 61),
  row([1,1,1,1,1,1,1,1,1,1,1], "PHAR 710", "Pharmacotherapy III", AY26, "Year 2", T.fa26, "PharmD Class of 2028", RAH, 78),
  row([1,1,1,1,1,1,2,1,1,1,1], "DPT 665", "Geriatric Rehabilitation", AY25, "Year 2", T.sp26, "DPT Class of 2027", BR, 41),
  row([1,1,1,1,1,2,2,1,1,1,1], "DPT 610", "Clinical Biomechanics", AY25, "Year 1", T.fa25, "DPT Class of 2028", OK, 44),
  row([1,1,0,1,1,1,1,1,1,2,1], "DPT 688", "Research Methods", AY26, "Year 1", T.fa26, "DPT Class of 2029", [ME + ",", CH], 45),
  row([1,1,1,1,1,1,1,1,1,1,1], "DPT 604", "Principles of Examination", AY26, "Year 1", T.fa26, "DPT Class of 2029", RA, 45),
  row([1,1,1,1,1,1,1,1,1,2,1], "DPT 606", "Professional Development", AY26, "Year 1", T.fa26, "DPT Class of 2029", [RA + ",", CH], 45, "10/16/2026"),
  row([1,1,1,1,3,1,1,1,1,2,1], "DPT 705", "Differential Diagnosis", AY25, "Year 3", T.fa25, "DPT Class of 2026", [EL + ",", BR], 39),
  row([1,1,1,1,1,1,1,1,1,1,1], "DPT 780", "Capstone Seminar", AY25, "Year 3", T.sp26, "DPT Class of 2026", ME, 39, "05/08/2026"),
  row([1,1,1,1,1,1,2,1,1,1,1], "OTD 720", "Fieldwork Level II-A", AY26, "Year 3", T.fa26, "OTD Class of 2027", ZH, 35, "11/13/2026"),
  row([1,1,0,1,1,2,2,1,1,1,1], "PA 540", "Clinical Pharmacology", AY26, "Year 1", ["Fall 2026", "08/17/2026", "12/18/2026"], "PA Class of 2028", OB, 34),
  row([1,1,1,1,1,1,1,1,1,3,1], "NURS 320", "Pathophysiology", AY25, "Year 1", T.sp26, "BSN Fall 2025", [HA + ",", LA], 61),
  row([1,1,1,1,1,1,1,1,1,3,1], "NURS 430", "Nursing Leadership", AY26, "Year 2", T.fa26, "BSN Spring 2025", [LA + ",", HA], 52),
  row([1,1,0,1,1,1,1,1,1,2,1], "NURS 205", "Health Assessment", AY25, "Year 1", T.fa25, "BSN Fall 2025", [LA + ",", HA], 61),
  row([1,1,1,1,1,1,2,1,1,2,1], "PHAR 620", "Pharmaceutical Care II", AY25, "Year 1", T.sp26, "PharmD Class of 2029", [RAH + ",", "Dr. Angela Torres"], 82),
  row([1,1,1,1,1,2,1,1,1,1,1], "OTD 630", "Neuroscience for OT", AY26, "Year 3", T.fa26, "OTD Class of 2027", ZH, 36),
  row([1,1,1,1,1,2,2,1,1,1,1], "PA 610", "PA Clinical Rotation I", AY25, "Year 1", T.su26, "PA Class of 2027", OB, 33),
  row([1,1,1,1,1,1,2,1,1,1,1], "DPT 650", "Pediatric Physical Therapy", AY26, "Year 2", T.sp27, "DPT Class of 2028", BR, 43),
];
const FIELDS = 11;
const place = (v, n) => {
  if (n === 0) return [];
  if (Array.isArray(v)) return Array.from({ length: n }, (_, i) => (i < n - 1 ? v[i] ?? "" : v.slice(i).join(" ")));
  if (n === 1) return [v];
  const w = v.split(" ");
  if (w.length <= 1) return [v, ...Array(n - 1).fill("")];
  const per = Math.ceil(w.length / n);
  return Array.from({ length: n }, (_, i) => w.slice(i * per, (i + 1) * per).join(" "));
};
const esc = (s) => s.replace(/&/g, "&amp;");
// Term (5) and cohort (6) cells render their nodes inline with no gap, so keep each value whole.
const whole = (v, n) => (n === 0 ? [] : [v, ...Array(n - 1).fill("")]);
const OUT = ROWS.flatMap((r) => r.c.flatMap((n, f) => (f === 2 ? Array(n).fill(null) : f === 5 || f === 6 ? whole(r.v[f], n) : place(r.v[f], n))));

export default {
  files: ["CurriculumCourseofferings"],
  rules() {
    let armed = false, active = false, idx = 0;
    return [
      (t) => {
        if (/^[-\s]+$/.test(t)) return t; // icon glyph spans
        if (t === "Action") { armed = true; return undefined; }
        if (armed && !active) { armed = false; if (t === "00") { active = true; idx = 0; } }
        if (active) {
          if (idx >= OUT.length) { active = false; return undefined; }
          const o = OUT[idx++];
          return o === null ? t : esc(o);
        }
        return undefined;
      },
      (t) => (t === "1 – 30 of 2188" ? "1 – 30 of 186" : undefined),
    ];
  },
};
