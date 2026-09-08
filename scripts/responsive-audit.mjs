import { chromium } from "playwright";

const BASE = "http://localhost:4010";
const WIDTHS = [1440, 1024, 768, 480];
const HEIGHT = 900;

const PAGES = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Faculty Home", path: "/faculty/dashboard" },
  { name: "Faculty CAAS", path: "/faculty/caas" },
  { name: "Faculty Compliance (By Group)", path: "/caas/faculty/home/bygroup" },
  { name: "Student Compliance (Cohort)", path: "/compliance/home/cohort" },
  { name: "Compliance Student", path: "/profile/search" },
  { name: "Curriculum Course Offerings", path: "/curriculum/courseofferings" },
  { name: "Program Details", path: "/program/programdetails" },
  { name: "Competency Review", path: "/competency/review" },
  { name: "Curriculum Mapping", path: "/cmap/curriculum" },
  { name: "Student Dashboard", path: "/student" },
  { name: "Student Compliance Dashboard", path: "/student/compliance" },
];

const AUDIT_JS = () => {
  const docEl = document.documentElement;
  const body = document.body;
  const clientWidth = docEl.clientWidth;
  const scrollWidth = docEl.scrollWidth;

  const overflowPx = scrollWidth - clientWidth;
  const hasPageOverflow = overflowPx > 1;

  // Find elements extending past viewport
  const overflowingElements = [];
  const candidates = document.querySelectorAll(
    ".h2d-screen *:not(svg):not(path):not(style):not(script)"
  );
  for (const el of candidates) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    const right = rect.right;
    const left = rect.left;
    if (right > clientWidth + 2 || left < -2) {
      const cls = el.className?.toString?.() || "";
      const id = el.id || "";
      const tag = el.tagName.toLowerCase();
      const w = style.width;
      const minW = style.minWidth;
      const maxW = style.maxWidth;
      const overflow = style.overflowX;
      const flexWrap = style.flexWrap;
      const justify = style.justifyContent;
      overflowingElements.push({
        selector: id ? `#${id}` : cls ? `${tag}.${cls.split(/\s+/).slice(0, 3).join(".")}` : tag,
        tag,
        id,
        classes: cls.slice(0, 120),
        right: Math.round(right),
        left: Math.round(left),
        width: Math.round(rect.width),
        cssWidth: w,
        minWidth: minW,
        maxWidth: maxW,
        overflowX: overflow,
        flexWrap,
        justifyContent: justify,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      });
    }
    if (overflowingElements.length >= 25) break;
  }

  // Toolbar / button row analysis
  const toolbarSelectors = [
    ".caas-faculty-toolbar-row",
    ".w-100-p",
    ".mt-16.mb-12",
    ".border-right.h-48",
    ".mat-mdc-tab-nav-bar",
    ".mat-button-toggle-group",
    ".search-wrapper",
    ".page-layout .center .mt-16",
    "[class*='toolbar']",
  ];

  const toolbarIssues = [];
  for (const sel of toolbarSelectors) {
    document.querySelectorAll(sel).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return;
      const style = getComputedStyle(el);
      const children = Array.from(el.children);
      let clippedChildren = 0;
      let splitAwkward = false;
      for (const child of children) {
        const cr = child.getBoundingClientRect();
        const cs = getComputedStyle(child);
        if (cs.display === "none") continue;
        if (cr.right > rect.right + 1 || cr.left < rect.left - 1) clippedChildren++;
        if (cr.bottom > rect.bottom + 2 && style.flexWrap === "nowrap") splitAwkward = true;
      }
      const rowOverflow = el.scrollWidth > el.clientWidth + 1;
      const extendsViewport = rect.right > clientWidth + 1;
      if (clippedChildren || rowOverflow || extendsViewport || splitAwkward) {
        toolbarIssues.push({
          selector: sel,
          classes: el.className?.toString?.().slice(0, 100),
          id: el.id,
          rectWidth: Math.round(rect.width),
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          flexWrap: style.flexWrap,
          overflowX: style.overflowX,
          justifyContent: style.justifyContent,
          clippedChildren,
          rowOverflow,
          extendsViewport,
          splitAwkward,
        });
      }
    });
  }

  // Table scroll analysis
  const tableSelectors = [
    ".table-rounded-border",
    ".table-rounded-border.with-sticky-header-table",
    ".exxat-new-grid",
    ".by_cohort_grid_container",
    ".content.exxat-sticky-table",
    "#sticky-column-table",
    "#stickyColumnTable",
    ".mat-mdc-table",
    ".exxat-table",
  ];

  const tableResults = [];
  for (const sel of tableSelectors) {
    document.querySelectorAll(sel).forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      const style = getComputedStyle(el);
      const table = el.querySelector("table") || (el.tagName === "TABLE" ? el : null);
      const tableWidth = table ? table.scrollWidth : el.scrollWidth;
      const containerWidth = el.clientWidth;
      const needsHScroll = tableWidth > containerWidth + 1;
      const hasHScroll = style.overflowX === "auto" || style.overflowX === "scroll";
      const hiddenOverflow = style.overflowX === "hidden" || style.overflow === "hidden";
      const extendsPage = rect.right > clientWidth + 1;

      if (needsHScroll || extendsPage || hiddenOverflow) {
        tableResults.push({
          selector: sel,
          id: el.id,
          classes: el.className?.toString?.().slice(0, 100),
          containerWidth,
          tableScrollWidth: tableWidth,
          needsHScroll,
          overflowX: style.overflowX,
          overflow: style.overflow,
          hasInternalScroll: hasHScroll && needsHScroll,
          hiddenOverflow,
          extendsPage,
          rectRight: Math.round(rect.right),
        });
      }
    });
  }

  // Fixed-width elements (inline style or computed px width > viewport fraction)
  const fixedWidthIssues = [];
  document.querySelectorAll(".h2d-screen [style*='width'], .h2d-screen [style*='minWidth'], .h2d-screen [style*='maxWidth']").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const style = getComputedStyle(el);
    const inline = el.getAttribute("style") || "";
    const pxMatch = inline.match(/width:\s*['"]?(\d+)px/);
    const px = pxMatch ? parseInt(pxMatch[1], 10) : null;
    if ((px && px > clientWidth * 0.95) || rect.width > clientWidth + 1) {
      fixedWidthIssues.push({
        selector: el.id ? `#${el.id}` : el.className?.toString?.().slice(0, 80),
        inlineWidth: px,
        computedWidth: style.width,
        rectWidth: Math.round(rect.width),
        extendsViewport: rect.right > clientWidth + 1,
      });
    }
  });

  // Class pattern frequency among overflow culprits
  const classPatterns = {};
  for (const item of [...overflowingElements, ...toolbarIssues.map(t => ({ classes: t.classes }))]) {
    const cls = item.classes || "";
    for (const c of cls.split(/\s+/)) {
      if (!c || c.length < 3) continue;
      if (/^(mat-|mdc-|ng-|fa-|p-|m-|w-|h-|flex|block|relative|absolute)/.test(c) || c.includes("-")) {
        classPatterns[c] = (classPatterns[c] || 0) + 1;
      }
    }
  }

  const topClasses = Object.entries(classPatterns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([c, n]) => ({ class: c, count: n }));

  return {
    clientWidth,
    scrollWidth,
    overflowPx,
    hasPageOverflow,
    overflowingElements: overflowingElements.slice(0, 15),
    toolbarIssues: toolbarIssues.slice(0, 12),
    tableResults: tableResults.slice(0, 10),
    fixedWidthIssues: fixedWidthIssues.slice(0, 10),
    topClasses,
  };
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const report = [];

for (const pg of PAGES) {
  const pageReport = { name: pg.name, path: pg.path, breakpoints: {} };

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    await page.goto(`${BASE}${pg.path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(800);
    const data = await page.evaluate(AUDIT_JS);
    pageReport.breakpoints[width] = data;
  }

  report.push(pageReport);
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
