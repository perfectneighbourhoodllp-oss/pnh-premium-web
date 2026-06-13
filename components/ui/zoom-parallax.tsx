'use client';

import { useScroll, useTransform, useMotionTemplate, motion } from 'framer-motion';
import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect — max 7 images */
	images: Image[];
	/** Optional label shown in the lightbox counter (e.g. the residence name) */
	title?: string;
}

/**
 * Per-image inner-frame placement (indices 0–6), ported 1:1 from the original
 * Tailwind arbitrary values to plain inline styles so this works WITHOUT Tailwind.
 */
const FRAMES: CSSProperties[] = [
	{ height: '25vh', width: '25vw' }, // 0 — focal
	{ top: '-30vh', left: '5vw', height: '30vh', width: '35vw' }, // 1
	{ top: '-10vh', left: '-25vw', height: '45vh', width: '20vw' }, // 2
	{ left: '27.5vw', height: '25vh', width: '25vw' }, // 3
	{ top: '27.5vh', left: '5vw', height: '25vh', width: '20vw' }, // 4
	{ top: '27.5vh', left: '-22.5vw', height: '25vh', width: '30vw' }, // 5
	{ top: '22.5vh', left: '25vw', height: '15vh', width: '15vw' }, // 6
];

export function ZoomParallax({ images, title }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	// full `transform` strings (GPU-accelerated) instead of the `scale` shorthand,
	// which runs on the main thread and drops frames while the images decode.
	const tf4 = useMotionTemplate`scale(${scale4})`;
	const tf5 = useMotionTemplate`scale(${scale5})`;
	const tf6 = useMotionTemplate`scale(${scale6})`;
	const tf8 = useMotionTemplate`scale(${scale8})`;
	const tf9 = useMotionTemplate`scale(${scale9})`;
	const transforms = [tf4, tf5, tf6, tf5, tf6, tf8, tf9];

	// ----- lightbox -----
	const [lb, setLb] = useState<number | null>(null);
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const len = images.length;
	const open = lb !== null;
	const go = (i: number) => setLb(((i % len) + len) % len);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setLb(null);
			else if (e.key === 'ArrowLeft') setLb((v) => (v === null ? v : ((v - 1 + len) % len)));
			else if (e.key === 'ArrowRight') setLb((v) => (v === null ? v : ((v + 1) % len)));
		};
		window.addEventListener('keydown', onKey);
		// lock scroll (native + Lenis) while the lightbox is open
		const html = document.documentElement;
		const prevOverflow = html.style.overflow;
		html.style.overflow = 'hidden';
		const lenis = (window as unknown as { __pnhLenis?: { stop: () => void; start: () => void } }).__pnhLenis;
		lenis?.stop?.();
		return () => {
			window.removeEventListener('keydown', onKey);
			html.style.overflow = prevOverflow;
			lenis?.start?.();
		};
	}, [open, len]);

	// touch swipe in the lightbox
	const touchX = useRef(0);

	return (
		<div ref={container} style={{ position: 'relative', height: '300vh' }}>
			<div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
				{images.map(({ src, alt }, index) => {
					const transform = transforms[index % transforms.length];
					const frame = index < FRAMES.length ? FRAMES[index] : {};
					return (
						<motion.div
							key={index}
							style={{
								transform,
								position: 'absolute',
								top: 0,
								display: 'flex',
								height: '100%',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
								// the full-screen layer must NOT eat clicks in its empty areas —
								// only the image frame (below) is interactive
								pointerEvents: 'none',
							}}
						>
							<button
								type="button"
								onClick={() => setLb(index)}
								aria-label={alt || `View image ${index + 1}`}
								data-hover=""
								style={{ position: 'relative', height: '25vh', width: '25vw', padding: 0, border: 'none', background: 'none', cursor: 'pointer', display: 'block', pointerEvents: 'auto', ...frame }}
							>
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									style={{ height: '100%', width: '100%', objectFit: 'cover', pointerEvents: 'none' }}
								/>
							</button>
						</motion.div>
					);
				})}
			</div>

			{mounted &&
				createPortal(
					<div
						onClick={(e) => { if (e.target === e.currentTarget) setLb(null); }}
						onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
						onTouchEnd={(e) => {
							const dx = e.changedTouches[0].clientX - touchX.current;
							if (Math.abs(dx) > 50 && lb !== null) go(lb + (dx < 0 ? 1 : -1));
						}}
						aria-hidden={!open}
						style={{
							position: 'fixed', inset: 0, zIndex: 9600,
							background: 'rgba(7,7,9,.97)',
							display: 'flex', alignItems: 'center', justifyContent: 'center',
							opacity: open ? 1 : 0, visibility: open ? 'visible' : 'hidden',
							transition: 'opacity .28s cubic-bezier(0.23,1,0.32,1), visibility .28s',
						}}
					>
						{open && (
							<>
								<button onClick={() => setLb(null)} aria-label="Close" style={lbBtn({ top: 18, right: 20, size: 46, font: '1.7rem' })}>×</button>
								{len > 1 && <button onClick={() => go(lb! - 1)} aria-label="Previous" style={lbBtn({ left: 8, mid: true, size: 56, font: '2.2rem' })}>‹</button>}
								<img src={images[lb!].src} alt={images[lb!].alt || ''} style={{ maxWidth: '92vw', maxHeight: '82vh', objectFit: 'contain' }} />
								{len > 1 && <button onClick={() => go(lb! + 1)} aria-label="Next" style={lbBtn({ right: 8, mid: true, size: 56, font: '2.2rem' })}>›</button>}
								<div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)' }}>
									{lb! + 1} / {len}{title ? ` · ${title}` : ''}
								</div>
							</>
						)}
					</div>,
					document.body,
				)}
		</div>
	);
}

function lbBtn(o: { top?: number; right?: number; left?: number; mid?: boolean; size: number; font: string }): CSSProperties {
	return {
		position: 'absolute',
		top: o.mid ? '50%' : o.top,
		right: o.right,
		left: o.left,
		transform: o.mid ? 'translateY(-50%)' : undefined,
		width: o.size, height: o.size,
		display: 'flex', alignItems: 'center', justifyContent: 'center',
		fontSize: o.font, lineHeight: 1,
		color: 'rgba(255,255,255,.7)',
		background: 'none', border: 'none', cursor: 'pointer',
	};
}
