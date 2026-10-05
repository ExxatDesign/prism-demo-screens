/**
 * Admin > Compliance > By Cohort (cohort table, "Compliance status by documents" chart,
 * "Documents Uploaded By School" list).
 */
import { COHORTS_BY_PROGRAM } from "../universe.mjs";

const trunc16 = (s) => (s.length > 16 ? s.slice(0, 16) + "..." : s);

// ---- cohort table -----------------------------------------------------------------------------
const JUNK_COHORTS = [
  ".NET8 Cohort", "04th Cohort Prod", "111th Oct", "12th May 2022- edit", "12th Oct 2022",
  "2023 Cohort Update", "2026", "21th June Cohort", "24th cohort", "25 April 2022 -edit",
  "25th september", "26th Julie Cohort", "26th June PROD", "ABC", "Andn", "Ash 21", "Awesome test",
  "Batch 2022", "Bharti test", "C26-2", "Car", "CC R15.2", "CC test", "Check COHO",
  "Class of - 2024", "Class of 2024", "Class of 2026 Mahi", "Class of 2028*", "Class of 2033",
  "Coeval Test", "cohort 2024", "Cohort 1", "Cohort 1 - 2U - PT", "Cohort 12", "Cohort 2 - 2U - PT",
  "Cohort 2023 - FG", "Cohort A", "Cohort B", "Cohort for Prod27", "Cohort of 2050",
  "Cohort Prat111.0", "Cohort PT Production 2023", "Cohort R19 P", "Cohort Release 26th 2026",
  "Cohort Test", "Cohort-2612", "Cohort-DPT-2 0 2 0 edit 123", "Cohort-DPT-2023 update&amp;",
  "Cohort-Prod-SB", "Cohort-R23-I",
];
const EXTRA = [
  "BSN Fall 2024", "BSN Spring 2027", "OTD Class of 2029", "PA Class of 2029", "SLP Class of 2028",
  "MSAT Class of 2028", "MPH Cohort 2028", "PharmD Class of 2026", "RT Cohort 2028", "MLS Cohort 2028",
  "HI Cohort 2028", "HI Cohort 2026", "DPT Class of 2025", "OTD Class of 2025", "PA Class of 2025",
  "SLP Class of 2025", "MSAT Class of 2025", "MPH Cohort 2025", "RT Cohort 2025", "MLS Cohort 2025",
  "Accelerated BSN Fall 2026", "Accelerated BSN Spring 2026",
];
const NEW_COHORTS = [...COHORTS_BY_PROGRAM, ...EXTRA].slice(0, JUNK_COHORTS.length).sort();

// Unknown junk cohorts that only appear in the "Documents Uploaded By School" list.
const UPLOAD_JUNK = [
  "Jain July", "R14 Julie", "R15 Prod Test edit", "Sample Cohort", "Vipul R17 test", "R17 Vipul final",
  "Julie 30th Jan", "Manipal", "New Common cohort", "PROD Compliance", "Hq", "AutoPlacementCohort",
  "Empty test", "R22 Placement Cohort New", "ComplianceTest", "R21- JM", "R23-Student-update",
  "Vipul17589", "testcoh84", "Student-R17-Cohort", "Integration US cohort",
];

const SIZE_BY_PREFIX = [
  [/^Accelerated BSN/, [28, 14]], [/^BSN/, [48, 30]], [/^DPT/, [64, 22]], [/^PharmD/, [88, 30]],
  [/^OTD/, [36, 10]], [/^PA /, [42, 10]], [/^SLP/, [26, 8]], [/^MSAT/, [22, 8]], [/^MPH/, [34, 14]],
  [/^RT/, [24, 8]], [/^MLS/, [20, 8]], [/^HI/, [18, 8]],
];

function rowsData() {
  return NEW_COHORTS.map((name, i) => {
    const [b, s] = SIZE_BY_PREFIX.find(([re]) => re.test(name))[1];
    const T = b + ((i * 7) % s);
    const year = Number((name.match(/(20\d\d)/) || [])[1] || 2026);
    const rate = year <= 2025 ? 0.95 : year === 2026 ? 0.86 : year === 2027 ? 0.74 : 0.6;
    let c = Math.round(T * (rate + ((i * 13) % 9) / 100 - 0.04));
    c = Math.max(0, Math.min(T, c));
    if (i % 11 === 5) c = T; // fully compliant cohort
    const nc = T - c;
    const pending = Math.min(nc + 2, Math.round(T * 0.12) + (i % 4));
    const expiring = year <= 2025 ? i % 3 : (i * 3) % 7;
    const expired = nc === 0 ? 0 : (i * 5) % (Math.max(2, Math.ceil(nc / 2)) + 1);
    return { name, T, c, nc, pending, expiring, expired };
  });
}

