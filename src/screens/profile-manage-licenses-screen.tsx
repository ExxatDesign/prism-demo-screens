import * as React from "react";
import { useProfileAdminTabNavCapture } from "@/embed/use-profile-admin-tab-nav";
import { useProfileSetupSidebarNavCapture } from "@/embed/use-profile-setup-sidebar-nav";
import { applyManageLicensesDemoData } from "@/embed/manage-licenses-table-demo-data";
import { applyManageLicensesTableLayout } from "@/embed/manage-licenses-table-layout";
import { wireManageLicensesTableSelection } from "@/embed/manage-licenses-table-selection";
import ManageLicensesAssignDrawer from "@/components/manage-licenses/ManageLicensesAssignDrawer";
import ProfileManageLicenses from "@/imports/StepsExxatComAdminProfileConfigurationManageLicenses1440WDefault";

export default function ProfileManageLicensesScreen() {
  const onTabCapture = useProfileAdminTabNavCapture();
  const onSidebarCapture = useProfileSetupSidebarNavCapture();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerStudentCount, setDrawerStudentCount] = React.useState(0);

  const openDrawer = React.useCallback((count: number) => {
    setDrawerStudentCount(count);
    setDrawerOpen(true);
  }, []);

  React.useLayoutEffect(() => {
    const root = document.querySelector(
      ".profile-manage-licenses-screen plugin-manage-licenses",
    );
    if (!root) return;
    applyManageLicensesTableLayout(root);
    applyManageLicensesDemoData(root);
    return wireManageLicensesTableSelection(root, {
      onBulkAssign: openDrawer,
    });
  }, [openDrawer]);

  return (
    <div
      className="profile-admin-screen profile-manage-licenses-screen"
      onClickCapture={(event) => {
        onTabCapture(event);
        onSidebarCapture(event);
      }}
    >
      <ProfileManageLicenses />
      <ManageLicensesAssignDrawer
        open={drawerOpen}
        studentCount={drawerStudentCount}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
