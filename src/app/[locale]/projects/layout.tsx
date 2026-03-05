import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';
    return {
        title: isAr ? 'مشاريعي' : 'My Projects',
        description: isAr
            ? 'استعرض مجموعة مشاريعي في تطوير الويب والأتمتة والذكاء الاصطناعي'
            : 'Explore my portfolio of web development, automation, and AI projects',
        openGraph: {
            title: isAr ? 'مشاريعي | احمد عثمان' : 'My Projects | Ahmed Osman',
            description: isAr
                ? 'مشاريع ويب، أتمتة، وذكاء اصطناعي'
                : 'Web, automation, and AI projects',
            type: 'website',
        },
    };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
