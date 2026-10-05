import * as React from "react";

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  if (endDeg <= startDeg) return "";
  // A single arc cannot span 360° (start === end renders nothing), so split it in two halves.
  if (endDeg - startDeg >= 359.99) {
    const top = polar(cx, cy, r, startDeg);
    const bottom = polar(cx, cy, r, startDeg + 180);
    return `M ${top.x.toFixed(2)} ${top.y.toFixed(2)} A ${r} ${r} 0 1 1 ${bottom.x.toFixed(2)} ${bottom.y.toFixed(2)} A ${r} ${r} 0 1 1 ${top.x.toFixed(2)} ${top.y.toFixed(2)}`;
  }
  const start = polar(cx, cy, r, endDeg);
  const end = polar(cx, cy, r, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${large} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

/** "3h" / "11h 11m" / "0m" → minutes; plain counts pass through. */
function parseLegendValue(text: string): number {
  const hours = /(\d+)\s*h/i.exec(text);
  const minutes = /(\d+)\s*m/i.exec(text);
  if (hours || minutes) return Number(hours?.[1] ?? 0) * 60 + Number(minutes?.[1] ?? 0);
  return Number.parseInt(text, 10);
}

function parseLegendSegments(bar: Element): { color: string; value: number }[] {
  const rows = bar.querySelectorAll(".legend-value-row");
  const segments: { color: string; value: number }[] = [];
  rows.forEach((row) => {
    const swatch = row.querySelector(".legend-color") as HTMLElement | null;
    const valueEl = row.querySelector(".value-item span span");
    if (!swatch || !valueEl) return;
    const color = swatch.style.backgroundColor || getComputedStyle(swatch).backgroundColor;
    const value = parseLegendValue(valueEl.textContent?.trim() ?? "0");
    if (!Number.isFinite(value) || value <= 0) return;
    segments.push({ color, value });
  });
  return segments;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

/**
 * The capture nests the ring as <svg><div><svg>…</svg></div></svg>, which browsers never render,
 * and keeps a single placeholder arc. Draw a real ring from the legend instead.
 */
function repairDonutCharts(root: Element) {
  root.querySelectorAll("exxat-circular-progress-bar").forEach((bar) => {
    const container = bar.querySelector(".progress-container");
    if (!container) return;

    container.querySelectorAll("svg[data-sp-donut]").forEach((node) => node.remove());
    const captured = [...container.children].find((c) => c instanceof SVGSVGElement);
    if (captured instanceof SVGSVGElement) captured.style.display = "none";

    const segments = parseLegendSegments(bar);
    const total = segments.reduce((sum, s) => sum + s.value, 0);

    const ring = svgEl("svg", {
      width: "72",
      height: "72",
      viewBox: "0 0 72 72",
      "data-sp-donut": "",
    });
    ring.appendChild(
      svgEl("circle", { cx: "36", cy: "36", r: "33", fill: "none", stroke: "#e0e0e0", "stroke-width": "6" }),
    );

    let angle = 0;
    segments.forEach((seg) => {
      const sweep = (seg.value / total) * 360;
      const d = arcPath(36, 36, 33, angle, angle + sweep);
      angle += sweep;
      if (d) ring.appendChild(svgEl("path", { d, fill: "none", stroke: seg.color, "stroke-width": "6" }));
    });

    container.insertBefore(ring, container.firstChild);
  });
}

/** Client-side fixes for H2D Student 360 capture gaps (donut rings). */
export function useStudentProfileEnhancements(activeTab: string) {
  React.useLayoutEffect(() => {
    const root = document.querySelector(".student-profile-screen");
    if (!root) return;
    repairDonutCharts(root);
  }, [activeTab]);
}
