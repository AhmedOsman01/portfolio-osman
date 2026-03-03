import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../globals.css";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === "ar";

    return {
        title: {
            template: isArabic ? "%s | محمد - مطور ويب" : "%s | Mohammed - Web Developer",
            default: isArabic
                ? "محمد - مطور تطبيقات ويب متكامل"
                : "Mohammed - Full Stack Web Developer",
        },
        description: isArabic
            ? "مطور تطبيقات ويب متكامل متخصص في Next.js و MongoDB والأتمتة والذكاء الاصطناعي"
            : "Full Stack Web Developer specialized in Next.js, MongoDB, Automation, and AI",
        keywords: isArabic
            ? ["مطور ويب", "Next.js", "مطور Full Stack", "أتمتة", "ذكاء اصطناعي", "n8n"]
            : ["web developer", "Next.js", "full stack developer", "automation", "AI", "n8n"],
        openGraph: {
            type: "website",
            locale: isArabic ? "ar_SA" : "en_US",
            siteName: isArabic ? "محمد - مطور ويب" : "Mohammed - Web Developer",
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const isRTL = locale === "ar";

    return (
        <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
            <body
                className={`${isRTL ? "font-[Cairo]" : "font-[Inter]"} antialiased min-h-screen flex flex-col`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider messages={messages}>
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <Toaster position={isRTL ? "bottom-left" : "bottom-right"} />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
