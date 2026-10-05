/**
 * One consistent fictional school shared by every demo screen.
 * Central City College — Doctor of Physical Therapy is the hero program.
 * Today in the demo is 2026-10-05 (last login 10/02/2026).
 */

export const SCHOOL = {
  name: "Central City College",
  domain: "centralcity.edu",
  tenantProduct: "Exxat Prism",
};

export const TODAY = "10/05/2026";

/** Programs offered (curriculum list, program dropdowns). */
export const PROGRAMS = [
  "Doctor of Physical Therapy",
  "Occupational Therapy OTD",
  "Physician Assistant MS",
  "Bachelor of Science in Nursing",
  "Speech-Language Pathology MS",
  "Athletic Training MSAT",
  "Clinical Mental Health Counseling MS",
  "Master of Public Health",
  "Doctor of Pharmacy",
  "Respiratory Therapy BS",
  "Medical Laboratory Science BS",
  "Health Informatics MS",
];

/** Cohort labels (newest first). */
export const COHORTS = [
  "Class of 2029",
  "Class of 2028",
  "Class of 2027",
  "Class of 2026",
  "Class of 2025",
  "Class of 2024",
  "Class of 2023",
  "Class of 2022",
];

export const COHORTS_BY_PROGRAM = [
  "DPT Class of 2029",
  "DPT Class of 2028",
  "DPT Class of 2027",
  "DPT Class of 2026",
  "OTD Class of 2028",
  "OTD Class of 2027",
  "OTD Class of 2026",
  "PA Class of 2028",
  "PA Class of 2027",
  "PA Class of 2026",
  "BSN Fall 2026",
  "BSN Spring 2026",
  "BSN Fall 2025",
  "BSN Spring 2025",
  "SLP Class of 2027",
  "SLP Class of 2026",
  "MSAT Class of 2027",
  "MSAT Class of 2026",
  "MPH Cohort 2027",
  "MPH Cohort 2026",
  "PharmD Class of 2029",
  "PharmD Class of 2028",
  "PharmD Class of 2027",
  "RT Cohort 2027",
  "RT Cohort 2026",
  "MLS Cohort 2027",
  "MLS Cohort 2026",
  "HI Cohort 2027",
];

export const CAMPUSES = ["Main Campus", "Downtown Campus", "Medical Center Campus", "Online"];
export const STUDENT_CATEGORIES = ["Full-time", "Part-time", "Accelerated", "Transfer", "International"];

/** Alyson Godbey — the demo student shown on every Student 360 tab. */
export const DEMO_STUDENT = {
  first: "Alyson",
  last: "Godbey",
  name: "Alyson, Godbey",
  fullName: "Alyson Godbey",
  email: `agodbey@${SCHOOL.domain}`,
  id: "20230142",
  cohort: "DPT Class of 2027",
  program: "Doctor of Physical Therapy",
  campus: "Main Campus",
  enrollment: "2024",
  graduation: "2027",
  phone: "(214) 555-0142",
};

const FIRST = [
  "Maya", "Ethan", "Sofia", "Noah", "Priya", "Lucas", "Amara", "Daniel", "Hannah", "Mateo",
  "Grace", "Omar", "Chloe", "Isaiah", "Naomi", "Caleb", "Layla", "Andre", "Emma", "Jonah",
  "Zoe", "Marcus", "Aaliyah", "Owen", "Tessa", "Rohan", "Camila", "Julian", "Nora", "Elijah",
  "Ivy", "Samuel", "Leila", "Gavin", "Talia", "Victor", "Hazel", "Dominic", "Keira", "Anthony",
  "Alina", "Reid", "Mei", "Brandon", "Jasmine", "Colin", "Dana", "Felix", "Gia", "Harrison",
];
const LAST = [
  "Nguyen", "Patel", "Martinez", "Johnson", "Kim", "Okafor", "Brooks", "Rivera", "Chen", "Hughes",
  "Alvarez", "Singh", "Foster", "Bennett", "Ortiz", "Walker", "Tanaka", "Reyes", "Carter", "Shah",
  "Morgan", "Delgado", "Price", "Hassan", "Coleman", "Vasquez", "Murphy", "Ibrahim", "Sullivan", "Park",
  "Ramirez", "Cohen", "Powell", "Nakamura", "Diaz", "Hayes", "Mensah", "Stewart", "Lopez", "Fischer",
  "Bell", "Castillo", "Yamada", "Gordon", "Santos", "Webb", "Lindqvist", "Adeyemi", "Moreau", "Dixon",
];

