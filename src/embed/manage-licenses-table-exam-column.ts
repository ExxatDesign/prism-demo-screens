const EXAM_HEADER = "Exam Management License Details";

const EXAM_HEADER_CLASS =
  "mat-mdc-header-cell mdc-data-table__header-cell cdk-header-cell exam-management-column cdk-column-examManagement mat-column-examManagement ng-star-inserted";

const EXAM_CELL_CLASS =
  "mat-mdc-cell mdc-data-table__cell cdk-cell exam-management-column cdk-column-examManagement mat-column-examManagement ng-star-inserted";

function copyTableCellChrome(
  source: HTMLTableCellElement,
  target: HTMLTableCellElement,
  className: string,
) {
  target.className = className;
  const style = source.getAttribute("style");
  if (style) target.setAttribute("style", style);
}

function createExamHeader(template: HTMLTableCellElement): HTMLTableCellElement {
  const th = document.createElement("th");
  th.id = "examManagement";
  copyTableCellChrome(template, th, EXAM_HEADER_CLASS);
  th.innerHTML = `<span id="examManagement-header" class="grid_header_truncate"><span>${EXAM_HEADER}</span></span>`;
  return th;
}

function createExamCell(template: HTMLTableCellElement): HTMLTableCellElement {
  const td = document.createElement("td");
  copyTableCellChrome(template, td, EXAM_CELL_CLASS);
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

  const inviteHeader = table.querySelector<HTMLTableCellElement>(
    "thead th#inviteStatus.mat-column-inviteStatus",
  );
  if (!inviteHeader) return;

  let examHeader = table.querySelector<HTMLTableCellElement>(
    "thead th.mat-column-examManagement",
  );
  if (!examHeader) {
    examHeader = createExamHeader(inviteHeader);
    inviteHeader.after(examHeader);
  } else {
    copyTableCellChrome(inviteHeader, examHeader, EXAM_HEADER_CLASS);
    const label = examHeader.querySelector(
      "#examManagement-header span span, .grid_header_truncate span span",
    );
    if (label) label.textContent = EXAM_HEADER;
  }

  table.querySelectorAll("tbody tr.mat-mdc-row").forEach((row) => {
    const inviteCell = row.querySelector<HTMLTableCellElement>(
      ":scope > td.mat-column-inviteStatus",
    );
    if (!inviteCell) return;

    let examCell = row.querySelector<HTMLTableCellElement>(
      ":scope > td.mat-column-examManagement",
    );
    if (!examCell) {
      examCell = createExamCell(inviteCell);
      inviteCell.after(examCell);
    } else {
      copyTableCellChrome(inviteCell, examCell, EXAM_CELL_CLASS);
    }
  });

  table.setAttribute("data-ml-exam-column", "1");
}
