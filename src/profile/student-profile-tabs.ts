import type { ComponentType } from "react";
import ProfileOverview from "@/imports/StepsExxatComAdminProfileDetailsB67B3A7215B6Ef1188Cf6045Bdda8670Overview1440WDefault";
import ProfileAcademics from "@/imports/StepsExxatComAdminProfileDetailsB67B3A7215B6Ef1188Cf6045Bdda8670Academics1440WDefault";
import ProfileInfo from "@/imports/StepsExxatComAdminProfileDetailsB67B3A7215B6Ef1188Cf6045Bdda8670Info1440WDefault";
import ProfileCompliance from "@/imports/StepsExxatComAdminProfileDetailsB67B3A7215B6Ef1188Cf6045Bdda8670Compliance1440WDefault";
import ProfileClinical from "@/imports/StepsExxatComAdminProfileDetailsB67B3A7215B6Ef1188Cf6045Bdda8670Clinicalcoursework1440WDefault";
import ProfileLearning from "@/imports/StepsExxatComAdminProfileDetailsB67B3A7215B6Ef1188Cf6045Bdda8670LearningactivitiesEvaluationsReview1440WDefault";

/** Demo student captured in the profile-details H2D set. */
export const DEMO_STUDENT_PROFILE_ID = "b67b3a72-15b6-ef11-88cf-6045bdda8670";

export const STUDENT_PROFILE_TAB_IDS = {
  overview: "profile-studentheader-overview-link",
  academics: "profile-studentheader-profile-link",
  info: "profile-studentheader-info-link",
  compliance: "profile-studentheader-compliance-link",
  clinical: "profile-studentheader-ClinicalCoursework-link",
  learning: "profile-studentheader-admin.profile.learningActivities-link",
} as const;

export type StudentProfileTabId = keyof typeof STUDENT_PROFILE_TAB_IDS;

export const STUDENT_PROFILE_TABS: {
  id: StudentProfileTabId;
  label: string;
  component: ComponentType;
}[] = [
  { id: "overview", label: "Overview", component: ProfileOverview },
  { id: "academics", label: "Academics", component: ProfileAcademics },
  { id: "info", label: "Profile", component: ProfileInfo },
  { id: "compliance", label: "Compliance", component: ProfileCompliance },
  { id: "clinical", label: "Coursework", component: ProfileClinical },
  { id: "learning", label: "Learning Activities", component: ProfileLearning },
];

const TAB_ID_BY_LINK = Object.fromEntries(
  Object.entries(STUDENT_PROFILE_TAB_IDS).map(([tab, linkId]) => [linkId, tab]),
) as Record<string, StudentProfileTabId>;

export function tabFromLinkId(linkId: string | null): StudentProfileTabId | null {
  if (!linkId) return null;
  return TAB_ID_BY_LINK[linkId] ?? null;
}

export function parseStudentProfileTab(raw: string | null): StudentProfileTabId {
  if (raw && raw in STUDENT_PROFILE_TAB_IDS) {
    return raw as StudentProfileTabId;
  }
  return "overview";
}
