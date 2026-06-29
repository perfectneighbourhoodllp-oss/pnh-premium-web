import type { MetadataRoute } from 'next';
import { PROPERTIES } from '@/lib/properties';
import { POSTS } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const home = { url: `${SITE_URL}/`, changeFrequency: 'weekly' as const, priority: 1 };
  const pages = PROPERTIES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  const blogIndex = { url: `${SITE_URL}/blog`, changeFrequency: 'weekly' as const, priority: 0.7 };
  const posts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [home, ...pages, blogIndex, ...posts];
}
