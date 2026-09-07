/** Realistic compliance demo data for iframe screens. */

export type CohortRow = {
  id: string
  cohort: string
  compliant: number
  total: number
  nonCompliant: number
  pendingReview: number
  expiring: number
  expired: number
  approve: boolean
  active: boolean
}

export type FacultyGroupRow = {
  id: string
  group: string
  compliant: number
  total: number
  nonCompliant: number
  pendingReview: number
  expiring: number
  expired: number
  approve: boolean
  active: boolean
}

export const STUDENT_COHORT_ROWS: CohortRow[] = [
  {
    id: "2028",
    cohort: "Class of 2028",
    compliant: 41,
    total: 48,
    nonCompliant: 7,
    pendingReview: 12,
    expiring: 3,
    expired: 1,
    approve: true,
    active: true,
  },
  {
    id: "2027",
    cohort: "Class of 2027",
    compliant: 62,
    total: 64,
    nonCompliant: 2,
    pendingReview: 4,
    expiring: 6,
    expired: 0,
    approve: true,
    active: true,
  },
  {
    id: "2026",
    cohort: "Class of 2026",
    compliant: 58,
    total: 60,
    nonCompliant: 2,
    pendingReview: 2,
    expiring: 1,
    expired: 0,
    approve: false,
    active: true,
  },
  {
    id: "absn-f25",
    cohort: "Accelerated BSN · Fall 2025",
    compliant: 18,
    total: 24,
    nonCompliant: 6,
    pendingReview: 9,
    expiring: 2,
    expired: 0,
    approve: false,
    active: true,
  },
  {
    id: "msn-s26",
    cohort: "MSN · Spring 2026",
    compliant: 11,
    total: 16,
    nonCompliant: 5,
    pendingReview: 7,
    expiring: 0,
    expired: 1,
    approve: false,
    active: true,
  },
  {
    id: "dnp-2025",
    cohort: "DNP · Cohort 2025",
    compliant: 9,
    total: 12,
    nonCompliant: 3,
    pendingReview: 3,
    expiring: 0,
    expired: 0,
    approve: false,
    active: true,
  },
  {
    id: "legacy",
    cohort: "Legacy 2019",
    compliant: 0,
    total: 0,
    nonCompliant: 0,
    pendingReview: 0,
    expiring: 0,
    expired: 0,
    approve: false,
    active: false,
  },
]

export const FACULTY_GROUP_ROWS: FacultyGroupRow[] = [
  {
    id: "full-time",
    group: "Full-time faculty",
    compliant: 14,
    total: 16,
    nonCompliant: 2,
    pendingReview: 3,
    expiring: 1,
    expired: 0,
    approve: true,
    active: true,
  },
  {
    id: "clinical",
    group: "Clinical instructors",
    compliant: 22,
    total: 28,
    nonCompliant: 6,
    pendingReview: 8,
    expiring: 4,
    expired: 1,
    approve: false,
    active: true,
  },
  {
    id: "adjunct",
    group: "Adjunct faculty",
    compliant: 19,
    total: 24,
    nonCompliant: 5,
    pendingReview: 6,
    expiring: 2,
    expired: 0,
    approve: false,
    active: true,
  },
  {
    id: "preceptors",
    group: "Site preceptors",
    compliant: 31,
    total: 42,
    nonCompliant: 11,
    pendingReview: 14,
    expiring: 5,
    expired: 2,
    approve: false,
    active: true,
  },
  {
    id: "sim",
    group: "Simulation lab staff",
    compliant: 5,
    total: 6,
    nonCompliant: 1,
    pendingReview: 1,
    expiring: 0,
    expired: 0,
    approve: false,
    active: true,
  },
  {
    id: "inactive",
    group: "Inactive assignments",
    compliant: 0,
    total: 0,
    nonCompliant: 0,
    pendingReview: 0,
    expiring: 0,
    expired: 0,
    approve: false,
    active: false,
  },
]
