import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, getPost, BLOG_AUTHOR, type Block } from '@/lib/blog';
import { SITE_URL, SITE_NAME, getProperty } from '@/lib/site';
import '../blog.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  const img = `${SITE_URL}${post.heroImage}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article', siteName: SITE_NAME, title: post.metaTitle, description: post.metaDescription,
      url, images: [{ url: img }], publishedTime: post.datePublished, modifiedTime: post.dateModified,
    },
    twitter: { card: 'summary_large_image', title: post.metaTitle, description: post.metaDescription, images: [img] },
  };
}

function jsonLd(slug: string) {
  const post = getPost(slug)!;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const img = `${SITE_URL}${post.heroImage}`;
  const blogPosting = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: post.title, description: post.metaDescription, image: img,
    datePublished: post.datePublished, dateModified: post.dateModified,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
  };
  const faqPage = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };
  return [blogPosting, faqPage, breadcrumb];
}

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case 'h2': return <h2 key={i} id={b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{b.text}</h2>;
    case 'h3': return <h3 key={i}>{b.text}</h3>;
    case 'p': return <p key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
    case 'ul': return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
    case 'quote': return <blockquote key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
    default: return null;
  }
}

const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const property = post.propertySlug ? getProperty(post.propertySlug) : undefined;

  return (
    <main className="blog">
      {jsonLd(slug).map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <header className="blog-head">
        <div className="blog-wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span>/</span> <Link href="/blog">Journal</Link> <span>/</span> <span aria-current="page">{post.category}</span>
          </nav>
          <span className="kicker">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <div className="meta">
            <span>{post.author}</span><span aria-hidden>·</span>
            <time dateTime={post.datePublished}>{fmtDate(post.datePublished)}</time><span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </div>
        </div>
      </header>

      <div className="blog-hero">
        <Image src={post.heroImage} alt={post.heroAlt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>

      <article className="blog-wrap blog-body">
        {post.body.map(renderBlock)}

        {/* FAQ */}
        <div className="faq">
          {post.faqs.map((f, i) => (
            <div className="faq-item" key={i}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        {/* CTA to the property */}
        {property && (
          <aside className="blog-cta">
            <div>
              <span className="kicker">The Residence</span>
              <h3>{property.name}</h3>
              <p>{property.range} · {property.loc}</p>
            </div>
            <Link href={`/${property.slug}`} className="blog-cta-btn">View the residence →</Link>
          </aside>
        )}

        <p className="blog-back"><Link href="/blog">← Back to the Journal</Link> · <Link href="/#collection">Browse the collection</Link></p>
      </article>

      {/* blog-to-blog cross-links (topic cluster) */}
      <section className="blog-more">
        <div className="blog-wrap">
          <h2>More from the Journal</h2>
          <div className="blog-more-grid">
            {(() => {
              const idx = POSTS.findIndex((p) => p.slug === slug);
              return [1, 2, 3].map((o) => POSTS[(idx + o) % POSTS.length]);
            })().map((m) => (
              <Link href={`/blog/${m.slug}`} className="more-card" key={m.slug}>
                <div className="more-media">
                  <Image src={m.heroImage} alt={m.heroAlt} fill sizes="(max-width:760px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <span className="kicker">{m.category}</span>
                <h3>{m.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
