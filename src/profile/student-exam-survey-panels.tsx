import * as React from "react";
import { useSearchParams } from "react-router";
import {
  COURSE_EVALS,
  CONTENT_AREAS,
  EXAMS,
  EXAM_AVG,
  EXAM_STATUS_TONE,
  REMEDIATION,
  SUMMARY,
  SURVEYS,
  SURVEY_STATUS_TONE,
  UPCOMING_EXAMS,
  type Tone,
} from "@/profile/student-assessments-data";

const CARD = "rounded-lg border border-black/[0.12] bg-white";
const CARD_HEAD = "border-b border-black/[0.12] px-6 py-4 text-[18px] font-semibold";
const TH =
  "bg-[#eeeeff] px-3 text-left text-[14px] font-semibold uppercase text-black/90 h-12 whitespace-nowrap";
const TD = "px-3 py-3 text-[14px] text-black/90 border-t border-black/[0.12] align-middle";
const BTN =
  "inline-block cursor-pointer rounded border border-[#3f51b5] px-3 py-1 text-[14px] text-[#3f51b5] hover:bg-[#eeeeff]";
const FONT = { fontFamily: '"Source Sans Pro", sans-serif' };

const TONES: Record<Tone, string> = {
  green: "bg-[#7fd1a2] text-black/90",
  amber: "bg-[#ffe49a] text-black/90",
  red: "bg-[#f8c7c3] text-[#a4262c]",
  blue: "bg-[#d0e6ff] text-black/90",
  gray: "bg-[#e0e0e0] text-black/80",
};

