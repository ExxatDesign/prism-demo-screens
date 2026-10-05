import * as React from "react";

const MARK = "#3F51B5";

function ExamManagementMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="10" cy="10" r="10" fill={MARK} />
      <path
        d="M6 5.5h8v1.25H6V5.5zm0 3.25h8v1.25H6V8.75zm0 3.25h5.5v1.25H6V12z"
        fill="white"
      />
      <path
        d="M13.25 12l1.5 1.5 2.75-2.75"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExamManagementProductLogo() {
  return (
    <span className="ml-assign-logo-exam-mgmt" role="img" aria-label="Exam Management">
      <ExamManagementMark className="ml-assign-logo-exam-mgmt__mark" />
      <span className="ml-assign-logo-exam-mgmt__label">Exam Management</span>
    </span>
  );
}
