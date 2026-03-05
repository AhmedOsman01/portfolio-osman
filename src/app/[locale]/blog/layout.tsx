import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? 'المدونة' : 'Blog',
        description: isAr
            ? 'مقالات وشروحات في تطوير الويب والأتمتة والذكاء الاصطناعي'
            : 'Articles and tutorials on web development, automation, and AI',
        openGraph: {
            title: isAr ? 'مدونة احمد عثمان' : 'Ahmed Osman — Blog',
            description: isAr
                ? 'مقالات تقنية في Next.js، n8n، وOpenAI'
                : 'Tech articles on Next.js, n8n, and OpenAI',
            type: 'website',
        },
    };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
