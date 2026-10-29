import * as React from "react";
import { createPortal } from "react-dom";
import { getFeatureAccessDialogCopy } from "@/components/feature-access/feature-access-config";

export type FeatureAccessDialogCopy = {
  title: string;
  body: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  dismissLabel?: string;
} & (
  | { featureKey: string | null; copy?: never }
  | { featureKey?: never; copy: FeatureAccessDialogCopy | null }
);

export default function FeatureAccessDialog({
  open,
  onClose,
  dismissLabel = "Got it",
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
      : rest.featureKey
        ? getFeatureAccessDialogCopy(rest.featureKey)
        : null;

  if (!open || !dialogCopy) return null;

  return createPortal(
    <>
      <div
        className="feature-access-dialog-backdrop"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="feature-access-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-access-dialog-title"
      >
        <div className="feature-access-dialog__icon" aria-hidden>
          <i className="fa-solid fa-lock" />
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
