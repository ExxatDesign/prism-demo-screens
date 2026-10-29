import {
  getFeatureAccessAriaLabel,
  isFeatureEntitled,
} from "@/components/feature-access/feature-access-config";
import { insertLockAfterLabelText } from "@/embed/feature-access-dom";

const FEATURE_ACCESS_ATTR = "data-feature-access";
const LOCKED_TAB_ATTR = "data-feature-access-tab";

function ensureTabLockAffordance(
  tab: HTMLAnchorElement,
  featureKey: string,
  tabLabel: string,
) {
  tab.setAttribute(LOCKED_TAB_ATTR, featureKey);
  tab.classList.add("feature-access-locked-tab");
  tab.setAttribute("role", "button");
  tab.setAttribute("aria-label", getFeatureAccessAriaLabel(featureKey));

  if (tab.getAttribute("href")) {
    tab.dataset.featureAccessOriginalHref = tab.getAttribute("href") ?? "";
    tab.removeAttribute("href");
  }

  insertLockAfterLabelText(tab, tabLabel, "feature-access-locked-tab__lock");
}

function tabLinkContainsLabel(link: Element, label: string): boolean {
  const text = link.textContent?.replace(/\s+/g, " ").trim() ?? "";
  return text.includes(label);
}

function findTabByLabel(
  root: Element,
  tabLabel: string,
  tabSelector: string,
): HTMLAnchorElement | null {
  const links = root.querySelectorAll<HTMLAnchorElement>(tabSelector);
  for (const link of links) {
    if (tabLinkContainsLabel(link, tabLabel)) return link;
  }
  return null;
}

/** Lock a Material tab by visible label; click opens access flow instead of navigating. */
export function wireFeatureAccessLockedTab(options: {
  root: Element;
  featureKey: string;
  tabLabel: string;
  tabSelector?: string;
  onLockedClick: (featureKey: string) => void;
}): () => void {
  const {
    root,
    featureKey,
    tabLabel,
    tabSelector = "#caas a.mat-mdc-tab-link, app-caas-admin a.mat-mdc-tab-link",
    onLockedClick,
  } = options;

  if (isFeatureEntitled(featureKey)) return () => {};

  const tab = findTabByLabel(root, tabLabel, tabSelector);
  if (!tab) return () => {};

  ensureTabLockAffordance(tab, featureKey, tabLabel);

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const lockedTab = target.closest<HTMLElement>(`[${LOCKED_TAB_ATTR}="${featureKey}"]`);
    if (!lockedTab || !root.contains(lockedTab)) return;
    event.preventDefault();
    event.stopPropagation();
    onLockedClick(featureKey);
  };

  root.addEventListener("click", onClick, true);
  return () => root.removeEventListener("click", onClick, true);
}

/**
 * Delegates clicks on `[data-feature-access]` when the feature is not entitled.
 * Use on a screen root; pair with `useFeatureAccessDialog` in React.
 */
export function wireFeatureAccess(
  root: Element,
  onLockedClick: (featureKey: string) => void,
): () => void {
  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const el = target.closest<HTMLElement>(`[${FEATURE_ACCESS_ATTR}]`);
    if (!el || !root.contains(el)) return;

    const featureKey = el.getAttribute(FEATURE_ACCESS_ATTR);
    if (!featureKey || isFeatureEntitled(featureKey)) return;

    event.preventDefault();
    event.stopPropagation();
    onLockedClick(featureKey);
  };

  root.addEventListener("click", onClick, true);
  return () => root.removeEventListener("click", onClick, true);
}

/** Lock a dashboard `.dashboard_nav_item` row by its navigate link id. */
export function applyFeatureAccessDashboardNavLock(options: {
  root: Element;
  linkId: string;
  featureKey: string;
}): void {
  const { root, linkId, featureKey } = options;
  if (isFeatureEntitled(featureKey)) return;

  const link = root.querySelector<HTMLAnchorElement>(`#${CSS.escape(linkId)}`);
  const row = link?.closest<HTMLElement>(".dashboard_nav_item");
  if (!row || row.dataset.featureAccessApplied === featureKey) return;

  row.dataset.featureAccessApplied = featureKey;
  row.setAttribute(FEATURE_ACCESS_ATTR, featureKey);
  row.classList.add("feature-access-locked-dashboard-item");
  row.setAttribute("aria-label", getFeatureAccessAriaLabel(featureKey));

  row.querySelectorAll(":scope > div").forEach((block, index) => {
    if (index === 0) return;
    block.classList.add("feature-access-locked-dashboard-item__body");
    block.setAttribute("aria-hidden", "true");
  });

  const linkLabel = link?.textContent?.replace(/\s+/g, " ").trim();
  if (link && linkLabel) {
    insertLockAfterLabelText(row, linkLabel, "feature-access-dashboard-lock");
  }
}
