'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Bot, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';

const techStack = [
    { name: 'Next.js', color: 'bg-black dark:bg-white dark:text-black text-white' },
    { name: 'TypeScript', color: 'bg-blue-600 text-white' },
    { name: 'MongoDB', color: 'bg-green-600 text-white' },
    { name: 'n8n', color: 'bg-orange-500 text-white' },
    { name: 'React', color: 'bg-cyan-500 text-white' },
    { name: 'Node.js', color: 'bg-emerald-600 text-white' },
    { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
    { name: 'AI / OpenAI', color: 'bg-purple-600 text-white' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
    const t = useTranslations('hero');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background */}
            <div className="absolute inset-0 bg-grid-pattern" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center space-y-8"
                >
                    {/* Tagline */}
                    <motion.div variants={itemVariants}>
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gap-2 animate-pulse-glow">
                            <Sparkles className="w-4 h-4" />
                            {isRTL ? 'متاح للعمل الحر' : 'Available for Freelance'}
                        </Badge>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                    >
                        <span className="gradient-text">{t('title')}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground flex items-center justify-center gap-3"
                    >
                        <Zap className="w-6 h-6 text-yellow-500" />
                        {t('subtitle')}
                        <Bot className="w-6 h-6 text-primary" />
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('description')}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/#projects">
                            <Button size="lg" className="gradient-btn text-white border-0 px-8 h-12 text-base gap-2">
                                <Code2 className="w-5 h-5" />
                                {t('viewProjects')}
                            </Button>
                        </Link>
                        <Link href="/#contact">
                            <Button size="lg" variant="outline" className="px-8 h-12 text-base gap-2 border-primary/30 hover:bg-primary/10">
                                {t('contactMe')}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Tech Stack Badges */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center gap-3 pt-4"
                    >
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.1, y: -3 }}
                            >
                                <Badge className={`${tech.color} px-3 py-1.5 text-xs font-medium cursor-default border-0`}>
                                    {tech.name}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ArrowDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
