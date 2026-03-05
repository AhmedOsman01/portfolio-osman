import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://ahmedosman.dev';
  const locales = ['ar', 'en'];

  // Static pages
  const staticRoutes = ['', '/about', '/projects', '/blog', '/contact'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/blog' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : route === '/projects' || route === '/blog' ? 0.9 : 0.7,
      });
    }
  }

  // Dynamic blog post routes
  try {
    const res = await fetch(`${baseUrl}/api/posts?limit=100&status=published`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      for (const post of data.posts || []) {
        for (const locale of locales) {
          entries.push({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: new Date(post.publishedAt || Date.now()),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    }
  } catch {
    // Skip dynamic blog entries if fetch fails
  }

  return entries;
}
