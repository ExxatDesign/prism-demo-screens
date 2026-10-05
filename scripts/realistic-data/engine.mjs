/**
 * Rewrites placeholder text in generated h2d import components.
 *
 * Text nodes appear in the generated TSX as `>raw text<` (HTML entities still encoded, e.g. `&amp;`).
 * A screen file exports `{ files: [substring, ...], rules(h) }`; `rules` returns an array of
 * functions `(text) => string | undefined` tried in order — first non-undefined result wins.
 * Rules receive and return the trimmed raw text; surrounding whitespace is preserved.
 */

const TEXT_NODE = /(>)([^<>{}]{1,400})(<)/g;
const ATTR = /\b(alt|title|aria-label|placeholder|value)="([^"<>{}]{1,300})"/g;

/** Mimics the app's ellipsis for long labels: 16 chars + "..." when longer than 19. */
export function truncate(text) {
  return text.length > 19 ? text.slice(0, 16) + "..." : text;
}

export function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function createHelpers() {
  return {
    escapeHtml,
    truncate,
    /** Exact text → replacement. Long keys also map their ellipsized form automatically. */
    exact(map) {
      const m = new Map();
      for (const [from, to] of Object.entries(map)) {
        m.set(from, to);
        if (from.length > 19) m.set(truncate(from), truncate(to));
      }
      return (t) => (m.has(t) ? m.get(t) : undefined);
    },
    /**
     * Assigns pool items to matching texts in order of first appearance; the same text always gets
     * the same item. `test` is a RegExp or predicate over the raw text. Pool values must not match
     * `test` themselves, so re-running the script is a no-op.
     */
    pool(test, items, { ellipsize = true } = {}) {
      const seen = new Map();
      const matches = typeof test === "function" ? test : (t) => test.test(t);
      return (t) => {
        if (!matches(t)) return undefined;
        if (!seen.has(t)) seen.set(t, items[seen.size % items.length]);
        const to = seen.get(t);
        return ellipsize && t.endsWith("...") ? truncate(to) : to;
      };
    },
    /** Regex replace within a text node (all matches). */
    regex(re, to) {
      return (t) => {
        const out = t.replace(re, to);
        return out === t ? undefined : out;
      };
    },
  };
}

export function transform(source, rules) {
  const apply = (text) => {
    for (const rule of rules) {
      const out = rule(text);
      if (out !== undefined) return out;
    }
    return undefined;
  };
  let changed = 0;
  // Chart/tooltip HTML lives in single-quoted JS strings (`__html: '...'`); replacements placed there
  // must have quotes and backslashes escaped or the file stops compiling.
  const inJsString = (offset) => {
    const lineStart = source.lastIndexOf("\n", offset) + 1;
    return /__html:\s*'/.test(source.slice(lineStart, offset));
  };
  const escapeJs = (t) => t.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  let out = source.replace(TEXT_NODE, (m, a, raw, b, offset) => {
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.match(/\s*$/)[0];
    const text = raw.trim();
    if (!text) return m;
    const to = apply(text);
    if (to === undefined || to === text) return m;
    changed++;
    return a + lead + (inJsString(offset) ? escapeJs(to) : to) + trail + b;
  });
  out = out.replace(ATTR, (m, attr, raw) => {
    const to = apply(raw);
    if (to === undefined || to === raw) return m;
    changed++;
    return `${attr}="${to}"`;
  });
  return { out, changed };
}
