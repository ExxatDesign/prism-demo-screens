import * as React from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router";
import DemoNav from "@/app/DemoNav";
import CaasFacultyHomeByGroup from "@/imports/StepsExxatComAdminCaasFacultyHomeBygroup1440WDefault";
import ComplianceHomeCohort from "@/imports/StepsExxatComAdminComplianceHomeCohort1440WDefault";
import CurriculumCourseOfferings from "@/imports/StepsExxatComAdminCurriculumCourseofferings1440WDefault";
import ProfileSearchScreen from "@/screens/profile-search-screen";
import ProfileSetupScreen from "@/screens/profile-setup-screen";
import ProfileManageLicensesScreen from "@/screens/profile-manage-licenses-screen";
import StudentProfileScreen from "@/screens/student-profile-screen";
import FacultySearch from "@/imports/StepsExxatComAdminFacultySearch1440WDefault";
import ProgramProgramDetailsScreen from "@/screens/program-program-details-screen";
import CompetencyReview from "@/imports/StepsExxatComAdminCompetencyReview1440WDefault";
import CmapCurriculum from "@/imports/StepsExxatComAdminCmapCurriculum1440WDefault";
import DashboardHome from "@/screens/dashboard-home-screen";
import FacultyDashboard from "@/imports/StepsExxatComFacultyDashboard1440WDefault";
import FacultyCaas from "@/imports/StepsExxatComFacultyCaas1440WDefault";
import TenantApps from "@/imports/StepsExxatComAdminTenantApps1440WDefault";
import OneSchoolDashboardScreen from "@/screens/one-school-dashboard-screen";
import StudentDashboardScreen from "@/screens/student-dashboard-screen";
import StudentComplianceDashboardScreen from "@/screens/student-compliance-dashboard-screen";

const screens = [
  { path: "/dashboard", component: DashboardHome },
  { path: "/admin/tenant-apps", component: TenantApps },
  { path: "/one/school/dashboard", component: OneSchoolDashboardScreen },
  { path: "/faculty/dashboard", component: FacultyDashboard },
  { path: "/faculty/caas", component: FacultyCaas },
  { path: "/caas/faculty/home/bygroup", component: CaasFacultyHomeByGroup },
  { path: "/compliance/home/cohort", component: ComplianceHomeCohort },
  { path: "/curriculum/courseofferings", component: CurriculumCourseOfferings },
  { path: "/profile/search", component: ProfileSearchScreen },
  { path: "/profile/setup/manage-licenses", component: ProfileManageLicensesScreen },
  { path: "/profile/setup", component: ProfileSetupScreen },
  { path: "/profile/details", component: StudentProfileScreen },
  { path: "/admin/faculty/search", component: FacultySearch },
  { path: "/program/programdetails", component: ProgramProgramDetailsScreen },
  { path: "/competency/review", component: CompetencyReview },
  { path: "/cmap/curriculum", component: CmapCurriculum },
  { path: "/student", component: StudentDashboardScreen },
  { path: "/student/compliance", component: StudentComplianceDashboardScreen },
] as const;

const EMBED_KEY = "prism-demo:embed";
const EMBED_NAV_KEY = "prism-demo:embed-nav";

function readStored(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    /* storage can be blocked; embed still works for the first screen */
  }
}

/**
 * Embed mode, remembered for the tab.
 *
 * The host passes `?embed=1` once, on the iframe's first load. In-app links (a
 * student row into Student 360, a tab into another screen) navigate without the
 * query, so reading only the URL dropped embed mode on the second screen and
 * brought back the gallery's SCREENS bar inside the host's page. `?embed=0`
 * clears it for a standalone visit.
 */
function useEmbedMode() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("embed");
  const navParam = searchParams.get("embedNav");

  if (param === "1") writeStored(EMBED_KEY, "1");
  else if (param === "0") writeStored(EMBED_KEY, null);
  if (navParam === "sidebar" || navParam === "tabs") writeStored(EMBED_NAV_KEY, navParam);

  const embed = param === "1" || (param !== "0" && readStored(EMBED_KEY) === "1");
  const nav = navParam ?? readStored(EMBED_NAV_KEY);
  return { embed, embedNav: nav === "sidebar" ? ("sidebar" as const) : ("tabs" as const) };
}

export default function App() {
  const { embed, embedNav } = useEmbedMode();

  React.useEffect(() => {
    const root = document.documentElement;
    if (!embed) {
      root.removeAttribute("data-embed");
      root.removeAttribute("data-embed-nav");
      return;
    }
    root.setAttribute("data-embed", "1");
    root.setAttribute("data-embed-nav", embedNav);
    return () => {
      root.removeAttribute("data-embed");
      root.removeAttribute("data-embed-nav");
    };
  }, [embed, embedNav]);

  return (
    <div className="min-h-dvh w-full bg-[#f8f8f8]">
      {!embed ? <DemoNav /> : null}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {screens.map((screen) => (
          <Route
            key={screen.path}
            path={screen.path}
            element={
              <div
                className="h2d-screen"
                data-embed={embed ? "1" : undefined}
                data-embed-nav={embed ? embedNav : undefined}
              >
                <screen.component />
              </div>
            }
          />
        ))}
      </Routes>
    </div>
  );
}