/** Deterministic student #i (0-based): never Alyson. Use for any list of students. */
export function student(i) {
  const first = FIRST[i % FIRST.length];
  const last = LAST[(i * 7 + Math.floor(i / FIRST.length) * 3) % LAST.length];
  const cohort = COHORTS_BY_PROGRAM[(i * 5) % COHORTS_BY_PROGRAM.length];
  const email = `${first[0].toLowerCase()}${last.toLowerCase()}${i >= 50 ? i : ""}@${SCHOOL.domain}`;
  return {
    first,
    last,
    name: `${first}, ${last}`,
    fullName: `${first} ${last}`,
    email,
    id: String(20230100 + ((i * 37 + 11) % 900)),
    phone: `(214) 555-${String(1000 + ((i * 53) % 9000)).padStart(4, "0")}`,
    cohort,
    campus: CAMPUSES[i % CAMPUSES.length],
    category: STUDENT_CATEGORIES[i % STUDENT_CATEGORIES.length],
  };
}

export const FACULTY = [
  { name: "Priya Raman", title: "Dr.", rank: "Professor", position: "Program Director / Chair", dept: "Physical Therapy" },
  { name: "Marcus Ellery", title: "Dr.", rank: "Associate Professor", position: "Director of Clinical Education", dept: "Physical Therapy" },
  { name: "Helen Okafor", title: "Dr.", rank: "Associate Professor", position: "Course Director", dept: "Physical Therapy" },
  { name: "Samuel Brooks", title: "Dr.", rank: "Assistant Professor", position: "Academic Fieldwork Coordinator", dept: "Physical Therapy" },
  { name: "Linda Cho", title: "Dr.", rank: "Professor", position: "Department Chair", dept: "Physical Therapy" },
  { name: "Rachel Mendez", title: "Dr.", rank: "Assistant Professor", position: "Capstone Coordinator", dept: "Physical Therapy" },
  { name: "Thomas Whitfield", title: "Dr.", rank: "Full Lecturer", position: "Assistant Dean", dept: "Health Sciences" },
  { name: "Angela Torres", title: "Dr.", rank: "Associate Professor", position: "Associate Dean", dept: "Health Sciences" },
  { name: "Jonathan Pierce", title: "Dr.", rank: "Professor", position: "Dean", dept: "Health Sciences" },
  { name: "Mei-Ling Zhao", title: "Dr.", rank: "Assistant Lecturer", position: "Clinical Coordinator", dept: "Occupational Therapy" },
  { name: "Robert Haines", title: "Dr.", rank: "Associate Lecturer", position: "Administrator / Manager", dept: "Nursing" },
  { name: "Denise Carlisle", title: "", rank: "Other Rank", position: "Administrative Assistant", dept: "Health Sciences" },
  { name: "Kevin O'Brien", title: "Dr.", rank: "Assistant Professor", position: "Program Chair", dept: "Physician Assistant" },
  { name: "Fatima Rahman", title: "Dr.", rank: "Associate Professor", position: "Department Director / Chair", dept: "Pharmacy" },
  { name: "Gregory Lang", title: "", rank: "Full Lecturer", position: "Site Coordinator", dept: "Nursing" },
];

export const facultyEmail = (name) => {
  const [f, ...rest] = name.split(" ");
  return `${f[0].toLowerCase()}${rest.join("").toLowerCase().replace(/[^a-z]/g, "")}@${SCHOOL.domain}`;
};

