import { NavLink } from "react-router";
import { usePrismColorTheme } from "@/theme/usePrismColorTheme";

const pages = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/admin/tenant-apps", label: "Tenant Apps" },
  { path: "/one/school/dashboard", label: "Exxat One" },
  { path: "/faculty/dashboard", label: "Faculty Home" },
  { path: "/faculty/caas", label: "Faculty CAAS" },
  { path: "/caas/faculty/home/bygroup", label: "Faculty" },
  { path: "/compliance/home/cohort", label: "Compliance" },
  { path: "/profile/search", label: "Compliance Student" },
  { path: "/profile/setup/manage-licenses", label: "Manage Licenses" },
  { path: "/profile/setup", label: "Invite Student" },
  { path: "/admin/faculty/search", label: "Faculty Search" },
  { path: "/curriculum/courseofferings", label: "Curriculum" },
  { path: "/program/programdetails", label: "Program" },
  { path: "/competency/review", label: "Competency" },
  { path: "/cmap/curriculum", label: "Curriculum Mapping" },
  { path: "/student", label: "Student" },
  { path: "/student/compliance", label: "Student Compliance" },
] as const;

export default function DemoNav() {
  const { isDark, toggleBlueTheme } = usePrismColorTheme();

  return (
    <nav
      aria-label="Demo screens"
      className="demo-nav sticky top-0 z-50 border-b border-black/10 bg-white shadow-sm"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-1 overflow-x-auto px-3 py-2">
        <span className="demo-nav__label mr-2 shrink-0 text-xs font-semibold uppercase tracking-wide text-black/50">
          Screens
        </span>
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            end
            className={({ isActive }) =>
              [
                "demo-nav__link shrink-0 rounded px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "demo-nav__link--active bg-[#3f51b5] text-white"
                  : "text-black/70 hover:bg-black/5 hover:text-black",
              ].join(" ")
            }
          >
            {page.label}
          </NavLink>
        ))}
        <button
          type="button"
          className="demo-nav__theme-btn ml-auto shrink-0 rounded border border-black/15 px-3 py-1.5 text-sm font-medium text-black/80 hover:bg-black/5"
          onClick={() => toggleBlueTheme()}
          aria-pressed={isDark}
        >
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </nav>
  );
}
