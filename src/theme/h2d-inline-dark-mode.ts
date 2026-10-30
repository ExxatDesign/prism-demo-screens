const ORIGINAL_STYLE_ATTR = "data-h2d-original-style";

const STYLE_REPLACEMENTS: [RegExp, string][] = [
  [/background-color:\s*rgb\(255,\s*255,\s*255\)/gi, "background-color: #1e1e1e"],
  [/background-color:\s*rgb\(250,\s*250,\s*250\)/gi, "background-color: #1e1e1e"],
  [/background-color:\s*rgb\(248,\s*248,\s*248\)/gi, "background-color: #121212"],
  [/background-color:\s*rgb\(247,\s*247,\s*247\)/gi, "background-color: #121212"],
  [/background-color:\s*rgb\(245,\s*245,\s*245\)/gi, "background-color: #121212"],
  [/background-color:\s*rgb\(240,\s*240,\s*240\)/gi, "background-color: #1a1a1a"],
  [/background-color:\s*rgb\(238,\s*238,\s*238\)/gi, "background-color: #1a1a1a"],
  [/background-color:\s*rgb\(224,\s*224,\s*224\)/gi, "background-color: #2a2a2a"],
  [/background-color:\s*rgb\(246,\s*243,\s*255\)/gi, "background-color: #2a2438"],
  [/background-color:\s*rgb\(250,\s*250,\s*250\)/gi, "background-color: #1e1e1e"],
  [/background-color:\s*rgb\(255,\s*255,\s*255\)/gi, "background-color: #1e1e1e"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.87\)/gi, "color: rgba(255, 255, 255, 0.87)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.6\)/gi, "color: rgba(255, 255, 255, 0.6)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.54\)/gi, "color: rgba(255, 255, 255, 0.6)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.72\)/gi, "color: rgba(255, 255, 255, 0.72)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.5\)/gi, "color: rgba(255, 255, 255, 0.6)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.42\)/gi, "color: rgba(255, 255, 255, 0.55)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.38\)/gi, "color: rgba(255, 255, 255, 0.5)"],
  [/color:\s*rgba\(0,\s*0,\s*0,\s*0\.26\)/gi, "color: rgba(255, 255, 255, 0.45)"],
  [/color:\s*rgb\(0,\s*0,\s*0\)/gi, "color: rgba(255, 255, 255, 0.87)"],
  [/color:\s*rgb\(33,\s*37,\s*41\)/gi, "color: rgba(255, 255, 255, 0.92)"],
  [/color:\s*rgb\(73,\s*80,\s*87\)/gi, "color: rgba(255, 255, 255, 0.65)"],
  [
    /(-webkit-text-fill-color:\s*)rgba\(0,\s*0,\s*0,\s*0\.87\)/gi,
    "$1rgba(255, 255, 255, 0.87)",
  ],
  [
    /(-webkit-text-fill-color:\s*)rgba\(0,\s*0,\s*0,\s*0\.6\)/gi,
    "$1rgba(255, 255, 255, 0.6)",
  ],
  [
    /(-webkit-text-fill-color:\s*)rgba\(0,\s*0,\s*0,\s*0\.54\)/gi,
    "$1rgba(255, 255, 255, 0.6)",
  ],
  [
    /(-webkit-text-fill-color:\s*)rgba\(0,\s*0,\s*0,\s*0\.72\)/gi,
    "$1rgba(255, 255, 255, 0.72)",
  ],
  [
    /(-webkit-text-stroke-color:\s*)rgba\(0,\s*0,\s*0,\s*0\.72\)/gi,
    "$1rgba(255, 255, 255, 0.72)",
  ],
  [/(-webkit-text-fill-color:\s*)rgb\(33,\s*37,\s*41\)/gi, "$1rgba(255, 255, 255, 0.92)"],
  [/(-webkit-text-fill-color:\s*)rgb\(73,\s*80,\s*87\)/gi, "$1rgba(255, 255, 255, 0.65)"],
  [/(-webkit-text-fill-color:\s*)rgb\(0,\s*0,\s*0\)/gi, "$1rgba(255, 255, 255, 0.87)"],
  [
    /(-webkit-text-stroke-color:\s*)rgba\(0,\s*0,\s*0,\s*0\.87\)/gi,
    "$1rgba(255, 255, 255, 0.87)",
  ],
  [/border-color:\s*rgba\(0,\s*0,\s*0,\s*0\.12\)/gi, "border-color: rgba(255, 255, 255, 0.12)"],
  [/border-color:\s*rgba\(0,\s*0,\s*0,\s*0\.87\)/gi, "border-color: rgba(255, 255, 255, 0.12)"],
  [/border-color:\s*rgb\(0,\s*0,\s*0\)/gi, "border-color: rgba(255, 255, 255, 0.12)"],
  [/outline-color:\s*rgba\(0,\s*0,\s*0,\s*0\.87\)/gi, "outline-color: rgba(255, 255, 255, 0.24)"],
  [/outline-color:\s*rgb\(0,\s*0,\s*0\)/gi, "outline-color: rgba(255, 255, 255, 0.24)"],
  [/color:\s*rgb\(17,\s*24,\s*39\)/gi, "color: rgba(255, 255, 255, 0.87)"],
  [/(-webkit-text-fill-color:\s*)rgb\(17,\s*24,\s*39\)/gi, "$1rgba(255, 255, 255, 0.87)"],
  [/background-color:\s*rgb\(247,\s*247,\s*247\)/gi, "background-color: #121212"],
  [/border-color:\s*rgb\(229,\s*231,\s*235\)/gi, "border-color: rgba(255, 255, 255, 0.12)"],
  [/color:\s*rgb\(0,\s*0,\s*238\)/gi, "color: #90caf9"],
  [/(-webkit-text-fill-color:\s*)rgb\(0,\s*0,\s*238\)/gi, "$1#90caf9"],
  [/color:\s*rgb\(63,\s*81,\s*181\)/gi, "color: #90caf9"],
  [/(-webkit-text-fill-color:\s*)rgb\(63,\s*81,\s*181\)/gi, "$1#90caf9"],
];

