'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Link } from '@/i18n/routing';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Layers,
    Users,
    LogOut,
    Code2,
    Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const sidebarItems = [
    { icon: LayoutDashboard, href: '/admin', labelAr: 'لوحة التحكم', labelEn: 'Dashboard' },
    { icon: FileText, href: '/admin/posts', labelAr: 'المقالات', labelEn: 'Posts' },
    { icon: MessageSquare, href: '/admin/contacts', labelAr: 'الرسائل', labelEn: 'Messages' },
    { icon: Layers, href: '/admin/projects', labelAr: 'المشاريع', labelEn: 'Projects' },
    { icon: Users, href: '/admin/subscribers', labelAr: 'المشتركين', labelEn: 'Subscribers' },
];

function AdminContent({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const locale = useLocale();
    const isRTL = locale === 'ar';

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/${locale}/admin/login`);
        }
    }, [status, router, locale]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen flex pt-16">
            {/* Sidebar */}
            <aside className={`w-64 bg-card border-e border-border fixed top-16 bottom-0 ${isRTL ? 'right-0' : 'left-0'} overflow-y-auto hidden md:block`}>
                <div className="p-4 space-y-1">
                    <div className="flex items-center gap-2 px-3 py-2 mb-2">
                        <Code2 className="w-5 h-5 text-primary" />
                        <span className="font-bold text-sm gradient-text">
                            {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
                        </span>
                    </div>

                    <Separator className="mb-2" />

                    {sidebarItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 h-10 text-sm"
                            >
                                <item.icon className="w-4 h-4" />
                                {isRTL ? item.labelAr : item.labelEn}
                            </Button>
                        </Link>
                    ))}

                    <Separator className="my-2" />

                    <Link href="/">
                        <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-sm">
                            <Home className="w-4 h-4" />
                            {isRTL ? 'العودة للموقع' : 'Back to Site'}
                        </Button>
                    </Link>

                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 h-10 text-sm text-destructive hover:text-destructive"
                        onClick={() => signOut({ callbackUrl: `/${locale}` })}
                    >
                        <LogOut className="w-4 h-4" />
                        {isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className={`flex-1 ${isRTL ? 'md:mr-64' : 'md:ml-64'} p-6`}>
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <AdminContent>{children}</AdminContent>
        </SessionProvider>
    );
}
