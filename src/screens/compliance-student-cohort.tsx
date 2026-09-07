import { ComplianceScreen } from "@/screens/compliance-screen";
import { STUDENT_COHORT_ROWS } from "@/data/compliance-mock";

export default function ComplianceStudentCohortScreen() {
  return (
    <ComplianceScreen
      nameColumn="Cohorts"
      nameLabel="By Student"
      entityLabel="Students"
      rows={STUDENT_COHORT_ROWS.map((row) => ({
        id: row.id,
        name: row.cohort,
        compliant: row.compliant,
        total: row.total,
        nonCompliant: row.nonCompliant,
        pendingReview: row.pendingReview,
        expiring: row.expiring,
        expired: row.expired,
        approve: row.approve,
      }))}
      viewModes={[
        { id: "cohort", label: "By Cohort" },
        { id: "student", label: "By Student" },
        { id: "document", label: "By Document" },
      ]}
      defaultView="cohort"
      hideEmptyLabel="Hide cohorts that do not have any active documents or students."
      selectHint="Select any cohort listed below to view compliance details."
    />
  );
}
