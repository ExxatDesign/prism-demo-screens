import * as React from "react";

/** Exxat Clinical Education (`EXXAT_PRISM_BRAND` in Exxat Home / product-framework). */
const MARK_GRADIENT = ["#E31C79", "#EF609D"] as const;
const MARK_SHADOW = "#BE1E6D";

function ExxatProductMark({ className }: { className?: string }) {
  const gradId = React.useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 8.25 147 147"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M73.4939 155.238C114.084 155.238 146.988 122.334 146.988 81.7439C146.988 41.1544 114.084 8.25 73.4939 8.25C32.9044 8.25 0 41.1544 0 81.7439C0 122.334 32.9044 155.238 73.4939 155.238Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M0.594727 90.9915C4.59951 122.921 29.0894 148.466 60.4966 154.085L102.462 116.355V102.302H86.8312L102.462 88.2489V74.1957H86.8312L102.462 60.1425V46.0894H50.5575L0.594727 90.9915Z"
        fill={MARK_SHADOW}
      />
      <path d="M102.474 116.355H50.5576L58.6764 102.302H102.474V116.355Z" fill="white" />
      <path d="M102.474 60.1303H58.6764L50.5576 46.0771H102.474V60.1303Z" fill="white" />
      <path d="M102.474 88.2368H66.7949L70.8483 81.2102L66.7949 74.1836H102.474V88.2368Z" fill="white" />
      <path d="M39.2227 74.1835H66.795L58.6762 60.1304H39.2227V74.1835Z" fill="white" />
      <path d="M39.2227 102.302H58.6762L66.795 88.2368H39.2227V102.302Z" fill="white" />
      <defs>
        <linearGradient
          id={gradId}
          x1="28.3733"
          y1="134.255"
          x2="117.195"
          y2="30.9074"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={MARK_GRADIENT[0]} />
          <stop offset="1" stopColor={MARK_GRADIENT[1]} />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Utility-bar style lock-up: round E mark + product name (no "Exxat" prefix). */
export default function ClinicalEducationProductLogo() {
  return (
    <span className="ml-assign-logo-clinical-ed" role="img" aria-label="Clinical Education">
      <ExxatProductMark className="ml-assign-logo-clinical-ed__mark" />
      <span className="ml-assign-logo-clinical-ed__label">Clinical Education</span>
    </span>
  );
}
