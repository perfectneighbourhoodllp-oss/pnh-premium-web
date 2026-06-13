import HomeScripts from '@/components/HomeScripts';
import './home.css';

/* Homepage — byte-faithful port of the original index.html.
   Static shell rendered server-side; the Mercury CSS (app/home.css) and the
   original homepage JS (public/home-init.js) drive the look & behavior exactly.
   Wrapped in `.mercury` so the scoped styles never touch the property pages. */
export default function Home() {
  return (
    <main className="mercury">
      <div className="grain" />
      <div className="progress"><i id="prog" /></div>
      <div className="cursor" id="cursor" />
      <div className="cursor-dot" id="cursorDot" />

      <div id="preloader">
        <div className="pl-top">
          <div className="pl-mark"><span>Perfect Neighbourhood</span></div>
          <div className="pl-sub">A Private Collection · Bangalore</div>
        </div>
        <div className="pl-count"><span id="plNum">0</span><span className="pl-slash">/100</span></div>
        <div className="pl-bar"><i id="plFill" /></div>
      </div>

      <header id="header">
        <div className="hd-inner">
          <a href="#top" className="brand" data-hover="">
            <span className="b1">Perfect Neighbourhood</span>
            <span className="b2">Premium Residences</span>
          </a>
          <nav className="center">
            <a href="#philosophy" data-hover="">The Idea</a>
            <a href="#collection" data-hover="">The Collection</a>
            <a href="#map" data-hover="">The Map</a>
            <a href="#contact" data-hover="">Enquire</a>
          </nav>
          <a href="#contact" className="pill pill-ghost" data-hover="" data-magnetic="">Request Access</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-media">
          <video
            id="heroVid"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
          >
            <source src="/herovideo1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-scrim" />
        <canvas id="topo" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-eyebrow"><span className="ln" /><span className="eyebrow">A Private Collection · Bangalore</span></div>
          <h1>
            <span className="row"><span>The address is the <em>last</em></span></span>
            <span className="row"><span>luxury money can buy.</span></span>
          </h1>
          <p className="sub">Twenty hand-selected residences across Bangalore — never advertised, offered by introduction.</p>
          <div className="hero-cta">
            <form className="capture" id="capture" noValidate>
              <input type="email" name="email" placeholder="Your email for private access" />
              <button type="submit" className="pill pill-primary" data-hover="" data-magnetic="">Request Access <span className="arr">→</span></button>
            </form>
            <a href="#collection" className="alt" data-hover="">or view the collection ↓</a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee"><div className="marquee-row" id="mqRow" /></div>

      {/* PHILOSOPHY */}
      <section className="pad" id="philosophy">
        <div className="wrap">
          <div className="phil">
            <div className="sec-head reveal">
              <span className="eyebrow">The Philosophy</span>
              <h2>Nothing here is <em>accidental.</em></h2>
            </div>
            <div>
              <p className="big" data-words="">We began with a question worth being honest about: what makes an address worth ten crore, and a lifetime? The answer was never marble. It was the grain of light on a horizon, water at the garden&apos;s edge, and neighbours whose names you&apos;d want to know.</p>
              <div className="sig reveal">Curated for the discerning few.</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <img className="stats-bg" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=70" alt="" aria-hidden="true" />
        <div className="stats-inner">
          <div className="stats-head reveal">
            <span className="eyebrow">The Measure of It</span>
            <h2>You don&apos;t buy an address here.<br />You&apos;re <em>introduced</em> to one.</h2>
            <p>A collection kept deliberately small — so that what&apos;s inside stays rare, and the life around it stays yours.</p>
          </div>
          <div className="stats-grid">
            <div className="stat reveal"><div className="num" data-count="20">0</div><div className="lbl">Curated Addresses</div><div className="sub">Hand-selected. Never advertised.</div></div>
            <div className="stat reveal d1"><div className="num" data-count="38">0<span className="suf">Cr</span></div><div className="lbl">The Pinnacle</div><div className="sub">Where the city&apos;s ambition finally rests.</div></div>
            <div className="stat reveal d2"><div className="num" data-count="31">0</div><div className="lbl">Acres of Green</div><div className="sub">Room to breathe, and then some.</div></div>
            <div className="stat reveal d3"><div className="num" data-count="4">0</div><div className="lbl">Private Enclaves</div><div className="sub">Each a world entirely its own.</div></div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="pad deepbg" id="collection">
        <div className="wrap">
          <div className="coll-head reveal">
            <span className="eyebrow">The Collection · Live Inventory</span>
            <h2>A curated selection</h2>
            <p>Twenty residences across Bangalore&apos;s most luxury corridors. Filter by typology, by enclave, or simply by what moves you.</p>
          </div>
          <div className="filters reveal d1" id="filters">
            <button className="filter active" data-filter="all" data-hover="">All</button>
            <button className="filter" data-filter="villa" data-hover="">Villas</button>
            <button className="filter" data-filter="apartment" data-hover="">Apartments</button>
            <button className="filter" data-filter="penthouse" data-hover="">Penthouses</button>
            <button className="filter" data-filter="plot" data-hover="">Plots</button>
          </div>
          <div className="featbar reveal d1" id="featbar" />
          <div className="coll-meta" id="collMeta">Showing all residences</div>
          <div className="grid" id="grid" />
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div className="marquee alt"><div className="marquee-row" id="mqRow2" /></div>

      {/* MAP */}
      <section className="pad" id="map">
        <div className="wrap">
          <div className="map-head reveal">
            <div className="sec-head">
              <span className="eyebrow">Within the City</span>
              <h2>Every residence, mapped</h2>
            </div>
            <div className="map-legend">
              <div className="lg"><span className="dot" style={{ background: '#ededf3' }} />Ready</div>
              <div className="lg"><span className="dot" style={{ background: '#cdddff' }} />By Invitation</div>
              <div className="lg"><span className="dot" style={{ background: '#3a3a45' }} />Sold Out</div>
            </div>
          </div>
          <div className="mapx reveal d1">
            <div className="maplist" id="mapList" />
            <div className="mapwrap"><div id="leafmap" /></div>
          </div>
        </div>
      </section>

      {/* FEATURE */}
      <section className="feature" id="featured">
        <img id="featImg" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80" alt="Prestige Golfshire" />
        <div className="feature-inner">
          <span className="eyebrow reveal">Featured · By Invitation</span>
          <h2 className="reveal d1">Prestige Golfshire</h2>
          <p className="reveal d1">Nandi Hills. Forty-six bespoke villas arranged around a championship golf course and a private lake, beneath a horizon nothing in the city can rival.</p>
          <div className="feature-stats reveal d2">
            <div className="fstat"><div className="v">27<span style={{ fontSize: '.6em' }}>Cr</span></div><div className="k">From</div></div>
            <div className="fstat"><div className="v">12,500</div><div className="k">Sq Ft</div></div>
            <div className="fstat"><div className="v">46</div><div className="k">Villas</div></div>
          </div>
          <a href="#contact" className="pill pill-primary reveal d2" data-hover="" data-magnetic="">Request an Invitation <span className="arr">→</span></a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="pad contact" id="contact">
        <div className="wrap">
          <span className="eyebrow reveal">Private Viewing</span>
          <h2 className="display reveal" style={{ fontSize: 'clamp(1.9rem,4vw,3.2rem)', marginTop: 14 }}>Request a private viewing</h2>
          <p className="sub reveal d1">Tell us what matters. A Perfect Neighbourhood advisor will curate a private, no-obligation introduction to the residences that fit.</p>
          <form className="enq reveal d1" id="enquiry" noValidate>
            <div className="frow">
              <div className="field"><label>Full Name</label><input type="text" name="name" placeholder="Your name" required /></div>
              <div className="field"><label>Email</label><input type="email" name="email" placeholder="you@email.com" required /></div>
            </div>
            <div className="frow">
              <div className="field"><label>Phone</label><input type="tel" name="phone" placeholder="+91" /></div>
              <div className="field"><label>Interested In</label>
                <select name="interest"><option>Any — surprise me</option><option>Villas</option><option>Apartments</option><option>Penthouses</option><option>Plots</option></select>
              </div>
            </div>
            <div className="frow">
              <div className="field"><label>Budget</label>
                <select name="budget"><option>₹8 Cr – ₹12 Cr</option><option>₹12 Cr – ₹20 Cr</option><option>₹20 Cr – ₹30 Cr</option><option>₹30 Cr +</option></select>
              </div>
              <div className="field"><label>Preferred Locale</label><input type="text" name="locale" placeholder="Nandi Hills, Whitefield…" /></div>
            </div>
            <div className="frow">
              <div className="field"><label>This Is</label>
                <select name="purpose"><option>A primary home</option><option>A second home</option><option>An investment</option></select>
              </div>
              <div className="field"><label>Planning to Buy</label>
                <select name="timeline"><option>Immediately</option><option>Within 3 months</option><option>In 6–12 months</option><option>Just exploring</option></select>
              </div>
            </div>
            <div className="field" style={{ marginBottom: 8 }}><label>A Note</label><textarea name="note" placeholder="Tell us about the life you're picturing." /></div>
            <div className="form-actions">
              <button type="submit" className="submit" data-hover="" data-magnetic="">Submit Enquiry</button>
              <span className="form-note">No spam. A human replies within the day.</span>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="f-grid">
            <div className="f-brand">
              <div className="b1">Perfect Neighbourhood</div>
              <div className="b2">Premium Residences</div>
              <p>A private collection of Bangalore&apos;s finest addresses. Hand-selected, never advertised, offered by introduction.</p>
            </div>
            <div className="f-col"><h4>Explore</h4>
              <a href="#philosophy" data-hover="">The Idea</a><a href="#collection" data-hover="">The Collection</a><a href="#map" data-hover="">The Map</a><a href="#featured" data-hover="">Featured</a>
            </div>
            <div className="f-col"><h4>Office</h4>
              <p>The Collection House</p><p>UB City, Vittal Mallya Road</p><p>Bangalore 560001</p>
            </div>
            <div className="f-col"><h4>Contact</h4>
              <a href="tel:+919379627377" data-hover="">+91 93796 27377</a><a href="mailto:perfectneighbourhoodllp@gmail.com" data-hover="">perfectneighbourhoodllp@gmail.com</a><a href="#contact" data-hover="">Book a viewing</a>
            </div>
          </div>
          <div className="f-bottom">
            <p>© 2026 Perfect Neighbourhood. A private collection. All prices indicative.</p>
            <p>Crafted as a motion experience.</p>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/919379627377?text=I%27m%20interested%20in%20the%20Perfect%20Neighbourhood%20collection." target="_blank" rel="noopener" className="wa-float" aria-label="Chat on WhatsApp" data-hover="">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c.6.3 1.1.4 1.5.5a3.5 3.5 0 001.6.1c.5-.1 1.4-.6 1.6-1.1a2 2 0 00.1-1.1c0-.1-.2-.2-.4-.3z" /></svg>
      </a>

      <HomeScripts />
    </main>
  );
}
