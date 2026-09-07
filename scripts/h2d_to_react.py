#!/usr/bin/env python3
"""Convert html.to.design .h2d captures into React screen components."""

from __future__ import annotations

import argparse
import base64
import json
import re
import zlib
from pathlib import Path
from typing import Any

SKIP_NODE_IDS = {"top_main_header"}
SKIP_CUSTOM_TAGS = {"fuse-progress-bar"}
SKIP_TAGS = {"script", "style", "meta", "link", "noscript", "head", "pseudo"}
VOID_TAGS = {"img", "input", "br", "hr", "area", "base", "col", "embed", "source", "track", "wbr"}
INVALID_STYLE_KEYS = {"transform2", "transformOrigin2", "content", "appearance"}
CSS_SKIP_VALUES = {
    "auto",
    "none",
    "normal",
    "initial",
    "inherit",
    "unset",
    "0px",
    "rgba(0, 0, 0, 0)",
    "transparent",
}


def h2d_to_json(h2d_path: Path) -> dict[str, Any]:
    raw = h2d_path.read_bytes()
    processed = bytes(b ^ 0x39 for b in raw)
    try:
        decompressed = zlib.decompress(processed)
    except zlib.error:
        decompressed = zlib.decompress(processed, -zlib.MAX_WBITS)
    return json.loads(decompressed.decode("utf-8"))


def safe_component_name(source: str) -> str:
    name = re.sub(r"[^a-zA-Z0-9]+", " ", source).title().replace(" ", "")
    if not name:
        name = "Screen"
    if name[0].isdigit():
        name = f"Screen{name}"
    return name


def escape_js_string(value: str) -> str:
    return (
        value.replace("\\", "\\\\")
        .replace("'", "\\'")
        .replace("\n", "\\n")
        .replace("\r", "")
    )


def escape_jsx_text(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("{", "&#123;")
        .replace("}", "&#125;")
    )


def style_object(styles: dict[str, Any] | None) -> str:
    if not styles:
        return ""
    parts: list[str] = []
    for key, value in styles.items():
        if key in INVALID_STYLE_KEYS:
            continue
        if value is None:
            continue
        text = str(value).strip()
        if not text or text in CSS_SKIP_VALUES:
            continue
        react_key = key
        if key.startswith("webkit"):
            react_key = "W" + key[1:]
        parts.append(f"{react_key}: '{escape_js_string(text)}'")
    if not parts:
        return ""
    return "{" + ", ".join(parts) + "}"


def text_style(node: dict[str, Any], doc: dict[str, Any]) -> str:
    styles: dict[str, str] = {}
    font = node.get("platformFont") or {}
    family = font.get("familyName") or node.get("font")
    if family:
        styles["fontFamily"] = f"'{family}', sans-serif"
    styles["fontSize"] = f"{doc.get('fontSize', 14)}px"
    styles["whiteSpace"] = "pre-wrap"
    return style_object(styles)


def should_skip_node(node: dict[str, Any]) -> bool:
    attr = node.get("attr") or {}
    if attr.get("id") in SKIP_NODE_IDS:
        return True
    tag = node.get("tag") or ""
    if tag in SKIP_CUSTOM_TAGS:
        return True
    return False


def render_children(
    children: list[dict[str, Any]],
    doc: dict[str, Any],
    indent: int,
) -> list[str]:
    lines: list[str] = []
    for child in children:
        rendered = render_node(child, doc, indent)
        if rendered:
            lines.append(rendered)
    return lines


def render_node(node: dict[str, Any], doc: dict[str, Any], indent: int) -> str:
    if should_skip_node(node):
        return ""

    pad = "  " * indent
    node_type = node.get("type")

    if node_type == "TEXT":
        value = escape_jsx_text(str(node.get("value", "")))
        style = text_style(node, doc)
        if style:
            return f"{pad}<span style={{{style}}}>{value}</span>"
        return f"{pad}{value}"

    if node_type == "SVG":
        svg = (node.get("svg") or "").strip()
        if not svg:
            return ""
        style = style_object(node.get("styles"))
        style_attr = f" style={{{style}}}" if style else ""
        return (
            f"{pad}<div{style_attr} dangerouslySetInnerHTML="
            f"{{{{ __html: '{escape_js_string(svg)}' }}}}"
            f" />"
        )

    tag = node.get("tag") or "div"
    if tag in SKIP_TAGS:
        children = node.get("children") or []
        if tag == "head":
            return ""
        child_lines = render_children(children, doc, indent)
        return "\n".join(child_lines)

    children = node.get("children") or []
    attrs: list[str] = []

    attr = node.get("attr") or {}
    if attr.get("id"):
        attrs.append(f'id="{attr["id"]}"')

    class_list = node.get("classList") or []
    if class_list:
        attrs.append(f'className="{escape_js_string(" ".join(class_list))}"')

    styles = dict(node.get("styles") or {})
    if tag in {"html", "body"}:
        styles["overflow"] = "visible"
        styles["overflowX"] = "visible"
        styles["overflowY"] = "visible"
        styles["height"] = "auto"
        styles["minHeight"] = "900px"
        styles["maxHeight"] = "none"

    node_id = attr.get("id")
    class_set = set(class_list)
    if node_id == "container-3":
        styles.pop("height", None)
    if node_id in {"compliance", "caas"}:
        styles["overflow"] = "visible"
        styles["overflowX"] = "visible"
        styles["overflowY"] = "visible"
    if {"center", "p-0"}.issubset(class_set):
        styles.pop("height", None)
        styles.pop("maxHeight", None)
    if {"page-layout", "simple", "inner-scroll"}.issubset(class_set):
        styles["overflow"] = "visible"
        styles["overflowX"] = "visible"
        styles["overflowY"] = "visible"
        styles["flexShrink"] = "1"

    style = style_object(styles)
    if style:
        attrs.append(f"style={{{style}}}")

    attr_text = (" " + " ".join(attrs)) if attrs else ""

    if tag in VOID_TAGS:
        return f"{pad}<{tag}{attr_text} />"

    child_lines = render_children(children, doc, indent + 1)

    if not child_lines:
        return f"{pad}<{tag}{attr_text} />"

    inner = "\n".join(child_lines)
    return f"{pad}<{tag}{attr_text}>\n{inner}\n{pad}</{tag}>"


