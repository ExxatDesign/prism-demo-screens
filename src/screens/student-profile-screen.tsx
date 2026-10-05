import * as React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useStudentProfileEnhancements } from "@/embed/use-student-profile-enhancements";
import { useStudentProfileExtraTabs } from "@/embed/use-student-profile-extra-tabs";
import { useStudentProfileTabNavCapture } from "@/embed/use-student-profile-tab-nav";
import { parseStudentProfileTab, STUDENT_PROFILE_TABS } from "@/profile/student-profile-tabs";

export default function StudentProfileScreen() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = parseStudentProfileTab(searchParams.get("tab"));
  const onTabCapture = useStudentProfileTabNavCapture(setSearchParams);
  useStudentProfileEnhancements(tab);
  const extraPanel = useStudentProfileExtraTabs(tab);

  const onScreenCapture = React.useCallback(
    (event: React.MouseEvent) => {
      onTabCapture(event);
      const target = event.target;
      if (!(target instanceof Element)) return;
      const back = target.closest("#Back_to_StudentGrid");
      if (!back) return;
      event.preventDefault();
      event.stopPropagation();
      navigate("/profile/search");
    },
    [navigate, onTabCapture],
  );

  const active = STUDENT_PROFILE_TABS.find(t => t.id === tab) ?? STUDENT_PROFILE_TABS[0];
  const Panel = active.component;

  return (
    <div
      className="student-profile-screen"
      data-student-profile-tab={tab}
      onClickCapture={onScreenCapture}
    >
      <Panel key={tab} />
      {extraPanel}
    </div>
  );
}