/** DPT course catalog (consistent with the Student 360 Exam tab). */
export const COURSES = [
  { code: "DPT 601", name: "Human Anatomy & Physiology I", term: "Fall 2024" },
  { code: "DPT 602", name: "Human Anatomy & Physiology II", term: "Spring 2025" },
  { code: "DPT 612", name: "Orthopedic Management", term: "Spring 2026" },
  { code: "DPT 630", name: "Pharmacology for PT", term: "Spring 2026" },
  { code: "DPT 640", name: "Neurological Rehabilitation", term: "Spring 2026" },
  { code: "DPT 655", name: "Cardiopulmonary Physical Therapy", term: "Spring 2026" },
  { code: "DPT 695", name: "Clinical Practicum Seminar", term: "Summer 2026" },
  { code: "DPT 701", name: "Clinical Practicum I", term: "Fall 2026" },
  { code: "DPT 702", name: "Clinical Practicum II", term: "Spring 2027" },
  { code: "DPT 790", name: "Licensure Preparation", term: "Fall 2026" },
];

export const courseLabel = (c) => `${c.code} – ${c.name}`;

/** Clinical sites with typical setting / specialty badges. */
export const SITES = [
  { name: "Medical City Dallas Hospital", city: "Dallas", state: "TX", specialty: "Inpatient Acute Care" },
  { name: "Baylor Scott & White Institute for Rehabilitation", city: "Dallas", state: "TX", specialty: "Neurological Rehab" },
  { name: "Texas Health Presbyterian Hospital", city: "Plano", state: "TX", specialty: "Orthopedics" },
  { name: "Children's Health Plano", city: "Plano", state: "TX", specialty: "Pediatrics" },
  { name: "Select Physical Therapy – Preston Hollow", city: "Dallas", state: "TX", specialty: "Outpatient Orthopedics" },
  { name: "Methodist Richardson Medical Center", city: "Richardson", state: "TX", specialty: "Cardiopulmonary" },
  { name: "ATI Physical Therapy – Frisco", city: "Frisco", state: "TX", specialty: "Sports Medicine" },
  { name: "Brookdale Senior Living – Lakewood", city: "Dallas", state: "TX", specialty: "Geriatrics" },
  { name: "UT Southwestern Clinical Center", city: "Dallas", state: "TX", specialty: "Outpatient Neuro" },
  { name: "Parkland Memorial Hospital", city: "Dallas", state: "TX", specialty: "Inpatient Acute Care" },
];

/** Compliance requirements typical for clinical placement. */
export const REQUIREMENTS = [
  "Background Check",
  "Drug Screening (10 Panel)",
  "COVID-19 Vaccination",
  "Flu (Influenza) Vaccination",
  "Hepatitis B Series",
  "MMR Immunity",
  "Varicella Immunity",
  "Tdap Booster",
  "Tuberculosis (TB) Screening",
  "Meningococcal Vaccination",
  "CPR / BLS Certification",
  "HIPAA Training",
  "OSHA Bloodborne Pathogens",
  "Professional Liability Insurance",
  "Health Insurance Verification",
  "Fingerprinting via Identogo",
  "Medical Records Release",
  "Immunization Summary",
  "Student Handbook Acknowledgement",
  "Technical Standards Attestation",
];

export const FACULTY_REQUIREMENTS = [
  "Background Check",
  "Drug Screening (10 Panel)",
  "State Professional License",
  "CPR / BLS Certification",
  "HIPAA Training",
  "Annual Compliance Training",
  "Professional Liability Insurance",
  "Tuberculosis (TB) Screening",
  "Influenza Vaccination",
  "Hepatitis B Series",
  "MMR Immunity",
  "Varicella Immunity",
  "Tdap Booster",
  "CV / Resume on File",
  "Conflict of Interest Disclosure",
];

export const FACULTY_GROUPS = [
  "Physical Therapy Core Faculty",
  "Occupational Therapy Faculty",
  "Physician Assistant Faculty",
  "Nursing Clinical Faculty",
  "Adjunct & Part-time Faculty",
  "Clinical Instructors – Dallas",
  "Clinical Instructors – Fort Worth",
  "Pharmacy Preceptors",
  "Health Sciences Administration",
  "Simulation Lab Staff",
];
