// Program Details (Setup): DPT program at Central City College.
// Section/label state machines only depend on chrome labels, so output is stable on re-runs.
const CAMPUS = [
  "Main Campus", "Downtown Campus", "Medical Center Campus", "Online", "North Dallas Campus",
  "Plano Teaching Site", "Fort Worth Campus", "Richardson Learning Center", "Frisco Clinical Hub",
  "Lakewood Annex", "Preston Hollow Site", "Arlington Campus", "Irving Campus", "Garland Site",
  "Southlake Center", "McKinney Campus", "Denton Campus", "Addison Center", "Oak Cliff Site",
  "Uptown Campus", "Las Colinas Campus", "Carrollton Site", "Mesquite Center", "Lewisville Site",
  "Waxahachie Campus", "Grapevine Center", "Allen Campus", "Rockwall Site", "Duncanville Center",
  "Cedar Hill Campus", "Flower Mound Site", "The Colony Center", "Coppell Campus", "Highland Park Site",
  "Deep Ellum Annex", "Bishop Arts Site", "Love Field Center", "Mockingbird Campus", "Park Cities Site",
  "Trinity Groves Site", "Medical District Site", "Victory Park Center", "Turtle Creek Site",
  "Knox-Henderson Site", "Eastside Campus", "Westside Campus", "Northpark Center", "Cityplace Campus",
  "Midtown Center", "Skillman Site", "Lake Highlands Site", "Pleasant Grove Site", "Oak Lawn Site",
  "Hillcrest Campus", "Old East Dallas Site", "Casa Linda Site", "Stonebriar Center", "Prosper Site",
];
const ACC = [
  ["CAPTE Accreditation", "Accredited", "Programmatic", "Accredited by the Commission on Accreditation in Physical Therapy Education through 2035.", "06/30/2027", "06/30/2025"],
  ["Self-Study Report", "Accredited", "Programmatic", "Self-study submitted ahead of the scheduled review; outcomes data and faculty qualifications verified.", "09/15/2027", "09/20/2025"],
  ["Site Visit Review", "Candidate", "Programmatic", "On-site visit completed by the review team with no outstanding compliance concerns.", "04/12/2027", "04/28/2025"],
  ["Candidacy Application", "Accredited", "Programmatic", "Candidacy application and supporting documents accepted by the commission.", "11/10/2026", "11/01/2025"],
  ["Annual Accreditation Report", "Accredited", "Institutional", "Annual report filed on schedule; graduation, NPTE pass, and employment rates exceed thresholds.", "12/05/2026", "12/05/2025"],
  ["Interim Progress Report", "Accredited", "Programmatic", "Interim report on clinical education capacity accepted without further action.", "02/10/2027", "02/05/2026"],
  ["Curriculum Review", "Accredited", "Programmatic", "Curriculum map reviewed against current evaluative criteria and found compliant.", "03/30/2027", "03/16/2026"],
  ["Facility Compliance Review", "Accredited", "Institutional", "Laboratory, library, and simulation facilities verified as adequate for the cohort size.", "07/17/2027", "05/17/2026"],
  ["Clinical Education Review", "Accredited", "Programmatic", "Clinical education agreements verified current for all participating sites.", "-", "-"],
  ["Substantive Change Notice", "Accredited", "Programmatic", "Notice of increase in cohort size approved by the commission.", "09/25/2027", "09/11/2025"],
  ["Faculty Qualifications Review", "Accredited", "Institutional", "Core faculty credentials and scholarship expectations reviewed and confirmed.", "09/22/2027", "10/29/2025"],
  ["Assessment Plan Review", "Accredited", "Programmatic", "Student learning assessment plan reviewed; standards compliance verified.", "09/26/2027", "07/18/2026"],
  ["Outcomes Data Review", "Accredited", "Programmatic", "Three-year outcomes data submitted and accepted by the commission.", "09/28/2027", "09/21/2026"],
  ["Program Resources Review", "Accredited", "Institutional", "Annual report accepted; resources and budget confirmed adequate.", "-", "-"],
  ["Continuing Accreditation Review", "Accredited", "Programmatic", "Reaffirmation of accreditation granted through the next review cycle.", "12/14/2027", "12/02/2026"],
];
const PASS = new Set(["+", "Add Campus", "…", "United States of America", "United States", "of America"]);
export default {
  files: ["ProgramProgramdetails"],
  rules(h) {
    let sec = "", lab = "", e = -1, vcount = 0, ci = 0;
    const LABELS = {
      "Accreditation status": "status", "Type of Accreditation": "type", "Details": "details",
      "Next accreditation date": "next", "Most recent accreditation date": "recent",
    };
    const track = (t) => {
      if (t === "Campus") sec = "campus";
      else if (t === "Mission and vision") sec = "mission";
      else if (t === "Accreditation") { sec = "accr"; lab = ""; }
      else if (sec === "accr" && t in LABELS) { lab = LABELS[t]; vcount = 0; }
      return undefined;
    };
    const accr = (t) => {
      if (sec !== "accr" || t in LABELS || t === "+" || t === "Show More" || t === "Accreditation") return undefined;
      if (lab === "" || (lab === "recent" && vcount >= 1)) {
        e = lab === "" && e < 0 ? 0 : e + 1;
        lab = "";
        return ACC[Math.min(e, ACC.length - 1)][0];
      }
      const row = ACC[Math.min(Math.max(e, 0), ACC.length - 1)];
      const first = vcount++ === 0;
      if (lab === "status") return row[1];
      if (lab === "type") return row[2];
      if (lab === "details") return first ? row[3] : "";
      if (lab === "next") return row[4];
      if (lab === "recent") { if (e >= ACC.length - 1) sec = "done"; return row[5]; }
      return undefined;
    };
    const campus = (t) => {
      if (sec !== "campus" || PASS.has(t) || /[,-]$/.test(t) || /^\d{5}/.test(t)) return undefined;
      return CAMPUS[ci++ % CAMPUS.length];
    };
    const sw = (re, to) => (t) => (re.test(t) ? to : undefined);
    return [
      (t) => (/^[\uE000-\uF8FF\s]+$/.test(t) ? t : undefined), // icon-font glyph spans: leave alone
      track,
      h.exact({
        "Physical Therapy - PTA": "Doctor of Physical Therapy",
        "BTech.msc": "DPT",
        "2070 JOHN HARDEN DRIVE1.": "2500 University Blvd.",
        "SUITE N11.": "Suite 110.",
        "JACKSONVILLE12.,": "Dallas,",
        "IA 12365-4852": "TX 75204-1180",
        "this is address,": "800 Medical Center Dr.,",
        "cit,": "Dallas,",
        "CO,": "TX,",
        "78328-7322,": "75235-9011,",
        "Outside United States of America": "United States of America",
        "1560 Lakeland Park Drive,": "1200 Main Street,",
        "Alpharetta,": "Dallas,",
        "GA,": "TX,",
        "30201,": "75202,",
        "RTR,": "3100 Preston Rd.,",
        "ERTER,": "Suite 200,",
        "RFDGFR,": "Plano,",
        "34545-": "75093-",
        "5555,": "7342,",
        "Campus-R23-": "Southlake Center", "R23-student-": "Preston Hollow Site", "JM-New Prod-": "Uptown Annex", "florida -- testing-": "Irving Teaching Site",
        "4019 Lodgeville Road,": "4500 Camp Bowie Blvd.,",
        "Minneapolis,": "Fort Worth,",
        "MN,": "TX,",
        "55415,": "76107,",
      }),
      accr,
      campus,
      sw(/^"PT1" : Physical Therapy is/, "The Doctor of Physical Therapy program at Central City College prepares graduates to practice as autonomous, evidence-based physical therapists. Students complete"),
      sw(/^goal of the program is to educate/, " three years of integrated didactic coursework, laboratory instruction, and full-time clinical education across inpatient, outpatient, neurological, pediatric, and sports settings, with early patient contact."),
      sw(/^are system yet continue/, " Graduates are eligible to sit for the National Physical Therapy Examination (NPTE) and are prepared to practice effectively, safely, and ethically in any type of health care environment."),
      sw(/^PT - Physical Therapy is a dynamic care profession/, "Applicants must complete prerequisite coursework in anatomy, physiology, physics, chemistry, and statistics, and 40 observation hours under a licensed physical therapist before matriculation. The"),
      sw(/^test missionwe$/, "Prepare compassionate, evidence-based physical therapists who improve movement and health in the communities they serve."),
      sw(/^test here were a couple of tools/, "Central City College educates movement-science leaders through rigorous coursework, early clinical immersion, and interprofessional collaboration with partner health systems across North Texas..."),
      sw(/^here were a couple of tools/, "We cultivate lifelong learners who advance the profession through research, advocacy, and service, ensuring access to high-quality rehabilitation care for diverse populations..."),
      sw(/^testsdf$/, "To be the leading regional program for clinically excellent, socially responsible physical therapy education."),
    ];
  },
};