def write_assets(data: dict[str, Any], assets_dir: Path) -> None:
    assets_dir.mkdir(parents=True, exist_ok=True)
    for url, asset in (data.get("assets") or {}).items():
        content = asset.get("content")
        if not content:
            continue
        ext = ".woff2"
        mime = asset.get("mimeType") or ""
        if "png" in mime:
            ext = ".png"
        elif "svg" in mime:
            ext = ".svg"
        elif "ttf" in mime or url.endswith(".ttf"):
            ext = ".ttf"
        filename = f"asset_{abs(hash(url)) & 0xFFFFFFFF:x}{ext}"
        target = assets_dir / filename
        if asset.get("base64Encoded"):
            target.write_bytes(base64.b64decode(content))
        else:
            target.write_text(content)


def write_font_css(data: dict[str, Any], assets_dir: Path, css_path: Path) -> None:
    lines = ["/* Generated from h2d font assets */"]
    seen: set[str] = set()
    for index, font in enumerate(data.get("fonts") or []):
        src = font.get("src") or ""
        family = font.get("fontFamily") or font.get("platformFontFamily") or f"Font{index}"
        if family in seen:
            continue
        seen.add(family)
        assets = data.get("assets") or {}
        if src not in assets:
            continue
        content = assets[src].get("content")
        if not content:
            continue
        ext = ".woff2" if "woff2" in src else ".ttf"
        filename = f"font_{abs(hash(src)) & 0xFFFFFFFF:x}{ext}"
        target = assets_dir / filename
        if assets[src].get("base64Encoded"):
            target.write_bytes(base64.b64decode(content))
        else:
            target.write_text(content)
        fmt = "woff2" if ext == ".woff2" else "truetype"
        weight = font.get("fontWeight") or "400"
        style = font.get("fontStyle") or "normal"
        lines.extend(
            [
                "@font-face {",
                f"  font-family: '{family}';",
                f"  src: url('/assets/{filename}') format('{fmt}');",
                f"  font-weight: {weight};",
                f"  font-style: {style};",
                "  font-display: swap;",
                "}",
                "",
            ]
        )
    css_path.parent.mkdir(parents=True, exist_ok=True)
    css_path.write_text("\n".join(lines))


WRAPPER_STYLE = "style={{ minHeight: '900px' }}"


def post_process_layout_jsx(body: str) -> str:
    """Fix invalid nested SVG wrappers produced from h2d chart captures."""
    pattern = (
        r'<svg className="ngx-charts" style=\{\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\}>\s*'
        r'(<div dangerouslySetInnerHTML=\{\{ __html: \'[\s\S]*?\' \}\} />)\s*</svg>'
    )
    return re.sub(
        pattern,
        r'<div className="ngx-charts" style={{\1}}>\n\2\n</div>',
        body,
    )


def generate_component(data: dict[str, Any], component_name: str) -> str:
    doc = data.get("doc") or {}
    frame = data["frame"]
    body = post_process_layout_jsx(render_node(frame, doc, 3))
    title = doc.get("title") or data.get("name") or component_name
    return f"""import React from "react";

export default function {component_name}() {{
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-white h2d-screen-root" {WRAPPER_STYLE}>
      <div className="mx-auto w-full max-w-[1440px] h2d-screen-inner" {WRAPPER_STYLE}>
{body}
      </div>
    </div>
  );
}}

{component_name}.displayName = "{escape_js_string(title)}";
"""


def convert(h2d_path: Path, out_dir: Path) -> tuple[Path, str]:
    data = h2d_to_json(h2d_path)
    component_name = safe_component_name(h2d_path.stem)
    assets_dir = out_dir / "public" / "assets"
    write_assets(data, assets_dir)
    fonts_css = out_dir / "src" / "styles" / "h2d-fonts.css"
    write_font_css(data, assets_dir, fonts_css)

    imports_dir = out_dir / "src" / "imports"
    imports_dir.mkdir(parents=True, exist_ok=True)
    target = imports_dir / f"{component_name}.tsx"
    target.write_text(generate_component(data, component_name))
    return target, component_name


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("h2d_files", nargs="+", type=Path)
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="Demo_screens project root",
    )
    args = parser.parse_args()
    for h2d in args.h2d_files:
        target, name = convert(h2d, args.out)
        print(f"Generated {target} ({name})")


if __name__ == "__main__":
    main()
