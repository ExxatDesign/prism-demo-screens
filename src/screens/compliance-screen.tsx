import * as React from "react";

type ViewMode = { id: string; label: string };

type ComplianceTableProps = {
  nameColumn: string;
  nameLabel: string;
  entityLabel: string;
  rows: Array<{
    id: string;
    name: string;
    compliant: number;
    total: number;
    nonCompliant: number;
    pendingReview: number;
    expiring: number;
    expired: number;
    approve: boolean;
  }>;
  viewModes: ViewMode[];
  defaultView: string;
  hideEmptyLabel: string;
  selectHint: string;
};

function Ratio({ value, total }: { value: number; total: number }) {
  return (
    <span className="tabular-nums">
      {value} / {total}
    </span>
  );
}

export function ComplianceScreen({
  nameColumn,
  nameLabel,
  entityLabel,
  rows,
  viewModes,
  defaultView,
  hideEmptyLabel,
  selectHint,
}: ComplianceTableProps) {
  const [view, setView] = React.useState(defaultView);
  const [hideEmpty, setHideEmpty] = React.useState(true);

  const visibleRows = React.useMemo(
    () => (hideEmpty ? rows.filter((row) => row.total > 0) : rows),
    [hideEmpty, rows],
  );

  return (
    <div className="box-border flex h-[900px] w-[1440px] flex-col overflow-hidden bg-[#f8f8f8] p-4 font-sans text-[14px] text-[rgba(0,0,0,0.87)]">
      <div className="mb-4 flex gap-1 rounded bg-white p-0.5 shadow-sm">
        {["Setup", "Compliance", "Review Clarifications"].map((tab) => (
          <button
            key={tab}
            type="button"
            className={
              tab === "Compliance"
                ? "rounded bg-[#3f51b5] px-4 py-2 font-semibold text-white"
                : "rounded px-4 py-2 text-[rgba(0,0,0,0.87)]"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="text-[rgba(0,0,0,0.6)]">View By:</span>
          <div className="flex overflow-hidden rounded border border-[#e0e0e0]">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setView(mode.id)}
                className={
                  view === mode.id
                    ? "bg-[#f9aa33] px-4 py-1.5 font-semibold text-[rgba(0,0,0,0.87)]"
                    : "bg-white px-4 py-1.5 text-[rgba(0,0,0,0.87)]"
                }
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {view === defaultView ? (
          <>
            <label className="mb-2 flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={hideEmpty}
                onChange={(event) => setHideEmpty(event.target.checked)}
              />
              {hideEmptyLabel}
            </label>
            <p className="mb-4 rounded border border-[#b3e5fc] bg-[#e1f5fe] px-3 py-2 text-[13px] text-[rgba(0,0,0,0.75)]">
              {selectHint}
            </p>

            <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-[#e0e0e0]">
              <table className="w-full min-w-full border-collapse text-left text-[14px]">
                <thead className="sticky top-0 z-10 bg-[#eeeeef] text-[12px] font-semibold uppercase tracking-wide">
                  <tr>
                    <th className="border-b border-r border-[#e0e0e0] px-3 py-2">{nameColumn}</th>
                    <th className="border-b border-r border-[#e0e0e0] px-3 py-2">
                      Compliant {entityLabel}
                    </th>
                    <th className="border-b border-r border-[#e0e0e0] px-3 py-2">
                      Non Compliant {entityLabel}
                    </th>
                    <th className="border-b border-r border-[#e0e0e0] px-3 py-2">
                      Pending Review Documents
                    </th>
                    <th className="border-b border-r border-[#e0e0e0] px-3 py-2">
                      Expiring Documents
                    </th>
                    <th className="border-b border-r border-[#e0e0e0] px-3 py-2">
                      Expired Documents
                    </th>
                    <th className="border-b border-[#e0e0e0] px-3 py-2">
                      <span className="block text-[10px] font-normal normal-case text-[rgba(0,0,0,0.6)]">
                        powered by
                      </span>
                      Approve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => (
                    <tr key={row.id} className="border-b border-[#efefef] hover:bg-[#fafafa]">
                      <td className="border-r border-[#efefef] px-3 py-2">
                        <button
                          type="button"
                          className="font-medium text-[#3f51b5] hover:underline"
                        >
                          {row.name}
                        </button>
                      </td>
                      <td className="border-r border-[#efefef] px-3 py-2">
                        <Ratio value={row.compliant} total={row.total} />
                      </td>
                      <td className="border-r border-[#efefef] px-3 py-2">
                        <Ratio value={row.nonCompliant} total={row.total} />
                      </td>
                      <td className="border-r border-[#efefef] px-3 py-2 tabular-nums">
                        {row.pendingReview}
                      </td>
                      <td className="border-r border-[#efefef] px-3 py-2 tabular-nums">
                        {row.expiring}
                      </td>
                      <td className="border-r border-[#efefef] px-3 py-2 tabular-nums">
                        {row.expired}
                      </td>
                      <td className="px-3 py-2">{row.approve ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-center justify-end gap-4 border-t border-[#e0e0e0] pt-3 text-[13px] text-[rgba(0,0,0,0.75)]">
              <span>Items per page: 25</span>
              <span>
                1 – {visibleRows.length} of {visibleRows.length}
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded border border-dashed border-[#e0e0e0] bg-[#fafafa] text-[rgba(0,0,0,0.6)]">
            {nameLabel} view is not in this demo preview.
          </div>
        )}
      </div>
    </div>
  );
}
