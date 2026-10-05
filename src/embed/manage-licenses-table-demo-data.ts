/** Figma 1383-19956 / row 1383-18894 — license columns (no email in CE / Approve cells). */

export type LicensePillVariant = "lapsed" | "used" | "unused" | "notAvailable";

type LicenseCell =
  | { kind: "license"; title: string; pill: Exclude<LicensePillVariant, "notAvailable"> }
  | { kind: "notAvailable" };

type DemoStudentRow = {
  name: string;
  email: string;
  cohort: string;
  category: string;
  group: string;
  campus: string;
  clinicalEducation: LicenseCell;
  approve: LicenseCell;
  examManagement: LicenseCell;
};

const CE_LICENSE =
  "Clinical Education licenses for class of 2026-2029 - PT";
const APPROVE_LICENSE =
  "S0023: Approve licenses for class of 2026-2029 - All program";
const EXAM_LICENSE =
  "S0041: Exam Management licenses for class of 2026-2029 - PT";

/** Figma 1383-18894 — Ann: CE lapsed; Approve = Not Available only. */
const DEMO_STUDENTS: DemoStudentRow[] = [
  {
    name: "Ann Lubin",
    email: "ann@school.com",
    cohort: "Class of 2026",
    category: "Category-A",
    group: "Group-A",
    campus: "East",
    clinicalEducation: { kind: "license", title: CE_LICENSE, pill: "lapsed" },
    approve: { kind: "notAvailable" },
    examManagement: { kind: "notAvailable" },
  },
  {
    name: "Hanna Stanton",
    email: "hanna@school.com",
    cohort: "Class of 2026",
    category: "Category-A",
    group: "Group-A",
    campus: "East",
    clinicalEducation: { kind: "license", title: CE_LICENSE, pill: "used" },
    approve: { kind: "license", title: APPROVE_LICENSE, pill: "unused" },
    examManagement: { kind: "license", title: EXAM_LICENSE, pill: "used" },
  },
  {
    name: "Marcus Madsen",
    email: "marcus@school.com",
    cohort: "Class of 2026",
    category: "Category-A",
    group: "Group-A",
    campus: "East",
    clinicalEducation: { kind: "license", title: CE_LICENSE, pill: "unused" },
    approve: { kind: "license", title: APPROVE_LICENSE, pill: "unused" },
    examManagement: { kind: "license", title: EXAM_LICENSE, pill: "unused" },
  },
  {
    name: "Nolan Stanton",
    email: "nolan@school.com",
    cohort: "Class of 2026",
    category: "Category-A",
    group: "Group-A",
    campus: "East",
    clinicalEducation: { kind: "license", title: CE_LICENSE, pill: "unused" },
    approve: { kind: "license", title: APPROVE_LICENSE, pill: "lapsed" },
    examManagement: { kind: "notAvailable" },
  },
];

const PILL_LABEL: Record<LicensePillVariant, string> = {
  lapsed: "Lapsed",
  used: "Used",
  unused: "Unused",
  notAvailable: "Not Available",
};

function setCellText(cell: Element | null, text: string) {
  if (!cell) return;
  const target =
    cell.querySelector(":scope > div > span") ??
    cell.querySelector(":scope > span") ??
    cell.querySelector("div");
  if (target) {
    target.textContent = text;
    return;
  }
  cell.textContent = text;
}

function renderLicenseColumnCell(cell: Element, content: LicenseCell) {
  cell.innerHTML = "";
  cell.dataset.mlLicenseCell = "1";

  const wrap = document.createElement("div");
  wrap.className = "ml-table-license-cell";

  if (content.kind === "notAvailable") {
    const pill = document.createElement("span");
    pill.className = "ml-table-license-pill ml-table-license-pill--notAvailable";
    pill.textContent = PILL_LABEL.notAvailable;
    wrap.appendChild(pill);
    cell.appendChild(wrap);
    return;
  }

  const titleRow = document.createElement("div");
  titleRow.className = "ml-table-license-cell__title-row";

  const text = document.createElement("div");
  text.className = "ml-table-license-cell__title";
  text.textContent = content.title;

  titleRow.appendChild(text);

  const info = document.createElement("i");
  info.className = "fa-light fa-circle-info ml-table-license-cell__info";
  info.setAttribute("aria-hidden", "true");
  titleRow.appendChild(info);

  const pill = document.createElement("span");
  pill.className = `ml-table-license-pill ml-table-license-pill--${content.pill}`;
  pill.textContent = PILL_LABEL[content.pill];

  wrap.append(titleRow, pill);
  cell.appendChild(wrap);
}

