import * as React from "react";
import { useNavigate } from "react-router";
import { useProfileAdminTabNavCapture } from "@/embed/use-profile-admin-tab-nav";
import ProfileSearch from "@/imports/StepsExxatComAdminProfileSearch1440WDefault";
import { DEMO_STUDENT_PROFILE_ID } from "@/profile/student-profile-tabs";

function findStudentNameLink(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;

  const fromName = target.closest<HTMLAnchorElement>(".list-item-name")?.closest("a");
  if (fromName) return fromName;

  const anchor = target.closest<HTMLAnchorElement>("a");
  if (anchor?.querySelector(".list-item-name")) return anchor;

  const lastNameCell = target.closest<HTMLTableCellElement>(
    "td.mat-column-lastName, td.cdk-column-lastName",
  );
  return lastNameCell?.querySelector(".list-item-name")?.closest("a") ?? null;
}

export default function ProfileSearchScreen() {
  const navigate = useNavigate();
  const onTabCapture = useProfileAdminTabNavCapture();

  const onNavigateToProfile = React.useCallback(
    (event: React.MouseEvent) => {
      const nameLink = findStudentNameLink(event.target);
      if (!nameLink) return;

      event.preventDefault();
      event.stopPropagation();

      const params = new URLSearchParams({
        tab: "overview",
        studentId: DEMO_STUDENT_PROFILE_ID,
      });
      navigate(`/profile/details?${params.toString()}`);
    },
    [navigate],
  );

  const onScreenCapture = React.useCallback(
    (event: React.MouseEvent) => {
      onTabCapture(event);
      onNavigateToProfile(event);
    },
    [onNavigateToProfile, onTabCapture],
  );

  return (
    <div className="profile-admin-screen profile-search-screen" onClickCapture={onScreenCapture}>
      <ProfileSearch />
    </div>
  );
}
