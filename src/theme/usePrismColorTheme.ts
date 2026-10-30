import * as React from "react";
import {
  applyPrismColorTheme,
  readStoredPrismColorTheme,
  setPrismColorTheme,
  syncH2dCapturedBodyTheme,
  togglePrismBlueTheme,
  type PrismColorTheme,
  isDarkPrismColorTheme,
} from "@/theme/prism-color-theme";
import { syncH2dInlineTheme } from "@/theme/h2d-inline-dark-mode";

export function usePrismColorTheme() {
  const [theme, setThemeState] = React.useState<PrismColorTheme>(() =>
    readStoredPrismColorTheme(),
  );

  React.useEffect(() => {
    applyPrismColorTheme(theme);
    syncH2dCapturedBodyTheme(theme);
    syncH2dInlineTheme(isDarkPrismColorTheme(theme));
  }, [theme]);

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== "exxat-prism-color-theme") return;
      setThemeState(readStoredPrismColorTheme());
    };
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<PrismColorTheme>).detail;
      if (detail) setThemeState(detail);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("prism-color-theme-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("prism-color-theme-change", onCustom);
    };
  }, []);

  return {
    theme,
    isDark: isDarkPrismColorTheme(theme),
    setTheme: (next: PrismColorTheme) => {
      setPrismColorTheme(next);
      setThemeState(next);
    },
    toggleBlueTheme: () => {
      const next = togglePrismBlueTheme();
      setThemeState(next);
      return next;
    },
  };
}

/** Re-apply captured body theme after route / screen paint. */
export function useSyncH2dThemeOnNavigate(theme: PrismColorTheme, pathname: string) {
  const isDark = isDarkPrismColorTheme(theme);

  React.useLayoutEffect(() => {
    syncH2dCapturedBodyTheme(theme);
    syncH2dInlineTheme(isDark);

    const run = () => {
      syncH2dCapturedBodyTheme(theme);
      syncH2dInlineTheme(isDark);
    };

    run();
    const raf = window.requestAnimationFrame(run);
    const t1 = window.setTimeout(run, 0);
    const t2 = window.setTimeout(run, 120);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [theme, pathname, isDark]);

  React.useEffect(() => {
    if (!isDark) return;

    let debounce = 0;
    const reapply = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => syncH2dInlineTheme(true), 60);
    };

    const observer = new MutationObserver(reapply);
    document.querySelectorAll(".h2d-screen").forEach((screen) => {
      observer.observe(screen, { childList: true, subtree: true });
    });

    return () => {
      observer.disconnect();
      window.clearTimeout(debounce);
    };
  }, [isDark, pathname]);
}
