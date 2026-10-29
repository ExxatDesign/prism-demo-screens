import * as React from "react";

/** Exxat Exam Management (`EXXAT_EXAM_MANAGEMENT_BRAND` / Exxat Home utility bar). */
export const EXAM_MANAGEMENT_BRAND_COLOR = "#3F51B5";

const EXAM_MARK = `${import.meta.env.BASE_URL}assets/manage-licenses/exam-management-mark.svg`;

export default function ExamManagementProductLogo() {
  return (
    <span className="ml-assign-logo-exam-mgmt" role="img" aria-label="Exam Management">
      <img
        className="ml-assign-logo-exam-mgmt__mark"
        src={EXAM_MARK}
        alt=""
        width={20}
        height={20}
        draggable={false}
      />
      <span className="ml-assign-logo-exam-mgmt__label">Exam Management</span>
    </span>
  );
}
