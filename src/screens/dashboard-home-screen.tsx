import * as React from "react";
import {
  FeatureAccessDialog,
  useFeatureAccessDialog,
} from "@/components/feature-access";
import DashboardImport from "@/imports/StepsExxatComDashboard1440WDefault";
import {
  applyFeatureAccessDashboardNavLock,
  wireFeatureAccess,
} from "@/embed/wire-feature-access";

export const PRISM_DASHBOARD_NAV_MESSAGE = "prism-dashboard-nav" as const;

/** STEPS dashboard rows that open another Exxat product surface. */
export const DASHBOARD_EXTERNAL_LINK_IDS = [
  "dashboard-navigationitem-navigate-link-program.information",
  "dashboard-navigationitem-navigate-link-admin.profile",
  "dashboard-navigationitem-navigate-link-faculty.information",
  "dashboard-navigationitem-navigate-link-admin.course",
  "dashboard-navigationitem-navigate-link-competency.management",
] as const;

function wireDashboardNavigation(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(".dashboard_nav_item").forEach((row) => {
    if (row.dataset.prismNavWired === "1") return;
    if (row.hasAttribute("data-feature-access")) return;

    const link = row.querySelector<HTMLAnchorElement>(
      "a[id^='dashboard-navigationitem-navigate-link-']",
    );
    if (!link?.id) return;

    row.dataset.prismNavWired = "1";
    row.addEventListener("click", (event) => {
      event.preventDefault();
      window.parent.postMessage(
        { type: PRISM_DASHBOARD_NAV_MESSAGE, linkId: link.id },
        "*",
      );
    });
  });
}

export default function DashboardHomeScreen() {
  const { featureKey, requestFeatureAccess, closeFeatureAccess, isOpen } =
    useFeatureAccessDialog();

  React.useLayoutEffect(() => {
    const root = document.querySelector(".dashboard-home-screen");
    if (!root) return;

    applyFeatureAccessDashboardNavLock({
      root,
      linkId: "dashboard-navigationitem-navigate-link-admin.steps",
      featureKey: "placements",
    });

    const cleanupFeatureAccess = wireFeatureAccess(root, requestFeatureAccess);
    wireDashboardNavigation(root);

    return cleanupFeatureAccess;
  }, [requestFeatureAccess]);

  return (
    <div className="dashboard-home-screen">
      <DashboardImport />
      <FeatureAccessDialog
        open={isOpen}
        featureKey={featureKey}
        onClose={closeFeatureAccess}
      />
    </div>
  );
}
