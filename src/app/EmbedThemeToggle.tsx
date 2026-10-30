import { usePrismColorTheme } from "@/theme/usePrismColorTheme";

/** Shown in embed mode when the demo nav bar is hidden. */
export default function EmbedThemeToggle() {
  const { isDark, toggleBlueTheme } = usePrismColorTheme();

  return (
    <button
      type="button"
      className="demo-nav__theme-btn fixed bottom-4 right-4 z-[10001] rounded border border-black/15 bg-white px-3 py-2 text-sm font-medium shadow-md"
      onClick={() => toggleBlueTheme()}
      aria-pressed={isDark}
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
