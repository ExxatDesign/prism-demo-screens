import * as React from "react";
import { useProfileAdminTabNavCapture } from "@/embed/use-profile-admin-tab-nav";
import { useProfileSetupSidebarNavCapture } from "@/embed/use-profile-setup-sidebar-nav";
import ProfileInviteStudent from "@/imports/StepsExxatComAdminProfileConfigurationInviteStudent1440WDefault";

export default function ProfileSetupScreen() {
  const onTabCapture = useProfileAdminTabNavCapture();
  const onSidebarCapture = useProfileSetupSidebarNavCapture();

  return (
    <div
      className="profile-admin-screen profile-setup-screen"
      onClickCapture={(event) => {
        onTabCapture(event);
        onSidebarCapture(event);
      }}
    >
      <ProfileInviteStudent />
    </div>
  );
}
