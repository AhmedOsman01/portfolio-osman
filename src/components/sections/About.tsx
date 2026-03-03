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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <Card className="glass border-primary/10">
                        <CardContent className="p-6 sm:p-8">
                            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                                {t('bio')}
                            </p>
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
                        <div className={`absolute top-0 bottom-0 ${isRTL ? 'right-6' : 'left-6'} w-px bg-border`} />

                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
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
