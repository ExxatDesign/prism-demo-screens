import * as React from "react";

export function useFeatureAccessDialog() {
  const [featureKey, setFeatureKey] = React.useState<string | null>(null);

  const requestFeatureAccess = React.useCallback((key: string) => {
    setFeatureKey(key);
  }, []);

  const closeFeatureAccess = React.useCallback(() => {
    setFeatureKey(null);
  }, []);

  return {
    featureKey,
    requestFeatureAccess,
    closeFeatureAccess,
    isOpen: featureKey !== null,
  };
}