// ---- requirement / document names -----------------------------------------------------------------
const REQ = {
  "02.testorder": "Hep B Titer",
  "1. Hepatitis C (HepC) - alias": "Hepatitis C (HepC)",
  "1.COVID-19 Vaccination test": "COVID-19 Vaccine Exemption",
  "1.Covid23 edited": "COVID-19 Waiver",
  "11.testorder": "Rubella Titer",
  "2 1BB": "Mumps Titer",
  A1_Requirment: "Skills Checklist",
  ACa: "PALS",
  ACLS1: "ACLS Renewal",
  "Additional Documents (Included in Profile Link)": "Site Orientation Packet (Included in Profile Link)",
  "Additional Documents (Not Included in Profile Link)": "Site Orientation Packet (Not Included in Profile Link)",
  "April 1": "Physical Exam",
  "Auto expiration": "Annual Wellness",
  "Background Check1": "Background Check Renewal",
  Blah: "Student Agreement",
  Compass2: "Orientation Quiz",
  "Consent from": "Photo Release",
  "COVID-19 Vaccine": "COVID-19 Booster",
  "Dashboard test": "Titer Results",
  "Document-test": "ID Verification",
  "Drug Screening fake": "Urine Drug Screen",
  DS: "Dental Clearance",
  "E1Bg check": "Registry Check",
  First: "Handbook Receipt",
  G1: "N95 Fit Test",
  gfgf: "Driver's License",
  "Heath doc-sb": "Health Physical",
  Insurance: "Liability Waiver",
  "Interview Required Documents TCEE Rotation": "Interview Required Documents - Rotation",
  JR: "Rotation Survey",
  "Julie 26th March": "Midterm Eval",
  "Major Depressive disorder": "Mental Health Screening",
  "Manual Test": "Manual Handling",
  "Mass CORI Universal": "CORI Background Check",
  MDD: "Wellness Form",
  MeningitisTEST: "Meningitis ACWY",
  MES: "Equipment Quiz",
  "National Test Offender": "Offender Registry Search",
  "NEW COVVIID": "COVID Screening",
  "New Req": "Parking Permit",
  "New Requirement 11": "Badge Request Form",
  New_requirement_Exxat: "Immunization Waiver",
  "Professional liability insurance": "Malpractice Insurance Certificate",
  "R-22 Back Ground Universal Custom Requirement": "Universal Background Screening",
  "R-22 Drug Screening Universal Custom Requirement": "Universal Drug Screening",
  "Rbac Requirement": "Site Access Agreement",
  re01: "Reference Letter",
  "Req 1": "Resume on File",
  "Req 2": "Transcript Copy",
  "Requirement demo": "Competency Checklist",
  "Requirement name-1": "Clinical Skills Record",
  "Requirement name-2": "Preceptor Agreement",
  "Requirement name-3": "Student Learning Plan",
  "Requirement name-5": "Capstone Proposal",
  "Requirement training 1": "Annual Safety Training",
  "Requirement-MFE": "Mandated Reporter Training",
  RJ: "Dress Code Form",
  "Student dash board": "Technical Standards Attestation",
  "TCEE Rotation Cover Letters": "Rotation Cover Letters",
  Test: "Hand Hygiene",
  "Test 6th June": "Summer Rotation Intake",
  "Test Healthdd": "Health Clearance Form",
  "Test Migration": "Records Transfer Form",
  "test sub category - 1": "Vaccination Exemption Form",
  "test sub category- 2": "Medical Clearance Letter",
  Test1: "Placement Quiz",
  Test12: "Orientation",
  Test1234: "Safety Video",
  Test2: "Fire Safety",
  Test3: "Sharps Safety",
  test34: "TB Skin Test",
  "Thisisatestforcharcterlimitof60 lengthseeif thisworksfinethe": "Student Code of Conduct and Professional Behavior Agreement",
  "Ticket demo": "Shuttle Pass",
  UNIBG: "BBP Training",
  Universal: "Safety Training",
  "Universal - PA PATCH": "PA Child Abuse Clearance",
  UnivTesting: "Immunity Review",
  Viral: "Hepatitis Panel",
  Waco: "Site Agreement",
  zzzzzzzzzzz: "Misc Documents",
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

export default {
  files: ["ComplianceHomeCohort"],
  rules() {
    const rows = rowsData();
    const cohortMap = new Map(JUNK_COHORTS.map((j, i) => [j, NEW_COHORTS[i]]));
    UPLOAD_JUNK.forEach((j, i) => cohortMap.set(j, NEW_COHORTS[(i * 2 + 1) % NEW_COHORTS.length]));

    let pairs = 0;
    let digitsLeft = 0;
    let digitIdx = 0;
    const tableRule = (t) => {
      if (/^\d+ \/ \d+$/.test(t) && pairs < rows.length * 2) {
        const r = rows[pairs >> 1];
        const out = pairs % 2 === 0 ? `${r.c} / ${r.T}` : `${r.nc} / ${r.T}`;
        if (pairs % 2 === 1) {
          digitsLeft = 3;
          digitIdx = pairs >> 1;
        }
        pairs++;
        return out;
      }
      if (digitsLeft > 0 && /^\d+$/.test(t)) {
        const r = rows[digitIdx];
        const v = [r.pending, r.expiring, r.expired][3 - digitsLeft];
        digitsLeft--;
        return String(v);
      }
      return undefined;
    };

    return [
      tableRule,
      (t) => (cohortMap.has(t) ? cohortMap.get(t) : undefined),
      nameRule(),
    ];
  },
};
