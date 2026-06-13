/* Build-time porter for the PROPERTY pages — byte-faithful from property.html.
   The original builds the DOM client-side AND wires behavior in one <script>.
   We server-render the markup (for SEO), so here we emit:
   - app/[slug]/elyse.css      : original Elyse CSS, scoped under `.elyse`
   - public/property-init.js   : the ORIGINAL behavior JS only (setup + behavior),
                                 with the `app.innerHTML = …` build block removed. */
import { readFileSync, writeFileSync } from 'node:fs';
import { scopeCss } from './scope-css.mjs';

const html = readFileSync('property.html', 'utf8');

/* ---- CSS ---- */
const styleM = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleM) throw new Error('no <style> in property.html');
writeFileSync(
  'app/[slug]/elyse.css',
  `/* AUTO-GENERATED from property.html by scripts/port-property.mjs — do not edit by hand. */\n` +
    scopeCss(styleM[1], '.elyse'),
);

/* ---- behavior JS ---- */
// The big inline script: keep the setup (helpers, p-derivation, lenis) and the
// behavior (after `/* ---------- behaviour ---------- */`), but DROP the middle
// block that does `app.innerHTML = …` (the server renders that markup now).
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const main = scripts.sort((a, b) => b.length - a.length)[0];

const buildStart = main.indexOf('if(!p){');
const behaviorMark = '/* ---------- behaviour ---------- */';
const behaviorStart = main.indexOf(behaviorMark);
if (buildStart < 0 || behaviorStart < 0) throw new Error('could not locate build/behavior boundaries');

const setup = main.slice(0, buildStart);
const behavior = main.slice(behaviorStart);
let init = setup + '\n' + behavior;

// The sticky bar / lightbox are injected into document.body by default, which is
// OUTSIDE the scoped `.elyse` wrapper — so the scoped CSS (and its CSS vars) never
// reach them and they render unstyled (e.g. a full-screen WhatsApp icon). Inject
// them inside `.elyse` instead.
init = init.replace(
  /document\.body\.appendChild\(/g,
  "(document.querySelector('.elyse')||document.body).appendChild(",
);

writeFileSync(
  'public/property-init.js',
  '/* AUTO-GENERATED from property.html — verbatim property behavior (DOM built server-side). */\n' +
    init +
    // expose the Lenis instance so React islands (e.g. the gallery lightbox) can pause smooth-scroll
    '\n;try{window.__pnhLenis=lenis;}catch(e){}\n',
);

console.log('✓ property: app/[slug]/elyse.css, public/property-init.js');
console.log('  init bytes:', init.length, '| dropped build block:', behaviorStart - buildStart, 'chars');
