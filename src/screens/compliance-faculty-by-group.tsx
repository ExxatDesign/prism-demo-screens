import { ComplianceScreen } from "@/screens/compliance-screen";
import { FACULTY_GROUP_ROWS } from "@/data/compliance-mock";

export default function ComplianceFacultyByGroupScreen() {
  return (
    <ComplianceScreen
      nameColumn="Groups"
      nameLabel="By Faculty"
      entityLabel="Faculty"
      rows={FACULTY_GROUP_ROWS.map((row) => ({
        id: row.id,
        name: row.group,
        compliant: row.compliant,
        total: row.total,
        nonCompliant: row.nonCompliant,
        pendingReview: row.pendingReview,
        expiring: row.expiring,
        expired: row.expired,
        approve: row.approve,
      }))}
      viewModes={[
        { id: "group", label: "By Group" },
        { id: "faculty", label: "By Faculty" },
        { id: "document", label: "By Document" },
      ]}
      defaultView="group"
      hideEmptyLabel="Hide groups that do not have any active documents or faculty."
      selectHint="Select any group listed below to view faculty compliance details."
    />
  );
}
