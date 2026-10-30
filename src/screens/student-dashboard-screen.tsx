import * as React from "react";
import {
  FeatureAccessDialog,
  useFeatureAccessDialog,
} from "@/components/feature-access";
import {
  syncStudentDashboardFeatureAccess,
  wireStudentDashboardFeatureAccess,
} from "@/embed/wire-student-dashboard-feature-access";
import { usePrismColorTheme } from "@/theme/usePrismColorTheme";

const STUDENT_DASHBOARD_SHELL = `${import.meta.env.BASE_URL}student-dashboard-shell.html`;

export default function StudentDashboardScreen() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { featureKey, requestFeatureAccess, closeFeatureAccess, isOpen } =
    useFeatureAccessDialog();
  const { isDark, theme } = usePrismColorTheme();

  React.useEffect(() => {
    return wireStudentDashboardFeatureAccess(requestFeatureAccess);
  }, [requestFeatureAccess]);

  React.useEffect(() => {
    iframeRef.current?.contentWindow?.location.reload();
  }, [theme]);

  const syncIframeEntitlements = React.useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    syncStudentDashboardFeatureAccess(iframe);
    window.setTimeout(() => syncStudentDashboardFeatureAccess(iframe), 400);
    window.setTimeout(() => syncStudentDashboardFeatureAccess(iframe), 1500);
  }, []);

  return (
    <div className="student-dashboard-embed student-dashboard-screen">
      <iframe
        ref={iframeRef}
        title="Student dashboard"
        className="student-dashboard-embed-frame"
        src={STUDENT_DASHBOARD_SHELL}
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={syncIframeEntitlements}
      />
      <FeatureAccessDialog
        open={isOpen}
        featureKey={featureKey}
        onClose={closeFeatureAccess}
        preferDarkIllustration={isDark}
      />
    </div>
  );
}
