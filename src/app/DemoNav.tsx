import { NavLink } from "react-router";

const pages = [
  { path: "/caas/faculty/home/bygroup", label: "Faculty" },
  { path: "/compliance/home/cohort", label: "Compliance" },
  { path: "/profile/search", label: "Compliance Student" },
  { path: "/curriculum/courseofferings", label: "Curriculum" },
  { path: "/program/programdetails", label: "Program" },
  { path: "/competency/review", label: "Competency" },
  { path: "/cmap/curriculum", label: "Curriculum Mapping" },
] as const;

export default function DemoNav() {
  return (
    <nav
      aria-label="Demo screens"
      className="sticky top-0 z-50 border-b border-black/10 bg-white shadow-sm"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-1 overflow-x-auto px-3 py-2">
        <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-wide text-black/50">
          Screens
        </span>
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) =>
              [
                "shrink-0 rounded px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[#3f51b5] text-white"
                  : "text-black/70 hover:bg-black/5 hover:text-black",
              ].join(" ")
            }
          >
            {page.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
