/* Shared CSS scoper: prefixes every selector with a wrapper class so a page's
   styles can't leak globally. Leaves @keyframes/@property/@font-face intact and
   html/.lenis rules global (those live outside the wrapper). Strips comments
   first — a comment before `:root`/`@media` otherwise breaks selector detection. */
export function scopeCss(rawCss, scope) {
  const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, '');
  const scopeOne = (s) => {
    s = s.trim();
    if (!s) return s;
    if (s.startsWith('html') || s.startsWith('.lenis')) return s;
    if (s === '*') return `${scope} *`;
    if (s === ':root') return scope;
    if (s === 'body' || s.startsWith('body')) return scope + s.slice(4);
    return `${scope} ${s}`;
  };
  const scopeList = (sel) => sel.split(',').map(scopeOne).join(',');
  const process = (str) => {
    let res = '', k = 0; const m = str.length;
    while (k < m) {
      let p = k, prelude = '';
      while (p < m && str[p] !== '{' && str[p] !== ';' && str[p] !== '}') { prelude += str[p]; p++; }
      if (p >= m) { res += prelude; break; }
      if (str[p] === ';') { res += prelude + ';'; k = p + 1; continue; }
      if (str[p] === '}') { res += prelude; k = p + 1; continue; }
      let depth = 0, q = p;
      for (; q < m; q++) { if (str[q] === '{') depth++; else if (str[q] === '}') { depth--; if (depth === 0) break; } }
      const body = str.slice(p + 1, q);
      const sel = prelude.trim();
      if (/^@(-webkit-)?keyframes/.test(sel) || sel.startsWith('@font-face') || sel.startsWith('@property')) {
        res += prelude + '{' + body + '}';
      } else if (sel.startsWith('@media') || sel.startsWith('@supports')) {
        res += prelude + '{' + process(body) + '}';
      } else if (sel.startsWith('@')) {
        res += prelude + '{' + body + '}';
      } else {
        res += scopeList(sel) + '{' + body + '}';
      }
      k = q + 1;
    }
    return res;
  };
  return process(css);
}
