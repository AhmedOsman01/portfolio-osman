'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
    Code,
    Server,
    Database,
    Workflow,
    Brain,
    GraduationCap,
    Briefcase,
    Download,
    MapPin,
    CheckCircle2,
    Languages,
    Rocket,
    Coffee,
    Users,
    FolderGit2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const skillCategories = [
    {
        key: 'frontend',
        icon: Code,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
    },
    {
        key: 'backend',
        icon: Server,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets', 'Serverless'],
    },
    {
        key: 'databases',
        icon: Database,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        skills: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Redis', 'Firebase', 'Prisma'],
    },
    {
        key: 'automation',
        icon: Workflow,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        skills: ['n8n', 'Zapier', 'Webhooks', 'Cron Jobs', 'CI/CD', 'Docker'],
    },
    {
        key: 'ai',
        icon: Brain,
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
        skills: ['OpenAI API', 'LangChain', 'RAG', 'Prompt Engineering', 'AI Agents', 'Vector DBs'],
    },
];

const timeline = [
    {
        year: '2023 - Present',
        yearAr: '2023 - الحالي',
        title: 'Senior Full Stack Developer',
        titleAr: 'مطور Full Stack أول',
        company: 'Freelance',
        companyAr: 'عمل حر',
        type: 'work' as const,
    },
    {
        year: '2021 - 2023',
        yearAr: '2021 - 2023',
        title: 'Full Stack Developer',
        titleAr: 'مطور Full Stack',
        company: 'Tech Company',
        companyAr: 'شركة تقنية',
        type: 'work' as const,
    },
    {
        year: '2019 - 2021',
        yearAr: '2019 - 2021',
        title: 'Frontend Developer',
        titleAr: 'مطور واجهات أمامية',
        company: 'Startup',
        companyAr: 'شركة ناشئة',
        type: 'work' as const,
    },
    {
        year: '2015 - 2019',
        yearAr: '2015 - 2019',
        title: 'Computer Science Degree',
        titleAr: 'بكالوريوس علوم حاسب',
        company: 'University',
        companyAr: 'الجامعة',
        type: 'education' as const,
    },
];

const stats = [
    { icon: FolderGit2, valueEn: '50+', valueAr: '+50', labelEn: 'Projects', labelAr: 'مشروع', color: 'text-blue-500' },
    { icon: Users, valueEn: '30+', valueAr: '+30', labelEn: 'Clients', labelAr: 'عميل', color: 'text-emerald-500' },
    { icon: Coffee, valueEn: '5+', valueAr: '+5', labelEn: 'Years Exp', labelAr: 'سنوات خبرة', color: 'text-orange-500' },
    { icon: Rocket, valueEn: '100+', valueAr: '+100', labelEn: 'Automations', labelAr: 'أتمتة', color: 'text-purple-500' },
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
    const t = useTranslations('about');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* ─── Creative Profile Section ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <Card className="overflow-hidden border-primary/10 relative">
                        {/* Decorative gradient blobs */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                        <CardContent className="p-0 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                                {/* Left — Avatar & Stats */}
                                <div className="lg:col-span-2 flex flex-col items-center justify-center p-8 sm:p-10 bg-gradient-to-b from-primary/5 to-purple-500/5 border-b lg:border-b-0 lg:border-e border-border">
                                    {/* Glowing Avatar Ring */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="relative mb-6"
                                    >
                                        {/* Animated ring */}
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
                                        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-card flex items-center justify-center overflow-hidden border-4 border-card">
                                            {/* Replace src below with owner's photo */}
                                            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 flex items-center justify-center">
                                                <span className="text-5xl sm:text-6xl font-bold gradient-text select-none">
                                                    {isRTL ? 'أ' : 'A'}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Online indicator */}
                                        <div className="absolute bottom-2 end-2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-card animate-pulse" />
                                    </motion.div>

                                    {/* Name */}
                                    <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-1">
                                        {isRTL ? 'احمد عثمان' : 'Ahmed Osman'}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        {isRTL ? 'مطور Full Stack | خبير أتمتة' : 'Full Stack Dev | Automation Expert'}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                        {stats.map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                className="bg-card/80 rounded-xl p-3 text-center border border-border hover:border-primary/20 transition-colors"
                                            >
                                                <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                                                <p className="text-lg font-bold">{isRTL ? stat.valueAr : stat.valueEn}</p>
                                                <p className="text-[10px] text-muted-foreground">{isRTL ? stat.labelAr : stat.labelEn}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right — Bio + Info */}
                                <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center">
                                    {/* Bio */}
                                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-6">
                                        {t('bio')}
                                    </p>

                                    {/* Quick Facts */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-secondary/50">
                                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                                    {isRTL ? 'الموقع' : 'Location'}
                                                </p>
                                                <p className="text-sm font-medium">{isRTL ? 'مصر' : 'Egypt'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-secondary/50">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                                    {isRTL ? 'الحالة' : 'Status'}
                                                </p>
                                                <p className="text-sm font-medium text-emerald-500">{isRTL ? 'متاح للعمل' : 'Available'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5 p-3 rounded-lg bg-secondary/50">
                                            <Languages className="w-4 h-4 text-blue-500 shrink-0" />
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                                    {isRTL ? 'اللغات' : 'Languages'}
                                                </p>
                                                <p className="text-sm font-medium">{isRTL ? 'عربي • إنجليزي' : 'Arabic • English'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex flex-wrap gap-3">
                                        <Button className="gradient-btn text-white border-0 gap-2 h-10 px-6">
                                            <Download className="w-4 h-4" />
                                            {isRTL ? 'تحميل السيرة الذاتية' : 'Download CV'}
                                        </Button>
                                        <a href="#contact">
                                            <Button variant="outline" className="gap-2 h-10 px-6 border-primary/30 hover:bg-primary/10">
                                                {isRTL ? 'تواصل معي' : 'Contact Me'}
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-2xl font-bold text-center mb-8">{t('skills')}</h3>
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                    >
                        {skillCategories.map((category) => (
                            <motion.div key={category.key} variants={cardVariants}>
                                <Card className="h-full hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                                    <CardContent className="p-5 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <category.icon className={`w-5 h-5 ${category.color}`} />
                                            </div>
                                            <h4 className="font-semibold text-sm">
                                                {t(category.key)}
                                            </h4>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {category.skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="secondary"
                                                    className="text-xs px-2 py-0.5"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-center mb-8">
                        {t('experience')}
                    </h3>
                    <div className="max-w-2xl mx-auto relative">
                        {/* Timeline line */}
                        <div className="absolute top-0 bottom-0 start-6 w-px bg-border" />

                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex gap-4"
                                >
                                    <div className="relative z-10 shrink-0">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.type === 'work'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-emerald-500/10 text-emerald-500'
                                            }`}>
                                            {item.type === 'work' ? (
                                                <Briefcase className="w-5 h-5" />
                                            ) : (
                                                <GraduationCap className="w-5 h-5" />
                                            )}
                                        </div>
                                    </div>
                                    <Card className="flex-1 hover:border-primary/20 transition-colors">
                                        <CardContent className="p-4">
                                            <p className="text-xs text-muted-foreground mb-1">
                                                {isRTL ? item.yearAr : item.year}
                                            </p>
                                            <h4 className="font-semibold text-sm">
                                                {isRTL ? item.titleAr : item.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                {isRTL ? item.companyAr : item.company}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
