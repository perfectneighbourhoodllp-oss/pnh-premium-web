/* ============================================================
   Static residence-page generator (SEO build step).
   Run:  node build-residences.js
   Re-run after editing properties.js or changing SITE_URL.
   ============================================================ */
const fs = require('fs');

// ▼▼▼  CHANGE THIS to your live domain once deployed, then re-run  ▼▼▼
const SITE_URL = 'https://perfectneighbourhood.netlify.app';
// ▲▲▲

global.window = {};
require('./properties.js');
const P = global.window.PROPERTIES || [];
const template = fs.readFileSync('property.html', 'utf8');

const cap = s => (s || '').charAt(0).toUpperCase() + (s || '').slice(1);
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const imgURL = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 1200}&q=80`;
const heroImg = p => p.img ? imgURL(p.img, 1600) : imgURL('1600596542815-ffad4c1539a9', 1600);

function meta(p){
  const title = `${p.full || p.name} — ${p.loc} | Perfect Neighbourhood`;
  const desc = `${p.full || p.name} by ${p.developer}, ${p.loc}. ${p.priceRange}, ${p.sizeRange}. ${p.hi[0]}. Enquire for a private viewing.`;
  return { title, desc, url: `${SITE_URL}/${p.slug}`, img: heroImg(p) };
}

function seoBlock(p){
  return `<section style="max-width:900px;margin:0 auto;padding:140px 24px 80px;color:#ededf3">
    <p style="text-transform:uppercase;letter-spacing:.2em;font-size:.72rem;color:#c3c3cc">${esc(p.developer)} · ${esc(p.loc)}</p>
    <h1 style="font-size:2.4rem;font-weight:500;margin:14px 0">${esc(p.full || p.name)}</h1>
    <p style="color:#c3c3cc">${esc(p.micro)}</p>
    <p><strong>Guide price:</strong> ${esc(p.priceRange)} &nbsp;|&nbsp; <strong>Size:</strong> ${esc(p.sizeRange)} &nbsp;|&nbsp; <strong>Type:</strong> ${esc(cap(p.type))} &nbsp;|&nbsp; <strong>Possession:</strong> ${esc(p.possession)} &nbsp;|&nbsp; <strong>Facing:</strong> ${esc(p.facing)}</p>
    <h2>Overview</h2><p>${esc(p.overview)}</p>
    <h2>Configurations</h2><ul>${p.configs.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    <h2>Amenities</h2><ul>${p.amenities.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
    <h2>Location &amp; connectivity — ${esc(p.loc)}</h2><ul>${p.connectivity.map(c => `<li>${esc(c.place)} — ${esc(c.minutes)}</li>`).join('')}</ul>
    <p><a href="#enquire">Request a private viewing</a></p>
  </section>`;
}

function jsonld(p){
  const residence = {
    "@context": "https://schema.org", "@type": "Residence",
    "name": p.full || p.name, "description": p.overview,
    "url": `${SITE_URL}/${p.slug}`, "image": heroImg(p),
    "address": { "@type": "PostalAddress", "addressLocality": p.loc, "addressRegion": "Karnataka", "addressCountry": "IN", "streetAddress": p.micro },
    "geo": { "@type": "GeoCoordinates", "latitude": p.lat, "longitude": p.lng },
    "amenityFeature": p.amenities.map(a => ({ "@type": "LocationFeatureSpecification", "name": a })),
    "numberOfRooms": (p.configs[0] || '').replace(/[^0-9].*$/, '') || undefined
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "The Collection", "item": `${SITE_URL}/#collection` },
      { "@type": "ListItem", "position": 2, "name": p.full || p.name, "item": `${SITE_URL}/${p.slug}` }
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(residence)}</script>\n<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
}

let count = 0;
P.forEach(p => {
  const m = meta(p);
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(m.desc)}" />`);
  const head = `
<link rel="canonical" href="${m.url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Perfect Neighbourhood" />
<meta property="og:title" content="${esc(m.title)}" />
<meta property="og:description" content="${esc(m.desc)}" />
<meta property="og:url" content="${m.url}" />
<meta property="og:image" content="${m.img}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(m.title)}" />
<meta name="twitter:description" content="${esc(m.desc)}" />
<meta name="twitter:image" content="${m.img}" />
${jsonld(p)}
`;
  html = html.replace('</head>', head + '</head>');
  html = html.replace('<main id="app"></main>', `<main id="app">${seoBlock(p)}</main>`);
  html = html.replace('<script src="properties.js"></script>', `<script>window.__SLUG__=${JSON.stringify(p.slug)};</script>\n<script src="properties.js"></script>`);
  fs.writeFileSync(`${p.slug}.html`, html, 'utf8');
  count++;
});

const urls = [`${SITE_URL}/`].concat(P.map(p => `${SITE_URL}/${p.slug}`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') + `\n</urlset>\n`;
fs.writeFileSync('sitemap.xml', sitemap);
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`✓ Generated ${count} residence pages + sitemap.xml + robots.txt`);
console.log(`  Base URL: ${SITE_URL}  (edit SITE_URL in this file + re-run if your domain differs)`);
