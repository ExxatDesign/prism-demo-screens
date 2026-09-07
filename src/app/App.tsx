import * as React from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router";
import DemoNav from "@/app/DemoNav";
import CaasFacultyHomeByGroup from "@/imports/StepsExxatComAdminCaasFacultyHomeBygroup1440WDefault";
import ComplianceHomeCohort from "@/imports/StepsExxatComAdminComplianceHomeCohort1440WDefault";
import CurriculumCourseOfferings from "@/imports/StepsExxatComAdminCurriculumCourseofferings1440WDefault";
import ProfileSearch from "@/imports/StepsExxatComAdminProfileSearch1440WDefault";
import ProgramProgramDetailsScreen from "@/screens/program-program-details-screen";
import CompetencyReview from "@/imports/StepsExxatComAdminCompetencyReview1440WDefault";
import CmapCurriculum from "@/imports/StepsExxatComAdminCmapCurriculum1440WDefault";

const screens = [
  { path: "/caas/faculty/home/bygroup", component: CaasFacultyHomeByGroup },
  { path: "/compliance/home/cohort", component: ComplianceHomeCohort },
  { path: "/curriculum/courseofferings", component: CurriculumCourseOfferings },
  { path: "/profile/search", component: ProfileSearch },
  { path: "/program/programdetails", component: ProgramProgramDetailsScreen },
  { path: "/competency/review", component: CompetencyReview },
  { path: "/cmap/curriculum", component: CmapCurriculum },
] as const;

export default function App() {
  const [searchParams] = useSearchParams();
  const embed = searchParams.get("embed") === "1";
  const embedNav = searchParams.get("embedNav") === "sidebar" ? "sidebar" : "tabs";

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
        <Route path="/" element={<Navigate to="/caas/faculty/home/bygroup" replace />} />
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
