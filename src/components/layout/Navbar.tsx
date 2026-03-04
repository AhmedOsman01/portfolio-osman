'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import {
    Moon,
    Sun,
    Menu,
    Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
    { href: '/', key: 'home', hash: '' },
    { href: '/#about', key: 'about', hash: 'about' },
    { href: '/#projects', key: 'projects', hash: 'projects' },
    { href: '/blog', key: 'blog', hash: '' },
    { href: '/#contact', key: 'contact', hash: 'contact' },
] as const;

export default function Navbar() {
    const t = useTranslations('nav');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const isRTL = locale === 'ar';

    const switchLocale = (newLocale: 'ar' | 'en') => {
        router.replace(pathname, { locale: newLocale });
    };

    // Track active section via scroll position on home page
    useEffect(() => {
        if (pathname !== '/') {
            return;
        }

        const sections = ['contact', 'projects', 'about'];

        const handleScroll = () => {
            const scrollY = window.scrollY + 100;

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && scrollY >= el.offsetTop) {
                    setActiveSection(id);
                    return;
                }
            }
            setActiveSection('');
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const isActive = (link: typeof navLinks[number]) => {
        // Blog page or other sub-pages
        if (link.href === '/blog' && pathname.startsWith('/blog')) return true;
        // Home page with hash sections
        if (pathname === '/') {
            if (link.hash && activeSection === link.hash) return true;
            if (!link.hash && link.href === '/' && !activeSection) return true;
        }
        return false;
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 glass"
        >
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors">
                        <NextImage
                            src="/profile.jpg"
                            alt={isRTL ? 'احمد عثمان' : 'Ahmed Osman'}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="40px"
                        />
                    </div>
                    <span className="text-lg font-bold gradient-text">
                        {isRTL ? 'احمد عثمان' : 'Ahmed Osman'}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${isActive(link)
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground'
                                }`}
                        >
                            {t(link.key)}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Globe className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
                            <DropdownMenuItem
                                onClick={() => switchLocale('ar')}
                                className={locale === 'ar' ? 'bg-accent' : ''}
                            >
                                🇸🇦 العربية
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => switchLocale('en')}
                                className={locale === 'en' ? 'bg-accent' : ''}
                            >
                                🇺🇸 English
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={isRTL ? 'right' : 'left'} className="w-72">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-4 mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg relative overflow-hidden border-2 border-primary/20">
                                        <NextImage
                                            src="/profile.jpg"
                                            alt={isRTL ? 'احمد عثمان' : 'Ahmed Osman'}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                            sizes="40px"
                                        />
                                    </div>
                                    <span className="text-lg font-bold gradient-text">
                                        {isRTL ? 'احمد عثمان' : 'Ahmed Osman'}
                                    </span>
                                </div>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.key}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-accent ${isActive(link)
                                            ? 'bg-accent text-accent-foreground'
                                            : 'text-muted-foreground'
                                            }`}
                                    >
                                        {t(link.key)}
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </motion.header>
    );
}
