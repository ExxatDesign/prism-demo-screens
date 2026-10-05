import { DEMO_STUDENT, SCHOOL, student } from "../universe.mjs";

// Student 360 tabs (Overview, Academics, Profile, Compliance, Coursework, Learning Activities).
export default {
  files: ["ProfileDetails"],
  rules(h, filename = "") {
    let nameSwap = 0;
    const s0 = student(0);
    const s1 = student(1);
    const s2 = student(2);
    return [
      // Info tab: capture has first/last name swapped. Stateful so re-running is a no-op.
      (t) => {
        if (!filename.includes("Info") || (t !== "Godbey" && t !== "Alyson")) return undefined;
        return nameSwap++ === 0 ? DEMO_STUDENT.first : DEMO_STUDENT.last;
      },
      // Academics tab: bare "123" is an attestation title there, a cohort elsewhere.
      (t) => (t === "123" && filename.includes("Academics") ? "Attendance Policy" : undefined),
      // Coursework tab placement names arrive as "|  name" in one text node.
      (t) => {
        const m = t.match(/^\|(\s+)(new|TEST|On going Rotation|feb12rotedited for reports|report testing rota 2)$/);
        if (!m) return undefined;
        const map = {
          new: "Orthopedic Outpatient Rotation",
          TEST: "Acute Care Rotation",
          "On going Rotation": "Outpatient Sports Rotation",
          "feb12rotedited for reports": "Inpatient Mixed Rotation",
          "report testing rota 2": "Inpatient Rehab Rotation",
        };
        return "|" + m[1] + map[m[2]];
      },
      h.exact({
        // header
        "agodbey@exxat.testinator.com": DEMO_STUDENT.email,
        "Mohini Report Testing": DEMO_STUDENT.cohort,
        "Alexandra  00Drexler": s0.fullName,
        "Amy Goode": s1.fullName,
        // overview
        "Not Assigned": "Good Standing",
        "23 pending attestations": "3 pending attestations",
        "89 overdue": "2 overdue",
        "47 Attestations pending": "3 Attestations pending",
        // courses
        "20 - HDFC": "DPT 701 – Clinical Practicum I",
        "feb12sancourse - feb12sancourse": "DPT 695 – Clinical Practicum Seminar",
        "R39 - Mohini Report testing": "DPT 640 – Neurological Rehabilitation",
        "28021993 - Course Tour 21st Dec": "DPT 612 – Orthopedic Management",
        "00909 - Prod 2024": "DPT 790 – Licensure Preparation",
        "PLAN 2025": "Fall 2026",
        "Prod-Term-SB": "Summer 2026",
        "Term-26": "Spring 2026",
        "Term": "Spring 2026",
        ", 2020 - 2021": ", 2026 - 2027",
        "2020 - 2021": "2026 - 2027",
        ", 2024 - 2025": ", 2025 - 2026",
        "2024 - 2025": "2025 - 2026",
        ", Runtime AY31011031": ", 2025 - 2026",
        "Runtime AY31011031": "2025 - 2026",
        ", Year 1": ", Year 3",
        "Year 1": "Year 3",
        ", Year 4": ", Year 2",
        "Year 4": "Year 2",
        ", Year Ii R46": ", Year 3",
        ", q": ", Fall 2026",
        ", 123": ", " + DEMO_STUDENT.cohort,
        "123": DEMO_STUDENT.cohort,
        "feb12coh": DEMO_STUDENT.cohort,
        "Cohort 2023 - FG": DEMO_STUDENT.cohort,
        "Cohort Tour 21st dec": DEMO_STUDENT.cohort,
        // placements
        "PM00977358": "PM00977358",
        "TEST": "Acute Care Rotation",
        "report testing rota 2": "Inpatient Rehab Rotation",
        "On going Rotation": "Outpatient Sports Rotation",
        "feb12rotedited for reports": "Inpatient Mixed Rotation",
        "new": "Orthopedic Outpatient Rotation",
        "09/16/2025 - 01/03/2027": "08/24/2026 - 12/18/2026",
        "03/01/2024 - 03/27/2024": "06/01/2026 - 07/24/2026",
        "12/01/2024 - 04/30/2025": "03/09/2026 - 04/24/2026",
        "01/01/2025 - 12/30/2025": "04/27/2026 - 05/22/2026",
        "01/01/2026 - 03/31/2026": "01/12/2026 - 02/27/2026",
        "Published on 09/17/2025": "Published on 08/03/2026",
        "Published on 08/08/2025": "Published on 04/06/2026",
        "Published on 06/17/2026": "Published on 05/11/2026",
        "Published on 01/13/2026": "Published on 12/08/2025",
        // locations
        "185": "Parkland Memorial Hospital",
        "!Outpatientt": "Inpatient Acute Care",
        "!!!!!!!!!!": "Inpatient Rehab",
        "#site new": "ATI Physical Therapy – Frisco",
        "0908 site": "Methodist Richardson",
        // preceptors
        "test tst2": "Daniel Reyes, PT, DPT",
        "test@yahoo.com": "dreyes@parklandmemorial.org",
        "Jeason thomas": "Karen Whitaker, PT, DPT",
        "Jeason.thomas@yahoo.com": "kwhitaker@medicalcitydallas.org",
        "abc xyz": "Michael Torres, PT, DPT",
        "abc@gmail.com": "mtorres@atiphysicaltherapy.org",
        "Steave Rogger": "Steven Rogers, PT, DPT",
        "steve.r22@exaple.com": "srogers@medicalcitydallas.org",
        "Preceptor Fix": "Angela Brennan, PT, DPT",
        "tamexxat@123mailinator.com": "abrennan@methodistrichardson.org",
        // compliance
        "1.COVID-19 Vaccination test": "COVID-19 Vaccination",
        "12/25/2024": "09/15/2026",
        // academics
        "19feb (04/01/2023)": "Fall 2024 (08/19/2024)",
        "1S": "SB",
        "12suraj sam12": "Samuel Brooks",
        "00": "HO",
        "0210 0210": "Helen Okafor",
        "RJ": "ME",
        "Renee Jones": "Marcus Ellery",
        // attestations
        "Submit all required documents before 1 june": "Submit all required documents before June 1",
        "Test tes tes test": "Complete before the start of clinical placements.",
        "R25 Cohort services": "Cohort Services Agreement",
        "R25 Cohort servicesR25 Cohort servicesR25 Cohort services": "I agree to the cohort services, advising, and attendance expectations.",
        "Attestation Testing": "Technical Standards Attestation",
        "july24attes": "Student Handbook Acknowledgement",
        "Attestation Test": "Clinical Site Confidentiality Agreement",
        "R31 profile attestation": "Profile Accuracy Attestation",
        "Testing profile attestation": "I attest that my profile information is current.",
        "test": "Professional Conduct Policy",
        "test1805": "Social Media Policy",
        "R35 Attestations": "HIPAA Privacy Acknowledgement",
        "aa": "Code of Conduct",
        "bb": "Confidentiality Agreement",
        "cc": "Photo & Media Release",
        "alexii": "Immunization Records Release",
        "test 1": "Consent to share immunization records with clinical sites.",
        "Vipul Test": "Liability Waiver",
        "Testing for generating a report": "I acknowledge the risks associated with clinical experiences.",
        "Test09": "Program Orientation",
        "Hello welcome": "Confirm you have reviewed the program orientation materials.",
        "Student KT": "Academic Integrity Policy",
        "R43Stud Attestation 01": "I have read and will abide by the academic integrity policy.",
        "Testing 1 31-08-2026": "Please complete by 08/31/2026.",
        "This is testing": "Acknowledge the clinical education handbook for 2026-2027.",
        "StudentAttestation01": "Clinical Education Handbook",
        // profile
        "576765677": DEMO_STUDENT.id,
        "995 Lake Forest Rd": "1418 Maple Hollow Dr",
        "Clearwater,": "Dallas,",
        "FL 33765-2240": "TX 75206-4417",
      }),
    ];
  },
};
