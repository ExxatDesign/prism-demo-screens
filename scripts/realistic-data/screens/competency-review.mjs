// Competency Review: framework dropdown, cohort rows, counts.
// NOTE: framework "NPTE PT Content Outlines-1" is renamed to "NPTE PT Content Outline"
// (Student 360 Overview dropdown should read the same).
const seq = (items) => { let i = 0; return () => items[Math.min(i++, items.length - 1)]; };
export default {
  files: ["CompetencyReview"],
  rules(h) {
    const num = seq(["42", "39", "3", "41", "2", "39"]); // students, then distribution pairs per cohort
    const q = (map) => {
      const idx = {};
      return (t) => {
        if (!(t in map)) return undefined;
        const arr = map[t];
        idx[t] = idx[t] ?? 0;
        return arr[Math.min(idx[t]++, arr.length - 1)];
      };
    };
    return [
      q({
        "NPTE PT Content Outlines-1": ["NPTE PT Content Outline"],
        "NPTE PT Content Outlines-1zxcv": ["NPTE PT Content Outline (2022)"],
        "NPTE PT Content Outlines-1 up": ["APTA CPI Competencies", "CAPTE PT Standard 7 (2024)"],
        "NPTE PT Content Outlines-1 ed": ["DPT Program Competencies"],
        "111th Oct": ["DPT Class of 2027"],
        "R26IntProd1": ["DPT Class of 2028"],
        "Competency threshold: 3.8": ["Competency threshold: 3.0"],
      }),
      (t) => (t === "1" || t === "0" ? num() : undefined),
    ];
  },
};
