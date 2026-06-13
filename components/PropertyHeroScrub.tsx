'use client';
import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	interface Window { gsap?: any; ScrollTrigger?: any; __pnhLenis?: any }
}

/**
 * Property hero. By default (SSR, mobile, reduced-motion) it renders the plain
 * responsive image hero — identical to every other property, crawlable, light.
 * ONLY on desktop + non-reduced-motion does it swap to a scroll-scrubbed video:
 * the hero pins and the video's playback follows scroll. Reuses the GSAP + Lenis
 * already loaded by property-init.js. This keeps mobile fast (no 10MB download)
 * and avoids the pin/clip layout issues on small screens.
 */
export default function PropertyHeroScrub({ src, poster, alt }: { src: string; poster: string; alt: string }) {
	const [scrub, setScrub] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	// decide on the client only — never on the server, so SSR/mobile stay as <img>
	useEffect(() => {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const desktop = matchMedia('(min-width: 901px)').matches;
		if (!reduce && desktop) setScrub(true);
	}, []);

	useEffect(() => {
		if (!scrub) return;
		const v = videoRef.current;
		if (!v) return;
		let st: any = null;
		let timer = 0;
		let cancelled = false;

		const setup = () => {
			const gsap = window.gsap;
			const ST = window.ScrollTrigger;
			if (!gsap || !ST || !('__pnhLenis' in window)) return false;
			const phero = document.querySelector('.phero');
			if (!phero) return false;
			// remove the original hero parallax/fade so it doesn't fight the pin
			ST.getAll().forEach((t: any) => { if (t.trigger === phero) t.kill(); });

			const seek = (p: number) => {
				if (v.duration && isFinite(v.duration)) {
					try { v.currentTime = Math.max(0, Math.min(v.duration - 0.05, p * v.duration)); } catch {}
				}
			};

			// scroll choreography: hero details lift away, the project USPs rise up
			const inner = phero.querySelector('.phero-inner');
			const cue = phero.querySelector('.phero-cue');
			const usps = phero.querySelectorAll('.phero-usp');
			const tl = gsap.timeline();
			// strong ease-out everywhere (never ease-in on UI — it feels sluggish)
			if (inner) tl.to(inner, { yPercent: -22, opacity: 0, ease: 'expo.out', duration: 0.3 }, 0);
			if (cue) tl.to(cue, { opacity: 0, duration: 0.12 }, 0);
			if (usps.length) {
				tl.fromTo(usps,
					{ y: 50, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.16, ease: 'expo.out', duration: 0.55 },
					0.32);
			}

			st = ST.create({
				trigger: phero, start: 'top top', end: '+=160%', pin: true, scrub: 1,
				animation: tl,
				onUpdate: (s: any) => seek(s.progress),
				onRefresh: (s: any) => seek(s.progress),
			});
			ST.refresh();
			return true;
		};

		let tries = 0;
		const tick = () => { if (cancelled) return; if (setup() || tries++ > 150) return; timer = window.setTimeout(tick, 100); };
		v.pause();
		tick();
		return () => { cancelled = true; clearTimeout(timer); if (st) st.kill(); };
	}, [scrub]);

	// default / mobile / reduced-motion: plain responsive image hero (styled by `.phero-media img`)
	if (!scrub) {
		// eslint-disable-next-line @next/next/no-img-element
		return <img id="pheroImg" src={poster} alt={alt} />;
	}

	return (
		<video
			ref={videoRef}
			muted
			playsInline
			preload="auto"
			poster={poster}
			aria-label={alt}
			style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.95) brightness(.62)' }}
		>
			<source src={src} type="video/mp4" />
		</video>
	);
}
