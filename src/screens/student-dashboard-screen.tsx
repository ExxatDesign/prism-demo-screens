const STUDENT_DASHBOARD_SRC = "https://d5f1cb4b.student-dashboard-v3.pages.dev/";

export default function StudentDashboardScreen() {
  return (
    <div className="student-dashboard-embed">
      <iframe
        title="Student dashboard"
        className="student-dashboard-embed-frame"
        src={STUDENT_DASHBOARD_SRC}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
