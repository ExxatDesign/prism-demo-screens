import * as React from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import {
  STUDENT_PROFILE_EXTRA_TABS,
  STUDENT_PROFILE_TAB_IDS,
  type StudentProfileTabId,
} from "@/profile/student-profile-tabs";
import {
  NEEDS_ATTENTION_ITEMS,
  OverviewAssessmentsCard,
  StudentExamPanel,
  StudentSurveyPanel,
} from "@/profile/student-exam-survey-panels";

const PANELS: Partial<Record<StudentProfileTabId, React.ComponentType>> = {
  exam: StudentExamPanel,
  survey: StudentSurveyPanel,
};

function labelSpan(link: HTMLElement) {
  return link.querySelector<HTMLElement>(".mdc-tab__text-label span span");
}

function makeLink(template: HTMLElement, id: string, label: string) {
  const link = template.cloneNode(true) as HTMLElement;
  link.id = id;
  const text = labelSpan(link);
  if (text) text.textContent = label;
  return link;
}

/** Append our alert rows to the captured "Needs Attention → Student" list by cloning a row. */
function addNeedsAttention(root: Element, goTo: (tab: "exam" | "survey", view?: "evals") => void) {
  const added: HTMLElement[] = [];
  const studentHeading = [...root.querySelectorAll("profile-needs-attention h3")].find(
    (h) => h.textContent?.trim() === "Student",
  );
  const list = studentHeading?.parentElement?.querySelector<HTMLElement>(".py-16");
  const template = list?.children[1] as HTMLElement | undefined; // Profile Attestations row
  if (!list || !template) return added;

  NEEDS_ATTENTION_ITEMS.forEach((item) => {
    const row = template.cloneNode(true) as HTMLElement;
    const icon = row.querySelector("i");
    if (icon) icon.className = item.icon;
    const body = row.querySelector<HTMLElement>(".mb-8");
    const title = body?.querySelector<HTMLElement>(".font-weight-600 span");
    const warn = body?.querySelector<HTMLElement>(".warn-fg");
    const link = body?.querySelector<HTMLAnchorElement>("a.link-btn");
    if (!body || !title || !warn || !link) return;
    title.textContent = item.title;
    item.lines.forEach((line) => {
      const el = warn.cloneNode(true) as HTMLElement;
      const span = el.querySelector("span");
      if (span) span.textContent = line;
      body.insertBefore(el, link);
    });
    warn.remove();
    link.removeAttribute("id");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(item.tab, item.view);
    });
    list.appendChild(row);
    added.push(row);
  });
  return added;
}

/**
 * The captured header only knows the original tabs. Append Exam / Survey links by cloning an
 * existing one, move the active underline when one of them is selected, and portal a React
 * panel in place of the Overview body (the Overview component still supplies the header).
 * On Overview it also injects the assessments summary card and Needs Attention rows.
 */
export function useStudentProfileExtraTabs(activeTab: StudentProfileTabId) {
  const [, setSearchParams] = useSearchParams();
  const [host, setHost] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    const root = document.querySelector(".student-profile-screen");
    const bar = root?.querySelector<HTMLElement>(".mat-mdc-tab-links");
    if (!root || !bar) return;

    const overview = bar.querySelector<HTMLElement>(`[id="${STUDENT_PROFILE_TAB_IDS.overview}"]`);
    const inactive = bar.querySelector<HTMLElement>(`[id="${STUDENT_PROFILE_TAB_IDS.academics}"]`);
    if (!overview || !inactive) return;
    const activeTemplate = overview.cloneNode(true) as HTMLElement;
    const added: HTMLElement[] = [];

    STUDENT_PROFILE_EXTRA_TABS.forEach(({ id, label }) => {
      const linkId = STUDENT_PROFILE_TAB_IDS[id];
      const link = makeLink(id === activeTab ? activeTemplate : inactive, linkId, label);
      bar.appendChild(link);
      added.push(link);
    });

    let panelHost: HTMLElement | null = null;
    if (activeTab in PANELS) {
      overview.replaceWith(makeLink(inactive, STUDENT_PROFILE_TAB_IDS.overview, "Overview"));
      const overviewBody = root.querySelector<HTMLElement>("profile-overview");
      if (overviewBody?.parentElement) {
        // The screen stylesheet forces profile-overview to display:block !important.
        overviewBody.style.setProperty("display", "none", "important");
        panelHost = document.createElement("div");
        overviewBody.parentElement.insertBefore(panelHost, overviewBody);
      }
    } else if (activeTab === "overview") {
      const learning = root.querySelector("profile-learning-activity-overview");
      if (learning?.parentElement) {
        panelHost = document.createElement("div");
        learning.after(panelHost);
      }
      added.push(
        ...addNeedsAttention(root, (tab, view) => setSearchParams(view ? { tab, view } : { tab }, { replace: true })),
      );
    }
    setHost(panelHost);

    return () => {
      added.forEach((el) => el.remove());
      panelHost?.remove();
      setHost(null);
    };
  }, [activeTab, setSearchParams]);

  if (!host) return null;
  const Panel = PANELS[activeTab] ?? (activeTab === "overview" ? OverviewAssessmentsCard : null);
  return Panel ? createPortal(<Panel />, host) : null;
}
