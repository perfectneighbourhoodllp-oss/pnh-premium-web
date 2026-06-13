/* Build-time porter for the HOMEPAGE — byte-faithful from index.html.
   - app/home.css       : original Mercury CSS, scoped under `.mercury`
   - public/home-init.js : original homepage JS, links → clean routes
   - public/properties.js: copy of the data file (sets window globals) */
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { scopeCss } from './scope-css.mjs';

const html = readFileSync('index.html', 'utf8');

const styleM = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleM) throw new Error('no <style> found');
writeFileSync(
  'app/home.css',
  `/* AUTO-GENERATED from index.html by scripts/port-home.mjs — do not edit by hand. */\n` +
    scopeCss(styleM[1], '.mercury'),
);

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
let init = scripts.sort((a, b) => b.length - a.length)[0];
init = init
  .replace(/\$\{r\.slug\}\.html/g, '/${r.slug}')
  .replace(/c\.dataset\.slug\+'\.html'/g, "'/'+c.dataset.slug");
writeFileSync('public/home-init.js', '/* AUTO-GENERATED from index.html — verbatim homepage logic. */\n' + init);

copyFileSync('properties.js', 'public/properties.js');
console.log('✓ home: app/home.css, public/home-init.js, public/properties.js');
