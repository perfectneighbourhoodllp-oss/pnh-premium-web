'use client';
import { useEffect } from 'react';

/* Loads the original property dependencies + verbatim behavior script, in order.
   The DOM is server-rendered; property-init.js only wires interactions
   (parallax, compass/timeline, lightbox, sticky bar, mini-map, form, veil). */
const SRCS = [
  '/properties.js', // sets window.PROPERTIES / PROP_IMAGES / SHEETS_URL
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  '/property-init.js', // original behavior, verbatim
];

let booted = false;

export default function PropertyScripts({ slug }: { slug: string }) {
  useEffect(() => {
    if (booted) return; // guard StrictMode double-invoke (each visit is a full load)
    booted = true;

    (window as unknown as { __SLUG__: string }).__SLUG__ = slug;

    // veil failsafe (from the original inline script): never leave it stuck
    setTimeout(() => {
      const v = document.getElementById('veil');
      if (v) v.style.transform = 'translateY(-100%)';
    }, 2200);

    if (!document.querySelector('link[data-leaflet]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      l.setAttribute('data-leaflet', '');
      document.head.appendChild(l);
    }

    const load = (src: string) =>
      new Promise<void>((resolve) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = false; // preserve execution order
        s.onload = () => resolve();
        s.onerror = () => resolve();
        document.body.appendChild(s);
      });

    (async () => {
      for (const src of SRCS) await load(src);
    })();
  }, [slug]);

  return null;
}
