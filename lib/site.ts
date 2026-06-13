import { PROPERTIES, PROP_IMAGES, type Property } from './properties';

export const SITE_URL = 'https://perfectneighbourhood.netlify.app';
export const SITE_NAME = 'Perfect Neighbourhood';
export const PHONE = '+91-93796-27377';
export const WHATSAPP = '919379627377';
export const EMAIL = 'perfectneighbourhoodllp@gmail.com';

export const cap = (s: string) => (s || '').charAt(0).toUpperCase() + (s || '').slice(1);

/** Resolve an image reference: a bare Unsplash photo id, or a local/remote path. */
export const imgURL = (id: string, w = 1200): string =>
  !id ? '' : /[\/.]/.test(id) ? (id.startsWith('http') ? id : `/${id.replace(/^\//, '')}`)
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** First local gallery image for a property, if any. */
export const propImages = (p: Property): string[] => PROP_IMAGES[p.slug] || [];

/** Primary hero image for a property (local photo preferred, else Unsplash fallback). */
export const propHero = (p: Property): string => {
  const local = propImages(p)[0];
  return local ? imgURL(local) : imgURL(p.img, 1600);
};

/** Absolute URL for OG/Twitter/JSON-LD images. */
export const absImage = (p: Property): string => {
  const local = propImages(p)[0];
  if (local) return `${SITE_URL}/${local.replace(/^\//, '')}`;
  return p.img ? imgURL(p.img, 1600) : imgURL('1600596542815-ffad4c1539a9', 1600);
};

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/** Per-property scroll-scrub hero clips. Properties NOT listed here use the
    normal static-image hero. Add a slug → /clip.mp4 entry to give one a video. */
export const PROPERTY_VIDEOS: Record<string, string> = {
  'prestige-golfshire': '/prestige-golfshire-scrub.mp4',
};

export const getProperty = (slug: string): Property | undefined =>
  PROPERTIES.find((p) => p.slug === slug);

export { PROPERTIES, PROP_IMAGES };
export type { Property };
