import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { POSTS } from '@/lib/blog';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import './blog.css';

export const metadata: Metadata = {
  title: 'Journal — Bangalore Luxury Real Estate Insights',
  description:
    'In-depth guides to Bangalore’s finest residences — project spotlights, pricing, locations and investment notes from the Perfect Neighbourhood collection.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { type: 'website', siteName: SITE_NAME, url: `${SITE_URL}/blog`, title: 'Journal — Perfect Neighbourhood' },
};

const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
  return (
    <main className="blog">
      <header className="blog-head">
        <div className="blog-wrap">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> <span>/</span> <span aria-current="page">Journal</span></nav>
          <span className="kicker">The Journal</span>
          <h1>Notes on Bangalore’s Finest Addresses</h1>
          <p className="lede">Project spotlights, pricing and location guides, and investment perspective on the residences in our collection.</p>
        </div>
      </header>

      <section className="blog-wrap blog-list">
        {posts.map((p) => (
          <Link href={`/blog/${p.slug}`} className="post-card" key={p.slug}>
            <div className="post-card-media">
              <Image src={p.heroImage} alt={p.heroAlt} fill sizes="(max-width:760px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="post-card-body">
              <span className="kicker">{p.category}</span>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
              <div className="meta"><time dateTime={p.datePublished}>{fmtDate(p.datePublished)}</time><span aria-hidden>·</span><span>{p.readMinutes} min read</span></div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
