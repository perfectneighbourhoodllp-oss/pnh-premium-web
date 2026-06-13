import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROPERTIES, PROP_IMAGES, type Property } from '@/lib/properties';
import { SITE_URL, SITE_NAME, cap, imgURL, waLink, getProperty, absImage, PROPERTY_VIDEOS } from '@/lib/site';
import PropertyScripts from '@/components/PropertyScripts';
import PropertyHeroScrub from '@/components/PropertyHeroScrub';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import './elyse.css';
import './hero-scrub.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  const title = `${p.full || p.name} — ${p.loc}`;
  const description = `${p.full || p.name} by ${p.developer}, ${p.loc}. ${p.priceRange}, ${p.sizeRange}. ${p.hi[0]}. Enquire for a private viewing.`;
  const url = `${SITE_URL}/${p.slug}`;
  const img = absImage(p);
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: SITE_NAME, title, description, url, images: [{ url: img }] },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

function jsonLd(p: Property) {
  const residence = {
    '@context': 'https://schema.org', '@type': 'Residence',
    name: p.full || p.name, description: p.overview,
    url: `${SITE_URL}/${p.slug}`, image: absImage(p),
    address: { '@type': 'PostalAddress', addressLocality: p.loc, addressRegion: 'Karnataka', addressCountry: 'IN', streetAddress: p.micro },
    geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng },
    amenityFeature: p.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'The Collection', item: `${SITE_URL}/#collection` },
      { '@type': 'ListItem', position: 2, name: p.full || p.name, item: `${SITE_URL}/${p.slug}` },
    ],
  };
  return [residence, breadcrumb];
}

const POOL = ['1613490493576-7fde63acd811', '1600596542815-ffad4c1539a9', '1512917774080-9991f1c4c750', '1600607687939-ce8a6c25118c', '1600566753086-00f18fb6b3ea', '1600210492486-724fe5c67fb0', '1600573472550-8090b5e0745e', '1600585152220-90363fe7e115', '1564013799919-ab600027ffc6', '1568605114967-8130f3a36994'];
const mono = (n: string) => n.split('—')[0].trim().split(' ').slice(0, 2).map((w) => w[0]).join('');
const shortPlace = (s: string) => s.replace('Kempegowda International Airport', "Int'l Airport").replace(/ \(.*\)/, '').replace(' / ORR', '');
const rawImgs = (p: Property) => PROP_IMAGES[p.slug] || [];
const heroRawOf = (p: Property) => rawImgs(p)[0] || p.img;

