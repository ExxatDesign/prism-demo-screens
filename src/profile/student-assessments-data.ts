/** Demo assessment data for Alyson Godbey (DPT, Class of 2027). Shared by Overview, Exam and Survey. */

export type Tone = "green" | "amber" | "red" | "blue" | "gray";

export type ExamRow = {
  name: string;
  course: string;
  date: string;
  score: string;
  /** Percent, only for completed exams. */
  pct?: number;
  classAvg?: number;
  status: "Passed" | "Remediation" | "Scheduled";
};

export const EXAMS: ExamRow[] = [
  { name: "Musculoskeletal Midterm", course: "DPT 612 – Orthopedic Management", date: "02/18/2026", score: "91%", pct: 91, classAvg: 86, status: "Passed" },
  { name: "Neuroscience Practical", course: "DPT 640 – Neurological Rehabilitation", date: "03/09/2026", score: "84%", pct: 84, classAvg: 80, status: "Passed" },
  { name: "Cardiopulmonary Final", course: "DPT 655 – Cardiopulmonary Physical Therapy", date: "04/22/2026", score: "78%", pct: 78, classAvg: 76, status: "Passed" },
  { name: "Clinical Reasoning OSCE", course: "DPT 701 – Clinical Practicum I", date: "06/12/2026", score: "72%", pct: 72, classAvg: 74, status: "Remediation" },
  { name: "NPTE Practice Exam 1", course: "DPT 790 – Licensure Preparation", date: "09/24/2026", score: "682 / 800", pct: 85, classAvg: 83, status: "Passed" },
  { name: "NPTE Practice Exam 2", course: "DPT 790 – Licensure Preparation", date: "10/22/2026", score: "–", status: "Scheduled" },
  { name: "Pharmacology Quiz 4", course: "DPT 630 – Pharmacology for PT", date: "11/05/2026", score: "–", status: "Scheduled" },
];

export const EXAM_STATUS_TONE: Record<ExamRow["status"], Tone> = {
  Passed: "green",
  Remediation: "amber",
  Scheduled: "blue",
};

export const EXAM_AVG = Math.round(
  EXAMS.filter((e) => e.pct).reduce((s, e) => s + (e.pct ?? 0), 0) / EXAMS.filter((e) => e.pct).length,
);

export const UPCOMING_EXAMS = [
  { name: "NPTE Practice Exam 2", when: "Thu, Oct 22 · 9:00 AM", where: "Testing Center, Room 118", format: "250 questions · 5 hours", note: "Proctored · bring student ID" },
  { name: "Pharmacology Quiz 4", when: "Thu, Nov 5 · 2:00 PM", where: "Online (Respondus LockDown)", format: "40 questions · 60 minutes", note: "Open-note not permitted" },
];

/** NPTE content-outline areas: student vs class average (percent correct). */
export const CONTENT_AREAS = [
  { area: "Musculoskeletal System", student: 84, cls: 79 },
  { area: "Neuromuscular & Nervous System", student: 76, cls: 78 },
  { area: "Cardiovascular & Pulmonary", student: 72, cls: 74 },
  { area: "Integumentary System", student: 88, cls: 81 },
  { area: "Metabolic & Endocrine", student: 79, cls: 77 },
  { area: "GI, GU & Other Systems", student: 81, cls: 76 },
  { area: "Evidence-Based Practice", student: 85, cls: 80 },
  { area: "Professional Responsibilities", student: 90, cls: 86 },
];

export const REMEDIATION = {
  exam: "Clinical Reasoning OSCE",
  owner: "Dr. Priya Raman",
  due: "10/30/2026",
  steps: [
    { label: "Review feedback with course director", done: true },
    { label: "Complete 3 case-based practice stations", done: true },
    { label: "Retake OSCE stations 2 and 4", done: false },
  ],
};

export type SurveyRow = {
  name: string;
  type: string;
  due: string;
  submitted: string;
  status: "Completed" | "Due soon" | "Overdue" | "Not yet open";
};

export const SURVEYS: SurveyRow[] = [
  { name: "Clinical Site Experience – Rotation 1", type: "Site evaluation", due: "03/31/2026", submitted: "03/28/2026", status: "Completed" },
  { name: "Preceptor Feedback – Medical City Dallas", type: "Preceptor evaluation", due: "04/30/2026", submitted: "04/25/2026", status: "Completed" },
  { name: "Mid-Program Satisfaction Survey", type: "Program survey", due: "06/15/2026", submitted: "06/10/2026", status: "Completed" },
  { name: "Student Services Survey", type: "Program survey", due: "09/30/2026", submitted: "–", status: "Overdue" },
  { name: "Clinical Site Experience – Rotation 2", type: "Site evaluation", due: "10/16/2026", submitted: "–", status: "Due soon" },
  { name: "Graduation Readiness Survey", type: "Program survey", due: "12/01/2026", submitted: "–", status: "Not yet open" },
];

export const SURVEY_STATUS_TONE: Record<SurveyRow["status"], Tone> = {
  Completed: "green",
  "Due soon": "amber",
  Overdue: "red",
  "Not yet open": "gray",
};

export type CourseEvalRow = {
  course: string;
  instructor: string;
  term: string;
  window: string;
  status: "Submitted" | "Open";
  submitted?: string;
};

export const COURSE_EVALS: CourseEvalRow[] = [
  { course: "DPT 790 – Licensure Preparation", instructor: "Dr. Priya Raman", term: "Fall 2026", window: "10/01 – 10/30/2026", status: "Open" },
  { course: "DPT 701 – Clinical Practicum I", instructor: "Dr. Marcus Ellery", term: "Fall 2026", window: "10/01 – 10/30/2026", status: "Open" },
  { course: "DPT 655 – Cardiopulmonary Physical Therapy", instructor: "Dr. Linda Cho", term: "Spring 2026", window: "04/27 – 05/08/2026", status: "Submitted", submitted: "05/03/2026" },
  { course: "DPT 640 – Neurological Rehabilitation", instructor: "Dr. Samuel Brooks", term: "Spring 2026", window: "03/16 – 03/27/2026", status: "Submitted", submitted: "03/20/2026" },
  { course: "DPT 630 – Pharmacology for PT", instructor: "Dr. Rachel Mendez", term: "Spring 2026", window: "03/16 – 03/27/2026", status: "Submitted", submitted: "03/24/2026" },
  { course: "DPT 612 – Orthopedic Management", instructor: "Dr. Helen Okafor", term: "Spring 2026", window: "02/23 – 03/06/2026", status: "Submitted", submitted: "02/27/2026" },
  { course: "DPT 695 – Clinical Practicum Seminar", instructor: "Dr. Marcus Ellery", term: "Summer 2026", window: "07/20 – 07/31/2026", status: "Submitted", submitted: "07/22/2026" },
];

export const SUMMARY = {
  exams: {
    avg: EXAM_AVG,
    upcoming: EXAMS.filter((e) => e.status === "Scheduled").length,
    remediation: EXAMS.filter((e) => e.status === "Remediation").length,
    next: UPCOMING_EXAMS[0],
  },
  surveys: {
    total: SURVEYS.length,
    completed: SURVEYS.filter((s) => s.status === "Completed").length,
    overdue: SURVEYS.filter((s) => s.status === "Overdue").length,
    dueSoon: SURVEYS.filter((s) => s.status === "Due soon").length,
  },
  evals: {
    total: COURSE_EVALS.length,
    submitted: COURSE_EVALS.filter((e) => e.status === "Submitted").length,
    open: COURSE_EVALS.filter((e) => e.status === "Open").length,
    closes: "10/30/2026",
  },
};
