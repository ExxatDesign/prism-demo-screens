#!/usr/bin/env python3
"""Post-process generated h2d import components for layout/chart rendering."""

from __future__ import annotations

import re
from pathlib import Path

NGX_CHARTS_PATTERN = re.compile(
    r'<svg className="ngx-charts" style=\{\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\}>\s*'
    r'(<div dangerouslySetInnerHTML=\{\{ __html: \'[\s\S]*?\' \}\} />)\s*</svg>'
)


def fix_pendo_banners(text: str) -> tuple[str, int]:
    count = 0
    new_text, n = re.subn(
        r"style=\{\{width: '500px', height: '1px',",
        "style={{width: '100%',",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r"(id=\"pendo-g-[^\"]+\" className=\"_pendo-step-container-size\" style=\{\{)width: '500px',",
        r"\1width: '100%',",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r"style=\{\{left: '[^']*', top: '[^']*', right: '[^']*', borderColor: 'rgb\(18, 18, 18\)', borderWidth: '2px',",
        "style={{width: '100%', borderColor: 'rgba(0, 0, 0, 0.87)',",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r"pointerEvents: 'all', position: 'fixed', WebkitTextFillColor:",
        "pointerEvents: 'all', position: 'relative', WebkitTextFillColor:",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r"(id=\"pendo-guide-container-[^\"]+\" className=\"_pendo-step-container-styles\" style=\{\{)"
        r"top: '[^']*', right: '[^']*', ",
        r"\1",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r"maxWidth: '250px', outlineColor:",
        "outlineColor:",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r"transform: 'matrix\(1, 0, 0, 1, 0, -28\)', ",
        "",
        text,
    )
    count += n
    return new_text, count


def fix_page_layout_overflow(text: str) -> tuple[str, int]:
    count = 0
    new_text, n = re.subn(
        r'(<div className="page-layout[^"]*" style=\{\{[^}]*?)'
        r"overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', ",
        r"\1",
        text,
    )
    count += n
    text = new_text
    new_text, n = re.subn(
        r'(<div className="page-layout[^"]*" style=\{\{[^}]*?)flexShrink: \'0\'',
        r"\1flexShrink: '1'",
        text,
    )
    count += n
    return new_text, count


def fix_table_heights(text: str) -> tuple[str, int]:
    count = 0
    new_text, n = re.subn(
        r'(<div className="table-rounded-border p-0 student-search-report" style=\{\{)height: \'767px\', ',
        r"\1",
        text,
    )
    count += n
    return new_text, count


def fix_file(path: Path) -> dict[str, int]:
    text = path.read_text()
    counts = {
        "container_height": 0,
        "center_height": 0,
        "page_overflow": 0,
        "inner_scroll": 0,
        "ngx_charts": 0,
        "grid_height": 0,
    }

    new_text, n = re.subn(r"height: '853px', ", "", text)
    counts["container_height"] = n
    text = new_text

    new_text, n = re.subn(
        r'(<div className="center p-0" style=\{\{width: \'100%\', )height: \'100%\', ',
        r"\1",
        text,
    )
    counts["center_height"] += n
    text = new_text

    new_text, n = re.subn(
        r'(<div className="center p-0" style=\{\{[^}]*?)maxHeight: \'100%\', ',
        r"\1",
        text,
    )
    counts["center_height"] += n
    text = new_text

    for page_id in ("compliance", "caas"):
        new_text, n = re.subn(
            rf'(<div id="{page_id}"[^>]*?)overflow: \'hidden\', overflowX: \'hidden\', overflowY: \'hidden\', ',
            r"\1",
            text,
        )
        counts["page_overflow"] += n
        text = new_text

    new_text, n = re.subn(
        r'(<div className="page-layout simple fullwidth inner-scroll"[^>]*?)'
        r"overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', ",
        r"\1",
        text,
    )
    counts["inner_scroll"] += n
    text = new_text

    new_text, n = re.subn(
        r'(<div className="page-layout simple fullwidth inner-scroll"[^>]*?)flexShrink: \'0\'',
        r"\1flexShrink: '1'",
        text,
    )
    counts["inner_scroll"] += n
    text = new_text

    new_text, n = re.subn(
        r'(className="content by_cohort_grid_container[^"]*" style=\{\{)height: \'100%\', ',
        r"\1",
        text,
    )
    counts["grid_height"] += n
    text = new_text

    new_text, n = NGX_CHARTS_PATTERN.subn(
        r'<div className="ngx-charts" style={{\1}}>\n\2\n</div>',
        text,
    )
    counts["ngx_charts"] = n
    text = new_text

    text, pendo = fix_pendo_banners(text)
    counts["pendo"] = pendo

    text, page_layout = fix_page_layout_overflow(text)
    counts["page_layout"] = page_layout

    text, table_heights = fix_table_heights(text)
    counts["table_heights"] = table_heights

    path.write_text(text)
    return counts


def fix_wrapper(path: Path) -> int:
    text = path.read_text()
    original = text
    text = text.replace(
        'className="min-h-dvh w-full overflow-x-auto bg-white"',
        'className="min-h-dvh w-full overflow-x-hidden bg-[#f8f8f8] h2d-screen-root"',
    )
    text = text.replace(
        'className="mx-auto w-full min-w-[1440px] max-w-[1440px]"',
        'className="mx-auto w-full max-w-[1440px] h2d-screen-inner"',
    )
    if text != original:
        path.write_text(text)
        return 1
    return 0


def main() -> None:
    imports_dir = Path(__file__).resolve().parents[1] / "src" / "imports"
    for path in sorted(imports_dir.glob("StepsExxatComAdmin*.tsx")):
        counts = fix_file(path)
        wrapper = fix_wrapper(path)
        print(f"{path.name}: {counts} wrapper={wrapper}")


if __name__ == "__main__":
    main()