const Tick = () => (<svg viewBox="0 0 24 24"><path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z" /></svg>);
const PinIcon = () => (<svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" /></svg>);

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const statusLabel = ({ ready: 'Ready to move', invite: 'By Invitation', sold: 'Sold Out' } as Record<string, string>)[p.status] || '';
  const heroRaw = heroRawOf(p);
  const heroVideo = PROPERTY_VIDEOS[p.slug]; // scrub-video hero only for listed slugs
  const gallery = rawImgs(p).length ? rawImgs(p).slice(0, 6) : [...new Set([p.img, ...POOL].filter(Boolean))].slice(0, 5);
  const ovImg = gallery[1] || gallery[0] || POOL[0];
  // Zoom-parallax gallery: lead with the property's own images, pad with the
  // fallback pool so the 7-frame effect is always full. Index 0 is the focal frame.
  const parallaxImages = [...new Set([...gallery, ...POOL])].slice(0, 7).map((g, i) => ({
    src: imgURL(g, 1600),
    alt: `${p.name} — view ${i + 1}`,
  }));
  const k0 = p.connectivity && p.connectivity[0] ? p.connectivity[0] : null;
  const facts: { v: string; k: string }[] = [
    { v: p.range, k: 'Guide Price' }, { v: p.sizeRange, k: 'Residence Size' }, { v: p.possession, k: 'Possession' },
  ];
  if (k0) facts.push({ v: k0.minutes, k: shortPlace(k0.place) });
  facts.push({ v: cap(p.type), k: 'Typology' });
  const related = PROPERTIES.filter((x) => x.slug !== p.slug).sort((a, b) => (a.type === p.type ? -1 : 0) - (b.type === p.type ? -1 : 0)).slice(0, 3);
  const waHero = waLink(`I'm interested in ${p.name} (${p.loc}).`);
  const waEnq = waLink(`I'm interested in ${p.name}.`);

  return (
    // overflow-x:clip (not hidden) clips horizontally WITHOUT creating a scroll
    // container, so descendant position:sticky (parallax, overview image) works.
    <div className="elyse" style={{ overflowX: 'clip' }}>
      {jsonLd(p).map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <div id="veil" />
      <div className="grain" />
      <div className="progress"><i id="prog" /></div>
      <div className="cursor" id="cursor" />
      <div className="cursor-dot" id="cursorDot" />

      <header id="header">
        <div className="hd-inner">
          <a href="/" className="brand" data-hover="">
            <span className="b1">Perfect Neighbourhood</span>
            <span className="b2">Premium Residences</span>
          </a>
          <div className="hd-right">
            <a href="/#collection" className="hd-back" data-hover="">← The Collection</a>
            <a href="#enquire" className="pill pill-ghost hd-cta" data-hover="">Request Access</a>
          </div>
        </div>
      </header>

      <main id="app">
        {/* HERO */}
        <section className="phero">
          <div className="phero-media">
            {heroVideo
              ? <PropertyHeroScrub src={heroVideo} poster={imgURL(heroRaw, 1920)} alt={p.name} />
              : heroRaw
                ? <img id="pheroImg" src={imgURL(heroRaw, 1920)} alt={p.name} />
                : <div className="phero-mono">{mono(p.name)}</div>}
          </div>
          <div className="wrap phero-inner">
            <div className="phero-eyebrow">
              <span className="eyebrow">{p.developer} · {p.loc}</span>
              <span className={`phero-chip ${p.status === 'invite' ? 'invite' : ''}`}>{statusLabel}</span>
              <span className="phero-chip">{p.facing} facing</span>
            </div>
            <h1>{p.full || p.name}</h1>
            <div className="phero-pitch">{p.hi.join('  ·  ')}</div>
            <div className="phero-sub">{p.micro}</div>
            {p.verified === false && (
              <div className="unverified">Note: this listing could not be independently verified at the stated Bangalore location — details shown are indicative.</div>
            )}
            <div className="phero-facts">
              {facts.map((f, i) => (
                <div className="pfact" key={i}><div className="v">{f.v}</div><div className="k">{f.k}</div></div>
              ))}
            </div>
            <div className="phero-actions">
              <a href="#enquire" className="pill pill-primary" data-hover="" data-magnetic="">Request a Viewing <span className="arr">→</span></a>
              <a href={waHero} target="_blank" rel="noopener" className="pill pill-line" data-hover="">WhatsApp</a>
            </div>
          </div>
          {heroVideo && p.usp?.length > 0 && (
            <div className="phero-usps" aria-hidden="true">
              <div className="wrap">
                {p.usp.map((u, i) => (
                  <div className="phero-usp" key={i}>
                    <span className="phero-usp-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="phero-usp-t">{u}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="phero-cue" aria-hidden="true"><span>Scroll</span><i /></div>
        </section>

        {/* OVERVIEW */}
        <section className="sec sec-beige"><div className="wrap"><div className="two">
          <div className="ov-left">
            <div className="sec-label reveal">Overview</div>
            <div className="ov-img reveal"><img src={imgURL(ovImg, 900)} alt={p.name} loading="lazy" /></div>
          </div>
          <div>
            <p className="overview-text reveal">{p.overview}</p>
            <div className="usp">
              {p.usp.map((u, i) => (
                <div className="u" key={i}><div className="n">0{i + 1}</div><div className="t">{u}</div></div>
              ))}
            </div>
          </div>
        </div></div></section>

        {/* IMAGE-FILLED HEADLINE */}
        <section className="bigtype"><div className="wrap">
          <h2 className="bigtype-h" style={{ backgroundImage: `url('${imgURL(heroRaw || ovImg, 1600)}')` }}>{p.name}</h2>
        </div></section>

        {/* KEY FACTS */}
        <section className="sec sec-black"><div className="wrap">
          <div className="sec-label reveal">Key Facts</div>
          <div className="gfx-row reveal" style={{ marginTop: 30 }}>
            <div className="gfx">
              <svg className="compass" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.16)" />
                <g stroke="rgba(255,255,255,.35)"><line x1="60" y1="9" x2="60" y2="18" /><line x1="60" y1="102" x2="60" y2="111" /><line x1="9" y1="60" x2="18" y2="60" /><line x1="102" y1="60" x2="111" y2="60" /></g>
                <text x="60" y="30" className="compass-l">N</text><text x="60" y="98" className="compass-l">S</text><text x="98" y="64" className="compass-l">E</text><text x="22" y="64" className="compass-l">W</text>
                <g id="needle"><polygon points="60,22 65.5,60 60,64 54.5,60" fill="var(--beige)" /><polygon points="60,98 65.5,60 60,56 54.5,60" fill="rgba(255,255,255,.22)" /><circle cx="60" cy="60" r="3.5" fill="var(--white)" /></g>
              </svg>
              <div className="gfx-k">Facing · <b>{p.facing}</b></div>
            </div>
            <div className="gfx gfx-tl">
              <div className="tl"><i id="tlFill" /></div>
              <div className="tl-labels"><span>Launched</span><span>Possession</span></div>
              <div className="gfx-k" style={{ textAlign: 'left' }}>Status · <b>{p.possession}</b></div>
            </div>
          </div>
          <div className="facts-grid" style={{ marginTop: 30 }}>
            <div className="fact"><div className="k">Developer</div><div className="v">{p.developer}</div></div>
            <div className="fact"><div className="k">Typology</div><div className="v">{cap(p.type)}</div></div>
            <div className="fact"><div className="k">Possession</div><div className="v">{p.possession}</div></div>
            <div className="fact"><div className="k">Price Range</div><div className="v">{p.priceRange}</div></div>
            <div className="fact"><div className="k">Size Range</div><div className="v">{p.sizeRange}</div></div>
            <div className="fact"><div className="k">Facing</div><div className="v">{p.facing}</div></div>
          </div>
        </div></section>

        {/* CONFIGURATIONS */}
        <section className="sec sec-beige"><div className="wrap">
          <div className="sec-label reveal">Configurations</div>
          <h2 className="h2 reveal">Available residences</h2>
          <div className="config-list">
            {p.configs.map((c, i) => {
              const parts = c.split(' · ');
              return (
                <div className="config" key={i}>
                  <div><div className="nm">{parts[0]}</div>{parts[1] && <div className="meta">{parts[1]}</div>}</div>
                  <a href="#enquire" className="go" data-hover="">Enquire →</a>
                </div>
              );
            })}
          </div>
        </div></section>

        {/* AMENITIES */}
        <section className="sec sec-black"><div className="wrap">
          <div className="sec-label reveal">Amenities</div>
          <h2 className="h2 reveal">The lifestyle</h2>
          <div className="amen-grid">
            {p.amenities.map((a, i) => (<div className="amen" key={i}><Tick /><span>{a}</span></div>))}
          </div>
        </div></section>

        {/* LOCATION & CONNECTIVITY */}
        <section className="sec sec-beige"><div className="wrap">
          <div className="sec-label reveal">Location &amp; Connectivity</div>
          <h2 className="h2 reveal">{p.loc}</h2>
          <div className="conn-wrap">
            <div className="connmap reveal">
              <div className="cm-origin"><span className="cm-dot" /><div className="cm-otext"><div className="cm-o1">The Residence</div><div className="cm-o2">{p.loc}</div></div></div>
              <div className="cm-routes">
                {p.connectivity.map((c, i) => (
                  <div className="cm-route" key={i}><div className="cm-place">{c.place}</div><div className="cm-line"><i /></div><div className="cm-time" data-time="">{c.minutes}</div></div>
                ))}
              </div>
            </div>
            <div id="pmap" className="reveal" />
          </div>
        </div></section>

        {/* GALLERY — zoom parallax */}
        <section className="sec sec-black" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="sec-label reveal">Gallery</div>
            <h2 className="h2 reveal">A closer look</h2>
          </div>
          <ZoomParallax images={parallaxImages} title={p.name} />
        </section>

        {/* ENQUIRE */}
        <section className="enq-sec" id="enquire"><div className="wrap"><div className="enq-grid">
          <div className="reveal">
            <div className="sec-label">Private Viewing</div>
            <h2 style={{ marginTop: 16 }}>Enquire about {p.name}</h2>
            <p>Share a few details and a Perfect Neighbourhood advisor will arrange a private, no-obligation viewing of this residence.</p>
            <div className="enq-contact">
              <a href="tel:+919379627377" data-hover=""><PinIcon /> +91 93796 27377</a>
              <a href="mailto:perfectneighbourhoodllp@gmail.com" data-hover=""><PinIcon /> perfectneighbourhoodllp@gmail.com</a>
            </div>
          </div>
          <form id="enq" className="reveal" noValidate>
            <div className="field"><label>Full Name</label><input name="name" placeholder="Your name" required /></div>
            <div className="field"><label>Email</label><input type="email" name="email" placeholder="you@email.com" required /></div>
            <div className="field"><label>Phone</label><input name="phone" placeholder="+91" /></div>
            <div className="qual">
              <div className="field"><label>Budget</label><select name="budget" defaultValue="Select a range"><option>Select a range</option><option>₹5 – 10 Cr</option><option>₹10 – 20 Cr</option><option>₹20 – 30 Cr</option><option>₹30 Cr +</option></select></div>
              <div className="field"><label>This Is</label><select name="purpose" defaultValue="A primary home"><option>A primary home</option><option>A second home</option><option>An investment</option></select></div>
            </div>
            <div className="field"><label>Planning to Buy</label><select name="timeline" defaultValue="Immediately"><option>Immediately</option><option>Within 3 months</option><option>In 6–12 months</option><option>Just exploring</option></select></div>
            <div className="field"><label>A Note</label><textarea name="note" defaultValue={`I'd like a private viewing of ${p.name}.`} /></div>
            <div className="enq-actions">
              <button type="submit" className="submit" data-hover="" data-magnetic="">Submit Enquiry</button>
              <a href={waEnq} target="_blank" rel="noopener" className="pill pill-line-dark" data-hover="">WhatsApp</a>
            </div>
          </form>
        </div></div></section>

        {/* RELATED */}
        <section className="sec sec-black"><div className="wrap">
          <div className="sec-label reveal">Also in the Collection</div>
          <h2 className="h2 reveal">More residences</h2>
          <div className="rel-grid">
            {related.map((r) => {
              const rh = heroRawOf(r);
              return (
                <a className="rel" href={`/${r.slug}`} data-hover="" key={r.slug}>
                  <div className="rel-media">{rh ? <img src={imgURL(rh, 700)} alt={r.name} loading="lazy" /> : <div className="rel-mono">{mono(r.name)}</div>}</div>
                  <div className="rel-body"><div className="rel-loc">{r.loc}</div><div className="rel-name">{r.name}</div><div className="rel-price">{r.range} · {cap(r.type)}</div></div>
                </a>
              );
            })}
          </div>
        </div></section>

        <footer>
          <div className="wrap">
            <div className="b1">Perfect Neighbourhood</div>
            <div className="b2">Premium Residences</div>
            <div className="links">
              <a href="/#collection" data-hover="">The Collection</a>
              <a href="/#map" data-hover="">The Map</a>
              <a href="#enquire" data-hover="">Enquire</a>
            </div>
            <div className="copy">© 2026 Perfect Neighbourhood. All prices indicative · sourced from public listings.</div>
          </div>
        </footer>
      </main>

      <PropertyScripts slug={slug} />
    </div>
  );
}
