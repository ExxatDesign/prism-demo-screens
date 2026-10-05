const EXAM_HEADER = "Exam Management License Details";

const EXAM_HEADER_CLASSES = [
  "mat-mdc-header-cell",
  "mdc-data-table__header-cell",
  "cdk-header-cell",
  "exam-management-column",
  "cdk-column-examManagement",
  "mat-column-examManagement",
  "ng-star-inserted",
].join(" ");

const EXAM_CELL_CLASSES = [
  "mat-mdc-cell",
  "mdc-data-table__cell",
  "cdk-cell",
  "exam-management-column",
  "cdk-column-examManagement",
  "mat-column-examManagement",
  "ng-star-inserted",
].join(" ");

function createExamHeader(): HTMLTableCellElement {
  const th = document.createElement("th");
  th.id = "examManagement";
  th.className = EXAM_HEADER_CLASSES;
  th.innerHTML = `<span id="examManagement-header" class="grid_header_truncate"><span>${EXAM_HEADER}</span></span>`;
  return th;
}

function createExamCell(): HTMLTableCellElement {
  const td = document.createElement("td");
  td.className = EXAM_CELL_CLASSES;
  return td;
}

/** Remove stray duplicate license headers/cells from earlier clone-based injection. */
export function dedupeManageLicensesColumns(table: Element) {
  const inviteHeaders = Array.from(table.querySelectorAll("thead th.mat-column-inviteStatus"));
  for (const th of inviteHeaders) {
    if (th.id !== "inviteStatus") th.remove();
  }

  const examHeaders = Array.from(table.querySelectorAll("thead th.mat-column-examManagement"));
  examHeaders.slice(1).forEach((th) => th.remove());

  table.querySelectorAll("tbody tr.mat-mdc-row").forEach((row) => {
    const inviteCells = Array.from(row.querySelectorAll(":scope > td.mat-column-inviteStatus"));
    inviteCells.slice(1).forEach((td) => td.remove());

    const examCells = Array.from(row.querySelectorAll(":scope > td.mat-column-examManagement"));
    examCells.slice(1).forEach((td) => td.remove());
  });
}

/** Inserts a single Exam Management column after Approve (inviteStatus). */
export function ensureExamManagementColumn(table: Element) {
  dedupeManageLicensesColumns(table);

  if (table.querySelector("thead th.mat-column-examManagement")) {
    table.setAttribute("data-ml-exam-column", "1");
    return;
  }

  const inviteHeader = table.querySelector("thead th#inviteStatus.mat-column-inviteStatus");
  if (!inviteHeader) return;

  inviteHeader.after(createExamHeader());

  table.querySelectorAll("tbody tr.mat-mdc-row").forEach((row) => {
    const inviteCell = row.querySelector(":scope > td.mat-column-inviteStatus");
    if (!inviteCell || row.querySelector(":scope > td.mat-column-examManagement")) return;
    inviteCell.after(createExamCell());
  });

  table.setAttribute("data-ml-exam-column", "1");
}
