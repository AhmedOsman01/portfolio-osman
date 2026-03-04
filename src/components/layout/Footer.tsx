'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    Send,
    Heart,
    ArrowUp,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter/X' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
];

const quickLinks = [
    { href: '/', key: 'home' },
    { href: '/#about', key: 'about' },
    { href: '/#projects', key: 'projects' },
    { href: '/blog', key: 'blog' },
    { href: '/#contact', key: 'contact' },
] as const;

export default function Footer() {
    const t = useTranslations();
    const locale = useLocale();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                toast.success(t('footer.subscribeSuccess'));
                setEmail('');
            } else {
                const data = await res.json();
                toast.error(data.error || t('common.error'));
            }
        } catch {
            toast.error(t('common.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-card border-t border-border">
            {/* Gradient top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold gradient-text">
                            {locale === 'ar' ? 'احمد عثمان' : 'Ahmed Osman'}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                                >
                                    <link.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            {t('footer.quickLinks')}
                        </h4>
                        <div className="flex flex-col gap-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {t(`nav.${link.key}`)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            {t('footer.newsletter')}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {t('footer.newsletterDesc')}
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                            <Input
                                type="email"
                                placeholder={t('footer.emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10 text-sm"
                                required
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10 shrink-0 gradient-btn text-white border-0"
                                disabled={isSubmitting}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        © {new Date().getFullYear()} Ahmed Osman.{' '}
                        {t('footer.rights')}.{' '}
                        <span className="inline-flex items-center gap-1">
                            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                        </span>
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={scrollToTop}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}
