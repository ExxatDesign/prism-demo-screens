export type ProfileAdminTabId = "setup" | "students" | "reports";

export const PROFILE_ADMIN_TAB_ROUTES: Record<"setup" | "students", string> = {
  setup: "/profile/setup",
  students: "/profile/search",
};

export function profileAdminTabFromLabel(text: string): ProfileAdminTabId | null {
  const norm = text.replace(/\s+/g, " ").trim().toLowerCase();
  if (norm.includes("setup")) return "setup";
  if (norm.includes("students")) return "students";
  if (norm.includes("reports")) return "reports";
  return null;
}
