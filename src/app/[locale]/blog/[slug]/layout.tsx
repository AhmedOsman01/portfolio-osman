import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const isAr = locale === 'ar';

    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'https://ahmedosman.dev';
        const res = await fetch(`${baseUrl}/api/posts/${slug}`, { next: { revalidate: 3600 } });
        if (res.ok) {
            const data = await res.json();
            const post = data.post;
            if (post) {
                const title = isAr ? post.title?.ar : post.title?.en;
                const description = isAr ? post.excerpt?.ar : post.excerpt?.en;
                return {
                    title,
                    description,
                    openGraph: {
                        title,
                        description,
                        type: 'article',
                        publishedTime: post.publishedAt,
                        images: post.coverImage ? [{ url: post.coverImage }] : [],
                    },
                };
            }
        }
    } catch {
        // fallback below
    }

    return {
        title: isAr ? 'مقال' : 'Article',
        description: isAr ? 'مقال تقني من مدونة احمد عثمان' : 'Tech article from Ahmed Osman blog',
    };
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
