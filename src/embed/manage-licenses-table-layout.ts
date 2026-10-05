import {
  dedupeManageLicensesColumns,
  ensureExamManagementColumn,
} from "@/embed/manage-licenses-table-exam-column";

/** Visible order — CE, Approve, Exam Management, then Action. */
const MANAGE_LICENSES_COLUMN_CLASSES = [
  "mat-column-firstName",
  "mat-column-lastName",
  "mat-column-cohortName",
  "mat-column-profileStatus",
  "mat-column-originKey",
  "mat-column-activationStatus",
  "mat-column-email",
  "mat-column-inviteStatus",
  "mat-column-examManagement",
  "mat-column-activationStatusTimestamp",
] as const;

function columnClassForCell(cell: Element): string | null {
  for (const cls of MANAGE_LICENSES_COLUMN_CLASSES) {
    if (cell.classList.contains(cls)) return cls;
  }
  return null;
}

function reorderTableRow(row: Element) {
  const byClass = new Map<string, Element>();
  for (const cell of Array.from(row.children)) {
    const key = columnClassForCell(cell);
    if (!key) continue;
    if (byClass.has(key)) {
      cell.remove();
      continue;
    }
    byClass.set(key, cell);
  }
  for (const cls of MANAGE_LICENSES_COLUMN_CLASSES) {
    const cell = byClass.get(cls);
    if (cell) row.appendChild(cell);
  }
}

function stackStudentEmail(row: Element) {
  const nameCell = row.querySelector<HTMLElement>(".mat-column-lastName > div");
  const emailLink = row.querySelector<HTMLElement>(
    'a[id*="sendemail"], a.text-lowercase[href^="mailto:"]',
  );
  if (!nameCell || !emailLink || nameCell.querySelector("[data-ml-email]")) {
    return;
  }
  const email = emailLink.textContent?.trim();
  if (!email) return;

  const sub = document.createElement("span");
  sub.dataset.mlEmail = "1";
  sub.style.fontSize = "13px";
  sub.style.color = "rgba(0, 0, 0, 0.6)";
  sub.style.lineHeight = "18px";
  sub.textContent = email;
  nameCell.appendChild(sub);
}

/** Align Manage Licenses grid columns with Figma (native table layout). */
export function applyManageLicensesTableLayout(root: ParentNode) {
  const table = root.querySelector("#stickyColumnTable");
  if (!table) return;

  ensureExamManagementColumn(table);
  dedupeManageLicensesColumns(table);

  table.querySelectorAll("thead tr, tbody tr.mat-mdc-row").forEach((row) => {
    reorderTableRow(row);
  });

  table.querySelectorAll("tbody tr.mat-mdc-row").forEach(stackStudentEmail);
}