function shouldPreserveInlineStyle(el: HTMLElement, original: string): boolean {
  const className = el.className?.toString() ?? "";
  if (className.includes("mat-mdc-chip")) {
    if (/background-color:\s*rgb\(/.test(original) && !/background-color:\s*rgb\(255/.test(original)) {
      return true;
    }
  }
  if (/exxat-[a-z-]+-bg\b/.test(className) || /\b(pink|orange|teal|primary|warn|completed)-/.test(className)) {
    if (/background-color:\s*rgb\(/.test(original) && !/background-color:\s*rgb\(255/.test(original)) {
      return true;
    }
  }
  if (/background-color:\s*rgb\(63,\s*81,\s*181\)/i.test(original)) return true;
  if (/background-color:\s*rgb\(61,\s*167,\s*9\)/i.test(original)) return true;
  if (/background-color:\s*rgb\(187,\s*30,\s*31\)/i.test(original)) return true;
  if (/background-color:\s*rgb\(255,\s*152,\s*0\)/i.test(original)) return true;
  return false;
}

function transformInlineStyle(original: string): string {
  let next = original;
  for (const [pattern, replacement] of STYLE_REPLACEMENTS) {
    next = next.replace(pattern, replacement);
  }
  return next;
}

function applyDarkToElement(el: HTMLElement): void {
  const currentStyle = el.getAttribute("style");
  if (!currentStyle) return;
  if (shouldPreserveInlineStyle(el, currentStyle)) return;

  let original = el.getAttribute(ORIGINAL_STYLE_ATTR);
  if (!original) {
    original = currentStyle;
    el.setAttribute(ORIGINAL_STYLE_ATTR, original);
  }

  el.setAttribute("style", transformInlineStyle(original));
}

function restoreElement(el: HTMLElement): void {
  const original = el.getAttribute(ORIGINAL_STYLE_ATTR);
  if (original === null) return;
  el.setAttribute("style", original);
  el.removeAttribute(ORIGINAL_STYLE_ATTR);
}

export function applyH2dInlineDarkMode(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".h2d-screen [style]").forEach(applyDarkToElement);
  root.querySelectorAll<HTMLElement>(".h2d-screen-root[style]").forEach(applyDarkToElement);
  root.querySelectorAll<HTMLElement>(".h2d-screen-root").forEach((el) => {
    el.classList.add("h2d-dark-canvas");
  });
}

export function restoreH2dInlineLightMode(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(`[${ORIGINAL_STYLE_ATTR}]`).forEach(restoreElement);
  root.querySelectorAll<HTMLElement>(".h2d-dark-canvas").forEach((el) => {
    el.classList.remove("h2d-dark-canvas");
  });
}

export function syncH2dInlineTheme(isDark: boolean, root: ParentNode = document): void {
  if (isDark) applyH2dInlineDarkMode(root);
  else restoreH2dInlineLightMode(root);
}
