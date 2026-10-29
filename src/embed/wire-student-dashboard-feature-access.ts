import {
  buildFeatureAccessSyncMessage,
  parseFeatureAccessRequestMessage,
} from "@/components/feature-access/feature-access-messages";

export function syncStudentDashboardFeatureAccess(iframe: HTMLIFrameElement) {
  iframe.contentWindow?.postMessage(buildFeatureAccessSyncMessage(), "*");
}

export function wireStudentDashboardFeatureAccess(
  onLockedFeatureClick: (featureKey: string) => void,
): () => void {
  const onMessage = (event: MessageEvent) => {
    const request = parseFeatureAccessRequestMessage(event.data);
    if (!request) return;
    onLockedFeatureClick(request.featureKey);
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}
