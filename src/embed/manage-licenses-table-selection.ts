const SELECT_ALL_ID = "settings-managelicenses-selectall-checkbox";
const PRIMARY = "rgb(63, 81, 181)";

function rowCheckboxes(table: Element): HTMLElement[] {
  return Array.from(
    table.querySelectorAll<HTMLElement>(
      "tbody tr.mat-mdc-row .mat-column-firstName mat-checkbox",
    ),
  );
}

function isChecked(checkbox: HTMLElement): boolean {
  return checkbox.dataset.h2dChecked === "true";
}

function setChecked(checkbox: HTMLElement, checked: boolean) {
  if (checked) {
    checkbox.dataset.h2dChecked = "true";
    checkbox.removeAttribute("data-h2d-indeterminate");
  } else {
    checkbox.removeAttribute("data-h2d-checked");
    checkbox.removeAttribute("data-h2d-indeterminate");
  }
}

function setIndeterminate(checkbox: HTMLElement) {
  checkbox.removeAttribute("data-h2d-checked");
  checkbox.dataset.h2dIndeterminate = "true";
}

function selectedCount(table: Element): number {
  return rowCheckboxes(table).filter(isChecked).length;
}

function ensureSelectedCountLabel(root: ParentNode): HTMLElement | null {
  const bar = root.querySelector<HTMLElement>(".result-found-style");
  if (!bar) return null;

  bar.style.display = "flex";
  bar.style.justifyContent = "space-between";
  bar.style.alignItems = "center";
  bar.style.width = "100%";
  bar.style.boxSizing = "border-box";

  let label = bar.querySelector<HTMLElement>(
    "[data-manage-licenses-selected-count]",
  );
  if (!label) {
    label = document.createElement("span");
    label.dataset.manageLicensesSelectedCount = "1";
    label.style.fontStyle = "italic";
    label.style.fontWeight = "600";
    label.style.fontSize = "14px";
    bar.appendChild(label);
  }
  return label;
}

function updateBulkAssignButtons(root: ParentNode, enabled: boolean) {
  root.querySelectorAll<HTMLButtonElement>("button").forEach((btn) => {
    if (!btn.textContent?.includes("Bulk Assign License")) return;

    btn.disabled = !enabled;
    btn.type = "button";

    if (enabled) {
      btn.dataset.manageLicensesBulkActive = "true";
      btn.style.background = PRIMARY;
      btn.style.border = "none";
      btn.style.borderRadius = "4px";
      btn.style.padding = "7px 8px";
      btn.style.fontWeight = "600";
      btn.style.fontSize = "14px";
      btn.style.color = "#fff";
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
      btn.classList.remove("mat-mdc-button-disabled");
      btn.querySelectorAll<HTMLElement>("*").forEach((el) => {
        el.style.color = "#fff";
        el.style.webkitTextFillColor = "#fff";
      });
    } else {
      delete btn.dataset.manageLicensesBulkActive;
      btn.style.background = "rgba(0, 0, 0, 0.1)";
      btn.style.color = "rgba(0, 0, 0, 0.87)";
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
      btn.querySelectorAll<HTMLElement>("*").forEach((el) => {
        el.style.removeProperty("color");
        el.style.removeProperty("-webkit-text-fill-color");
      });
    }
  });
}

function syncSelectionUi(root: ParentNode, table: Element) {
  const rows = rowCheckboxes(table);
  const count = rows.filter(isChecked).length;
  const total = rows.length;

  const selectAll = table.querySelector<HTMLElement>(`#${SELECT_ALL_ID}`);
  if (selectAll) {
    if (count === 0) {
      setChecked(selectAll, false);
    } else if (count === total) {
      setChecked(selectAll, true);
    } else {
      setIndeterminate(selectAll);
    }
  }

  const label = ensureSelectedCountLabel(root);
  if (label) {
    if (count > 0) {
      label.hidden = false;
      label.textContent = `Selected Student(s): ${count}`;
    } else {
      label.hidden = true;
      label.textContent = "";
    }
  }

  updateBulkAssignButtons(root, count > 0);
}

export function getManageLicensesSelectedCount(root: ParentNode): number {
  const table = root.querySelector("#stickyColumnTable");
  if (!table) return 0;
  return selectedCount(table);
}

/** Row + header checkbox selection; enables Bulk Assign when count > 0 (Figma 1623-18268). */
export function wireManageLicensesTableSelection(
  root: ParentNode,
  options?: { onBulkAssign?: (selectedCount: number) => void },
): (() => void) | undefined {
  const host = root as HTMLElement;
  if (host.dataset.manageLicensesSelectionWired === "1") return;

  const table = root.querySelector("#stickyColumnTable");
  if (!table) return;

  host.dataset.manageLicensesSelectionWired = "1";

  const onClick = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const cell = target.closest<HTMLElement>("td.mat-column-firstName");
    const checkbox =
      target.closest<HTMLElement>("mat-checkbox") ??
      cell?.querySelector<HTMLElement>("mat-checkbox");
    if (!checkbox || !table.contains(checkbox)) return;

    event.preventDefault();
    event.stopPropagation();

    if (checkbox.id === SELECT_ALL_ID) {
      const rows = rowCheckboxes(table);
      const allSelected =
        rows.length > 0 && rows.every(isChecked);
      rows.forEach((rowCb) => setChecked(rowCb, !allSelected));
    } else {
      setChecked(checkbox, !isChecked(checkbox));
    }

    syncSelectionUi(root, table);
  };

  table.addEventListener("click", onClick, true);

  const onBulkClick = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const btn = target.closest<HTMLButtonElement>("button");
    if (!btn?.textContent?.includes("Bulk Assign License")) return;
    if (btn.disabled || btn.dataset.manageLicensesBulkActive !== "true") return;
    event.preventDefault();
    event.stopPropagation();
    options?.onBulkAssign?.(selectedCount(table));
  };

  root.addEventListener("click", onBulkClick, true);

  rowCheckboxes(table).forEach((cb) => {
    cb.style.cursor = "pointer";
  });
  const selectAll = table.querySelector<HTMLElement>(`#${SELECT_ALL_ID}`);
  if (selectAll) selectAll.style.cursor = "pointer";

  syncSelectionUi(root, table);

  return () => {
    table.removeEventListener("click", onClick, true);
    root.removeEventListener("click", onBulkClick, true);
    delete host.dataset.manageLicensesSelectionWired;
  };
}
