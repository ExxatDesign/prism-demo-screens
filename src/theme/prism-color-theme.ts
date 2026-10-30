export const PRISM_COLOR_THEME_KEY = "exxat-prism-color-theme";

export const PRISM_COLOR_THEMES = [
  "theme-blue-light",
  "theme-blue-dark",
  "theme-purple-light",
  "theme-purple-dark",
  "theme-highcontrast-light",
  "theme-highcontrast-dark",
] as const;

export type PrismColorTheme = (typeof PRISM_COLOR_THEMES)[number];

const DEFAULT_THEME: PrismColorTheme = "theme-blue-light";

export function isValidPrismColorTheme(value: string | null): value is PrismColorTheme {
  return PRISM_COLOR_THEMES.includes(value as PrismColorTheme);
}

export function readStoredPrismColorTheme(): PrismColorTheme {
  try {
    const stored = localStorage.getItem(PRISM_COLOR_THEME_KEY);
    if (isValidPrismColorTheme(stored)) return stored;
  } catch {
    /* storage blocked */
  }
  return DEFAULT_THEME;
}

export function isDarkPrismColorTheme(theme: PrismColorTheme): boolean {
  return theme.includes("-dark");
}

export function applyPrismColorTheme(theme: PrismColorTheme): void {
  const root = document.documentElement;
  for (const name of PRISM_COLOR_THEMES) {
    root.classList.remove(name);
  }
  root.classList.add(theme);
  root.classList.toggle("dark", isDarkPrismColorTheme(theme));
  root.style.colorScheme = isDarkPrismColorTheme(theme) ? "dark" : "light";
}

export function setPrismColorTheme(theme: PrismColorTheme): void {
  try {
    localStorage.setItem(PRISM_COLOR_THEME_KEY, theme);
  } catch {
    /* storage blocked */
  }
  applyPrismColorTheme(theme);
  window.dispatchEvent(new CustomEvent("prism-color-theme-change", { detail: theme }));
}

export function togglePrismBlueTheme(): PrismColorTheme {
  const current = readStoredPrismColorTheme();
  const next: PrismColorTheme =
    current === "theme-blue-dark" ? "theme-blue-light" : "theme-blue-dark";
  setPrismColorTheme(next);
  return next;
}

/** Match captured STEPS `<body class="theme-blue-*">` to the app theme. */
export function syncH2dCapturedBodyTheme(theme: PrismColorTheme): void {
  const isDark = isDarkPrismColorTheme(theme);
  document.querySelectorAll(".h2d-screen body").forEach((body) => {
    for (const name of PRISM_COLOR_THEMES) {
      body.classList.remove(name);
    }
    body.classList.add(isDark ? "theme-blue-dark" : "theme-blue-light");
    if (body instanceof HTMLElement) {
      body.style.setProperty(
        "background-color",
        isDark ? "#121212" : "rgb(248, 248, 248)",
        "important",
      );
    }
  });
  document.querySelectorAll(".h2d-screen html").forEach((htmlEl) => {
    if (htmlEl instanceof HTMLElement) {
      htmlEl.style.setProperty(
        "background-color",
        isDark ? "#121212" : "rgb(248, 248, 248)",
        "important",
      );
    }
  });
}