function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-[14px] ${TONES[tone]}`}>
      {children}
    </span>
  );
}

function Stat({
  value,
  label,
  hint,
  color,
}: {
  value: string;
  label: string;
  hint?: string;
  color?: string;
}) {
  return (
    <div className={`${CARD} min-w-[180px] flex-1 px-5 py-4`}>
      <div className={`text-[28px] font-semibold leading-9 ${color ?? "text-black/90"}`}>{value}</div>
      <div className="text-[14px] text-black/60">{label}</div>
      {hint && <div className="mt-1 text-[12px] text-black/50">{hint}</div>}
    </div>
  );
}

function ProgressBar({ pct, color = "#3f51b5" }: { pct: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#e0e0e0]">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="text-black/90" style={FONT}>
      <h2 className="mb-4 text-[18px] font-semibold">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1 text-[14px] ${
            o === value
              ? "border-[#3f51b5] bg-[#eeeeff] font-semibold text-[#3f51b5]"
              : "border-black/[0.12] bg-white text-black/80"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function DataTable({ heads, children }: { heads: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-black/[0.12]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {heads.map((h) => (
              <th key={h} className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ Exam */

function ScoreTrend() {
  const rows = EXAMS.filter((e) => e.pct !== undefined);
  const W = 520;
  const H = 190;
  const pad = { l: 36, r: 12, t: 12, b: 34 };
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (rows.length - 1);
  const y = (v: number) => pad.t + ((100 - v) * (H - pad.t - pad.b)) / 40; // 60–100 scale
  const line = (key: "pct" | "classAvg") =>
    rows.map((r, i) => `${i ? "L" : "M"} ${x(i)} ${y((r[key] as number) - 0)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Score trend vs class average">
      {[60, 70, 80, 90, 100].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="#e0e0e0" />
          <text x={pad.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6b6b6b">
            {v}
          </text>
        </g>
      ))}
      <path d={line("classAvg")} fill="none" stroke="#9e9e9e" strokeWidth="2" strokeDasharray="5 4" />
      <path d={line("pct")} fill="none" stroke="#3f51b5" strokeWidth="2.5" />
      {rows.map((r, i) => (
        <g key={r.name}>
          <circle cx={x(i)} cy={y(r.pct as number)} r="4.5" fill={r.status === "Remediation" ? "#e0a100" : "#3f51b5"} />
          <text x={x(i)} y={y(r.pct as number) - 10} textAnchor="middle" fontSize="11" fontWeight="600" fill="#1f1f1f">
            {r.pct}
          </text>
          <text x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fill="#6b6b6b">
            {r.date.slice(0, 5)}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-4 text-[12px] text-black/60">
      <span className="flex items-center gap-1">
        <span className="inline-block h-[3px] w-5 bg-[#3f51b5]" /> Alyson
      </span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-[3px] w-5 border-t-2 border-dashed border-[#9e9e9e]" /> Class average
      </span>
    </div>
  );
}

export function StudentExamPanel() {
  const [filter, setFilter] = React.useState<"All" | "Passed" | "Remediation" | "Scheduled">("All");
  const rows = EXAMS.filter((e) => filter === "All" || e.status === filter);
  const vsClass = EXAM_AVG - 80;
  return (
    <Shell title="Exam">
      <div className="flex flex-wrap gap-4">
        <Stat value={String(EXAMS.length)} label="Total exams" />
        <Stat value={String(EXAMS.length - SUMMARY.exams.upcoming)} label="Completed" color="text-[#2e7d32]" />
        <Stat value={String(SUMMARY.exams.upcoming)} label="Upcoming" color="text-[#3f51b5]" />
        <Stat value={`${EXAM_AVG}%`} label="Average score" hint={`${vsClass >= 0 ? "+" : ""}${vsClass} pts vs class average (80%)`} />
        <Stat value="1" label="In remediation" color="text-[#b26a00]" hint={`Plan due ${REMEDIATION.due}`} />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className={`${CARD} min-w-[320px] flex-[3]`}>
          <div className={`${CARD_HEAD} flex items-center justify-between`}>
            <span>Score trend</span>
            <Legend />
          </div>
          <div className="p-4">
            <ScoreTrend />
          </div>
        </div>
        <div className={`${CARD} min-w-[280px] flex-[2]`}>
          <div className={CARD_HEAD}>Upcoming exams</div>
          <div className="flex flex-col">
            {UPCOMING_EXAMS.map((u, i) => (
              <div key={u.name} className={`px-6 py-4 ${i ? "border-t border-black/[0.12]" : ""}`}>
                <div className="font-semibold">{u.name}</div>
                <div className="text-[14px] text-[#3f51b5]">{u.when}</div>
                <div className="text-[14px] text-black/70">{u.where}</div>
                <div className="text-[14px] text-black/70">{u.format}</div>
                <div className="mt-1 text-[12px] text-black/50">{u.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={CARD}>
        <div className={`${CARD_HEAD} flex flex-wrap items-center justify-between gap-2`}>
          <span>
            Performance by content area <span className="text-[14px] font-normal text-black/60">· NPTE PT Content Outline</span>
          </span>
          <Legend />
        </div>
        <div className="grid gap-x-10 gap-y-4 p-6 md:grid-cols-2">
          {CONTENT_AREAS.map((c) => {
            const behind = c.student < c.cls;
            return (
              <div key={c.area}>
                <div className="mb-1 flex justify-between text-[14px]">
                  <span>{c.area}</span>
                  <span className={behind ? "font-semibold text-[#a4262c]" : "font-semibold"}>
                    {c.student}% <span className="font-normal text-black/50">/ {c.cls}%</span>
                  </span>
                </div>
                <div className="relative">
                  <ProgressBar pct={c.student} color={behind ? "#e0a100" : "#3f51b5"} />
                  <div
                    className="absolute -top-1 h-4 w-[2px] bg-[#616161]"
                    style={{ left: `${c.cls}%` }}
                    title={`Class average ${c.cls}%`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={CARD}>
        <div className={`${CARD_HEAD} flex flex-wrap items-center justify-between gap-2`}>
          <span>Remediation plan · {REMEDIATION.exam}</span>
          <Pill tone="amber">In progress</Pill>
        </div>
        <div className="p-6">
          <div className="mb-3 text-[14px] text-black/70">
            Owner: {REMEDIATION.owner} · Due {REMEDIATION.due}
          </div>
          <ProgressBar
            pct={(REMEDIATION.steps.filter((s) => s.done).length / REMEDIATION.steps.length) * 100}
            color="#2e7d32"
          />
          <ul className="mt-4 flex flex-col gap-2 text-[14px]">
            {REMEDIATION.steps.map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[12px] ${
                    s.done ? "bg-[#7fd1a2]" : "border border-black/30"
                  }`}
                >
                  {s.done ? "✓" : ""}
                </span>
                <span className={s.done ? "text-black/60 line-through" : ""}>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={CARD}>
        <div className={`${CARD_HEAD} flex flex-wrap items-center justify-between gap-2`}>
          <span>Exam history</span>
          <Chips options={["All", "Passed", "Remediation", "Scheduled"] as const} value={filter} onChange={setFilter} />
        </div>
        <div className="p-6">
          <DataTable heads={["Exam", "Course", "Date", "Score", "Class avg", "Status", "Action"]}>
            {rows.map((e) => (
              <tr key={e.name}>
                <td className={TD}>{e.name}</td>
                <td className={TD}>{e.course}</td>
                <td className={TD}>{e.date}</td>
                <td className={TD}>{e.score}</td>
                <td className={TD}>{e.classAvg ? `${e.classAvg}%` : "–"}</td>
                <td className={TD}>
                  <Pill tone={EXAM_STATUS_TONE[e.status]}>{e.status}</Pill>
                </td>
                <td className={TD}>
                  <span className={BTN}>{e.status === "Scheduled" ? "View Details" : "View Result"}</span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------------------------------------------------------- Survey */

export function StudentSurveyPanel() {
  const [searchParams] = useSearchParams();
  const [view, setView] = React.useState<"Surveys" | "Course evaluations">(
    searchParams.get("view") === "evals" ? "Course evaluations" : "Surveys",
  );
  return (
    <Shell title="Survey">
      <div className="flex">
        <div className="inline-flex overflow-hidden rounded-lg border border-black/[0.12] bg-white">
          {(["Surveys", "Course evaluations"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-4 py-2 text-[14px] ${
                v === view ? "bg-[#eeeeff] font-semibold text-[#3f51b5]" : "text-black/80"
              }`}
            >
              {v}
              <span className="ml-2 rounded-full bg-black/10 px-2 text-[12px]">
                {v === "Surveys" ? SURVEYS.length : COURSE_EVALS.length}
              </span>
            </button>
          ))}
        </div>
      </div>
      {view === "Surveys" ? <SurveysView /> : <CourseEvalsView />}
    </Shell>
  );
}

function SurveysView() {
  const types = Array.from(new Set(SURVEYS.map((s) => s.type)));
  const [type, setType] = React.useState("All types");
  const rows = SURVEYS.filter((s) => type === "All types" || s.type === type);
  const s = SUMMARY.surveys;
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Stat value={String(s.total)} label="Assigned" />
        <Stat value={String(s.completed)} label="Completed" color="text-[#2e7d32]" hint={`${Math.round((s.completed / s.total) * 100)}% completion`} />
        <Stat value={String(s.dueSoon)} label="Due soon" color="text-[#b26a00]" hint="Rotation 2 · due 10/16/2026" />
        <Stat value={String(s.overdue)} label="Overdue" color="text-[#a4262c]" hint="Student Services · due 09/30/2026" />
      </div>
      <div className={CARD}>
        <div className={`${CARD_HEAD} flex flex-wrap items-center justify-between gap-2`}>
          <span>Assigned surveys</span>
          <Chips options={["All types", ...types]} value={type} onChange={setType} />
        </div>
        <div className="p-6">
          <DataTable heads={["Survey", "Type", "Due Date", "Submitted", "Status", "Action"]}>
            {rows.map((r) => (
              <tr key={r.name}>
                <td className={TD}>{r.name}</td>
                <td className={TD}>{r.type}</td>
                <td className={TD}>{r.due}</td>
                <td className={TD}>{r.submitted}</td>
                <td className={TD}>
                  <Pill tone={SURVEY_STATUS_TONE[r.status]}>{r.status}</Pill>
                </td>
                <td className={TD}>
                  <span className={BTN}>
                    {r.status === "Completed" ? "View Response" : r.status === "Not yet open" ? "Preview" : "Send Reminder"}
                  </span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}

function CourseEvalsView() {
  const e = SUMMARY.evals;
  const [status, setStatus] = React.useState<"All" | "Open" | "Submitted">("All");
  const rows = COURSE_EVALS.filter((c) => status === "All" || c.status === status);
  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Stat value={String(e.total)} label="Evaluations assigned" />
        <Stat value={String(e.open)} label="Open" color="text-[#b26a00]" hint={`Closes ${e.closes}`} />
        <Stat value={String(e.submitted)} label="Submitted" color="text-[#2e7d32]" />
        <Stat value={`${Math.round((e.submitted / e.total) * 100)}%`} label="Response rate" hint="Program average 78%" />
      </div>
      <div className="rounded-lg border border-[#c5cae9] bg-[#f3f4ff] px-4 py-3 text-[14px] text-black/80">
        Course evaluations are anonymous. Instructors only see aggregated results after final grades are posted.
      </div>
      <div className={CARD}>
        <div className={`${CARD_HEAD} flex flex-wrap items-center justify-between gap-2`}>
          <span>Course evaluations</span>
          <Chips options={["All", "Open", "Submitted"] as const} value={status} onChange={setStatus} />
        </div>
        <div className="p-6">
          <DataTable heads={["Course", "Instructor", "Term", "Evaluation Window", "Status", "Action"]}>
            {rows.map((c) => (
              <tr key={c.course}>
                <td className={TD}>{c.course}</td>
                <td className={TD}>{c.instructor}</td>
                <td className={TD}>{c.term}</td>
                <td className={TD}>{c.window}</td>
                <td className={TD}>
                  <Pill tone={c.status === "Open" ? "amber" : "green"}>
                    {c.status === "Open" ? "Open" : `Submitted ${c.submitted}`}
                  </Pill>
                </td>
                <td className={TD}>
                  <span className={BTN}>{c.status === "Open" ? "Send Reminder" : "View Submission"}</span>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- Overview */

function SummaryCol({
  title,
  tab,
  view,
  children,
  last,
}: {
  title: string;
  tab: "exam" | "survey";
  view?: "evals";
  children: React.ReactNode;
  last?: boolean;
}) {
  const [, setSearchParams] = useSearchParams();
  return (
    <div className={`flex-1 min-w-[200px] px-6 py-4 ${last ? "" : "border-r border-black/[0.12]"}`}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[16px] font-semibold">{title}</span>
        <button
          type="button"
          className="text-[14px] font-semibold text-[#3f51b5]"
          onClick={() => setSearchParams(view ? { tab, view } : { tab }, { replace: true })}
        >
          View
        </button>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between py-0.5 text-[14px]">
      <span className="text-black/70">{label}</span>
      <span className={`font-semibold ${color ?? ""}`}>{value}</span>
    </div>
  );
}

/** Card injected into the Overview between Learning Activities and Placements. */
export function OverviewAssessmentsCard() {
  const { exams, surveys, evals } = SUMMARY;
  return (
    <div className={`${CARD} mb-4 overflow-hidden`} style={FONT}>
      <div className={CARD_HEAD}>Exams, Surveys &amp; Course Evaluations</div>
      <div className="flex flex-wrap">
        <SummaryCol title="Exams" tab="exam">
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-[28px] font-semibold leading-9">{exams.avg}%</span>
            <span className="text-[14px] text-black/60">average score</span>
          </div>
          <Row label="Upcoming" value={String(exams.upcoming)} />
          <Row label="In remediation" value={String(exams.remediation)} color="text-[#b26a00]" />
          <div className="mt-2 rounded bg-[#f3f4ff] px-2 py-1 text-[12px] text-black/70">
            Next: {exams.next.name} · {exams.next.when.split(" · ")[0]}
          </div>
        </SummaryCol>
        <SummaryCol title="Surveys" tab="survey">
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-[28px] font-semibold leading-9">
              {surveys.completed}/{surveys.total}
            </span>
            <span className="text-[14px] text-black/60">completed</span>
          </div>
          <ProgressBar pct={(surveys.completed / surveys.total) * 100} color="#2e7d32" />
          <div className="mt-2" />
          <Row label="Due soon" value={String(surveys.dueSoon)} color="text-[#b26a00]" />
          <Row label="Overdue" value={String(surveys.overdue)} color="text-[#a4262c]" />
        </SummaryCol>
        <SummaryCol title="Course Evaluations" tab="survey" view="evals" last>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="text-[28px] font-semibold leading-9">
              {evals.submitted}/{evals.total}
            </span>
            <span className="text-[14px] text-black/60">submitted</span>
          </div>
          <ProgressBar pct={(evals.submitted / evals.total) * 100} color="#3f51b5" />
          <div className="mt-2" />
          <Row label="Open now" value={String(evals.open)} color="text-[#b26a00]" />
          <Row label="Window closes" value={evals.closes} />
        </SummaryCol>
      </div>
    </div>
  );
}

/** Alert rows appended to the Overview "Needs Attention → Student" list. */
export const NEEDS_ATTENTION_ITEMS: {
  icon: string;
  title: string;
  lines: string[];
  tab: "exam" | "survey";
  view?: "evals";
}[] = [
  {
    icon: "fa-light fa-file-pen",
    title: "Exams",
    lines: [`${SUMMARY.exams.remediation} exam in remediation`, `Plan due ${REMEDIATION.due}`],
    tab: "exam",
  },
  {
    icon: "fa-light fa-clipboard-list",
    title: "Surveys",
    lines: [`${SUMMARY.surveys.overdue} survey overdue`],
    tab: "survey",
  },
  {
    icon: "fa-light fa-comment-check",
    title: "Course Evaluations",
    lines: [`${SUMMARY.evals.open} evaluations pending`, `Window closes ${SUMMARY.evals.closes}`],
    tab: "survey",
    view: "evals",
  },
];
