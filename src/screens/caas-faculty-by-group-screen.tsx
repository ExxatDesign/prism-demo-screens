import * as React from "react";
import {
  FeatureAccessDialog,
  useFeatureAccessDialog,
} from "@/components/feature-access";
import { wireFeatureAccessLockedTab } from "@/embed/wire-feature-access";
import CaasFacultyHomeByGroup from "@/imports/StepsExxatComAdminCaasFacultyHomeBygroup1440WDefault";

export default function CaasFacultyByGroupScreen() {
  const { featureKey, requestFeatureAccess, closeFeatureAccess, isOpen } =
    useFeatureAccessDialog();

  React.useLayoutEffect(() => {
    const root = document.querySelector(".caas-faculty-by-group-screen");
    if (!root) return;

    return wireFeatureAccessLockedTab({
      root,
      featureKey: "reviewClarifications",
      tabLabel: "Review Clarifications",
      onLockedClick: requestFeatureAccess,
    });
  }, [requestFeatureAccess]);

  return (
    <div className="caas-faculty-by-group-screen">
      <CaasFacultyHomeByGroup />
      <FeatureAccessDialog
        open={isOpen}
        featureKey={featureKey}
        onClose={closeFeatureAccess}
      />
    </div>
  );
}