function setStudentCell(cell: Element, name: string, email: string) {
  const link = cell.querySelector("a");
  const nameSpan = link?.querySelector("span");
  if (nameSpan) nameSpan.textContent = name;
  else if (link) link.textContent = name;

  let emailSub = cell.querySelector<HTMLElement>("[data-ml-email]");
  if (!emailSub) {
    emailSub = document.createElement("span");
    emailSub.dataset.mlEmail = "1";
    emailSub.style.fontSize = "13px";
    emailSub.style.color = "rgba(0, 0, 0, 0.6)";
    emailSub.style.lineHeight = "18px";
    const host = cell.querySelector("div") ?? cell;
    host.appendChild(emailSub);
  }
  emailSub.textContent = email;

  const inner = cell.querySelector("div");
  if (inner) {
    inner.style.flexDirection = "column";
    inner.style.alignItems = "flex-start";
  }
}

function patchTableHeaders(table: Element) {
  const ceHeader = table.querySelector(
    "th.mat-column-email .mat-sort-header-content span, th#email .mat-sort-header-content span, th#email span",
  );
  if (ceHeader) {
    ceHeader.textContent = "Clinical Education License Details";
  }

  const approveHeader = table.querySelector(
    "th#inviteStatus .grid_header_truncate span span, th.mat-column-inviteStatus#inviteStatus span span",
  );
  if (approveHeader) {
    approveHeader.textContent = "Approve License Details";
  }

  const examHeader = table.querySelector(
    "th#examManagement .grid_header_truncate span span, th.mat-column-examManagement span span",
  );
  if (examHeader) {
    examHeader.textContent = "Exam Management License Details";
  }
}

function patchHeroStats(root: ParentNode) {
  const header = root.querySelector(".manage-licenses-page-header");
  if (!header || header.getAttribute("data-ml-hero-patched") === "1") return;

  const countEl = header.querySelector<HTMLElement>(
    ".manage-licenses-stat-no-license .manage-licenses-stat-count",
  );
  if (countEl) countEl.textContent = "102";

  header.setAttribute("data-ml-hero-patched", "1");
}

const NOT_AVAILABLE: LicenseCell = { kind: "notAvailable" };

export function applyManageLicensesDemoData(root: ParentNode) {
  patchHeroStats(root);

  const table = root.querySelector("#stickyColumnTable");
  if (!table) return;

  patchTableHeaders(table);

  const rows = Array.from(table.querySelectorAll("tbody tr.mat-mdc-row"));
  rows.forEach((row, index) => {
    const demo = DEMO_STUDENTS[index];
    const ceCell = row.querySelector(":scope > td.mat-column-email");
    const approveCell = row.querySelector(":scope > td.mat-column-inviteStatus");
    const examCell = row.querySelector(":scope > td.mat-column-examManagement");
    const rowPatched = row.getAttribute("data-ml-license-row") === "1";

    if (!rowPatched && demo) {
      setStudentCell(row.querySelector(".mat-column-lastName")!, demo.name, demo.email);
      setCellText(row.querySelector(".mat-column-cohortName"), demo.cohort);
      setCellText(row.querySelector(".mat-column-profileStatus"), demo.category);
      setCellText(row.querySelector(".mat-column-originKey"), demo.group);
      setCellText(row.querySelector(".mat-column-activationStatus"), demo.campus);
    }

    if (ceCell) {
      renderLicenseColumnCell(ceCell, demo?.clinicalEducation ?? NOT_AVAILABLE);
    }
    if (approveCell) {
      renderLicenseColumnCell(approveCell, demo?.approve ?? NOT_AVAILABLE);
    }
    if (examCell) {
      renderLicenseColumnCell(examCell, demo?.examManagement ?? NOT_AVAILABLE);
    }

    row.setAttribute("data-ml-license-row", "1");
  });
}
