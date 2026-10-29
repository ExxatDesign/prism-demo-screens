import * as React from "react";
import { getFeatureAccessAriaLabel } from "@/components/feature-access/feature-access-config";

type Props = {
  featureKey: string;
  onClick: () => void;
  className?: string;
  label?: string;
};

/** Clickable lock control — pair with `useFeatureAccessDialog` or `wireFeatureAccess`. */
export default function FeatureLevelLock({
  featureKey,
  onClick,
  className,
  label,
}: Props) {
  return (
    <button
      type="button"
      className={`feature-level-lock${className ? ` ${className}` : ""}`}
      aria-label={label ?? getFeatureAccessAriaLabel(featureKey)}
      data-feature-access={featureKey}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <i className="fa-solid fa-lock" aria-hidden />
    </button>
  );
}
