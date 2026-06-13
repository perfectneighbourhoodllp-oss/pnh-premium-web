'use client';
import { useEffect } from 'react';

/* Loads the original homepage dependencies + verbatim init script in order,
   exactly as the old index.html did (classic scripts, ordered).
   The homepage is always entered via a full document load (links into the
   property pages navigate away), so this one-shot boot matches the original. */
const SRCS = [
  '/properties.js', // sets window.PROPERTIES / PROP_IMAGES / SHEETS_URL
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  '/home-init.js', // the original homepage logic, verbatim
];

let booted = false;

export default function HomeScripts() {
  useEffect(() => {
    if (booted) return; // guard React StrictMode double-invoke within one page load
    booted = true;

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
        s.onerror = () => resolve(); // degrade gracefully (e.g. map offline)
        document.body.appendChild(s);
      });

    (async () => {
      for (const src of SRCS) await load(src);
    })();
  }, []);

  return null;
}
