function elementDepth(el: Element): number {
  let depth = 0;
  let node: Element | null = el;
  while (node?.parentElement) {
    depth += 1;
    node = node.parentElement;
  }
  return depth;
}

function textMatchesLabel(el: HTMLElement, normalized: string): boolean {
  return el.textContent?.replace(/\s+/g, " ").trim() === normalized;
}

/** Undo tab lock placement that wrapped `.mdc-tab__content` (wide flex + gap before lock). */
function repairMisplacedTabLock(root: Element, lockClassName: string): void {
  root.querySelectorAll(".feature-access-lock-inline-host").forEach((wrap) => {
    if (!wrap.querySelector(".mdc-tab__content")) return;
    wrap.querySelector(`.${lockClassName}`)?.remove();
    const parent = wrap.parentElement;
    if (!parent) return;
    while (wrap.firstChild) {
      parent.insertBefore(wrap.firstChild, wrap);
    }
    wrap.remove();
  });
}

function findLabelElement(root: Element, label: string): HTMLElement | null {
  const normalized = label.trim();
  const candidates = root.querySelectorAll<HTMLElement>("span, a, button, h1, h2, h3, h4, p");
  const matches: HTMLElement[] = [];

  for (const el of candidates) {
    if (!textMatchesLabel(el, normalized)) continue;
    matches.push(el);
  }

  if (!matches.length) return null;

  const minimal = matches.filter(
    (candidate) => !matches.some((other) => other !== candidate && candidate.contains(other)),
  );

  return minimal.sort((a, b) => elementDepth(b) - elementDepth(a))[0] ?? null;
}

/** Insert lock icon immediately after the element whose text matches `label`. */
export function insertLockAfterLabelText(
  root: Element,
  label: string,
  lockClassName: string,
): HTMLElement | null {
  repairMisplacedTabLock(root, lockClassName);

  const existing = root.querySelector<HTMLElement>(`.${lockClassName}`);
  if (existing) return existing;

  const el = findLabelElement(root, label);
  if (!el) return null;

  const lock = document.createElement("span");
  lock.className = lockClassName;
  lock.setAttribute("aria-hidden", "true");
  lock.innerHTML = '<i class="fa-solid fa-lock"></i>';

  const host = el.parentElement;
  if (host) {
    let wrap = el.parentElement;
    if (!wrap?.classList.contains("feature-access-lock-inline-host")) {
      wrap = document.createElement("span");
      wrap.className = "feature-access-lock-inline-host";
      host.insertBefore(wrap, el);
      wrap.appendChild(el);
    }
    wrap.appendChild(lock);
  } else {
    el.insertAdjacentElement("afterend", lock);
  }
  return lock;
}
