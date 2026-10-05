export default {
  files: ["FacultyDashboard"],
  rules(h) {
    return [
      h.exact({
        "Welcome, Ananya* Sakhuja": "Welcome, Marcus Ellery",
        "Exxat Sales": "Central City College",
        "Exxat Sales logo": "Central City College logo",
        "Welcome to Exxat - Nursing": "Welcome to Central City College",
        "1747 Evaluation(s) Need Attention": "47 Evaluation(s) Need Attention",
      }),
    ];
  },
};
