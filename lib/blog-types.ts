/* Blog content model — shared types + constants. Each post lives in its own
   file under lib/posts/ and imports from here; lib/blog.ts assembles them. */

export interface FAQ { q: string; a: string }

export type Block =
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; html: string } // author-controlled HTML (internal links allowed)
  | { t: 'ul'; items: string[] }
  | { t: 'quote'; html: string };

export interface BlogPost {
  slug: string;
  /** the property this post is about, for the internal CTA link */
  propertySlug?: string;
  title: string; // H1
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  keywords: string[];
  primaryKeyword: string;
  datePublished: string; // ISO yyyy-mm-dd
  dateModified: string;
  readMinutes: number;
  heroImage: string;
  heroAlt: string;
  category: string;
  body: Block[];
  faqs: FAQ[];
  related: string[];
  author: string;
}

export const BLOG_AUTHOR = 'Perfect Neighbourhood';
