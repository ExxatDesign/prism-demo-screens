import * as React from "react";
import { createPortal } from "react-dom";
import { getFeatureAccessDialogCopy } from "@/components/feature-access/feature-access-config";

export type FeatureAccessDialogCopy = {
  title: string;
  body: string;
};

const FEATURE_ACCESS_ILLUSTRATION_LIGHT = `${import.meta.env.BASE_URL}assets/feature-access/secure-education-illustration.png`;
const FEATURE_ACCESS_ILLUSTRATION_DARK = `${import.meta.env.BASE_URL}assets/feature-access/secure-education-illustration-dark.png`;

type Props = {
  open: boolean;
  onClose: () => void;
  dismissLabel?: string;
  /** Use dark artwork when the host surface is in dark theme (e.g. student dashboard iframe). */
  preferDarkIllustration?: boolean;
} & (
  | { featureKey: string | null; copy?: never }
  | { featureKey?: never; copy: FeatureAccessDialogCopy | null }
);

export default function FeatureAccessDialog({
  open,
  onClose,
  dismissLabel = "Got it",
  preferDarkIllustration = false,
  ...rest
}: Props) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const dialogCopy =
    "copy" in rest && rest.copy
      ? rest.copy
      : getFeatureAccessDialogCopy(
          "featureKey" in rest ? rest.featureKey : null,
        );

  if (!open || !dialogCopy) return null;

  return createPortal(
    <>
      <div
        className="feature-access-dialog-backdrop"
        aria-hidden
        onClick={onClose}
      />
      <div
        className={`feature-access-dialog${preferDarkIllustration ? " feature-access-dialog--dark-illustration" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-access-dialog-title"
      >
        <div className="feature-access-dialog__illustration" aria-hidden>
          <img
            className="feature-access-dialog__illustration-img feature-access-dialog__illustration-img--light"
            src={FEATURE_ACCESS_ILLUSTRATION_LIGHT}
            alt=""
            width={260}
            height={260}
            draggable={false}
          />
          <img
            className="feature-access-dialog__illustration-img feature-access-dialog__illustration-img--dark"
            src={FEATURE_ACCESS_ILLUSTRATION_DARK}
            alt=""
            width={260}
            height={260}
            draggable={false}
          />
        </div>
        <h2 id="feature-access-dialog-title" className="feature-access-dialog__title">
          {dialogCopy.title}
        </h2>
        <p className="feature-access-dialog__body">{dialogCopy.body}</p>
        <div className="feature-access-dialog__actions">
          <button
            type="button"
            className="feature-access-dialog__btn"
            onClick={onClose}
          >
            {dismissLabel}
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
