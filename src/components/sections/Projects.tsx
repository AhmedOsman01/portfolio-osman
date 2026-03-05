'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePlaceholderAlert, PlaceholderAlertDialog, isPlaceholderUrl } from '@/hooks/usePlaceholderAlert';

type Category = 'all' | 'web-app' | 'automation' | 'ai' | 'saas';

const sampleProjects = [
    {
        id: '1',
        title: { ar: 'منصة إدارة المشاريع', en: 'Project Management Platform' },
        description: {
            ar: 'منصة SaaS متكاملة لإدارة المشاريع والمهام مع لوحة تحكم تفاعلية وتقارير متقدمة',
            en: 'Full-featured SaaS platform for project and task management with interactive dashboard and advanced reporting',
        },
        image: '/projects/project1.png',
        techStack: ['Next.js', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Socket.IO'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'saas' as Category,
    },
    {
        id: '2',
        title: { ar: 'نظام أتمتة التسويق', en: 'Marketing Automation System' },
        description: {
            ar: 'نظام أتمتة متكامل يربط بين CRM والبريد الإلكتروني ومنصات التواصل الاجتماعي عبر n8n',
            en: 'Comprehensive automation system connecting CRM, email, and social media platforms via n8n',
        },
        image: '/projects/project2.png',
        techStack: ['n8n', 'Node.js', 'MongoDB', 'REST APIs', 'Webhooks'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'automation' as Category,
    },
    {
        id: '3',
        title: { ar: 'مساعد ذكي بالذكاء الاصطناعي', en: 'AI-Powered Smart Assistant' },
        description: {
            ar: 'روبوت محادثة ذكي يستخدم OpenAI API مع قاعدة معرفية مخصصة ونظام RAG للإجابات الدقيقة',
            en: 'Intelligent chatbot using OpenAI API with custom knowledge base and RAG system for accurate responses',
        },
        image: '/projects/project3.png',
        techStack: ['OpenAI', 'LangChain', 'Next.js', 'Pinecone', 'TypeScript'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'ai' as Category,
    },
    {
        id: '4',
        title: { ar: 'متجر إلكتروني متقدم', en: 'Advanced E-Commerce Store' },
        description: {
            ar: 'متجر إلكتروني كامل مع نظام دفع متكامل وإدارة مخزون وأتمتة الشحن',
            en: 'Full e-commerce store with integrated payment system, inventory management, and shipping automation',
        },
        image: '/projects/project4.png',
        techStack: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'Redis'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'web-app' as Category,
    },
    {
        id: '5',
        title: { ar: 'لوحة تحليلات البيانات', en: 'Data Analytics Dashboard' },
        description: {
            ar: 'لوحة تحكم تفاعلية لتحليل البيانات وعرض التقارير مع رسوم بيانية متقدمة',
            en: 'Interactive dashboard for data analysis and reporting with advanced charts and visualizations',
        },
        image: '/projects/project5.png',
        techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'GraphQL'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'web-app' as Category,
    },
    {
        id: '6',
        title: { ar: 'نظام إدارة المحتوى بالذكاء الاصطناعي', en: 'AI Content Management System' },
        description: {
            ar: 'نظام CMS ذكي يستخدم الذكاء الاصطناعي لتوليد المحتوى وتحسين SEO تلقائياً',
            en: 'Smart CMS using AI for content generation and automatic SEO optimization',
        },
        image: '/projects/project6.png',
        techStack: ['Next.js', 'OpenAI', 'MongoDB', 'n8n', 'TypeScript'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'ai' as Category,
    },
];

const categories: { key: Category; labelKey: string }[] = [
    { key: 'all', labelKey: 'all' },
    { key: 'web-app', labelKey: 'webApp' },
    { key: 'automation', labelKey: 'automationCat' },
    { key: 'ai', labelKey: 'aiCat' },
    { key: 'saas', labelKey: 'saas' },
];

export default function Projects() {
    const t = useTranslations('projects');
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const { open, setOpen, type, handleLink } = usePlaceholderAlert();

    const filteredProjects =
        activeCategory === 'all'
            ? sampleProjects
            : sampleProjects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="py-24 bg-secondary/30">
            {/* Placeholder Alert Dialog */}
            <PlaceholderAlertDialog open={open} onClose={() => setOpen(false)} type={type} />
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 space-y-4"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {categories.map((cat) => (
                        <Button
                            key={cat.key}
                            variant={activeCategory === cat.key ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveCategory(cat.key)}
                            className={`rounded-full px-5 h-9 transition-all ${activeCategory === cat.key
                                ? 'gradient-btn text-white border-0'
                                : 'hover:border-primary/50'
                                }`}
                        >
                            {t(cat.labelKey)}
                        </Button>
                    ))}
                </motion.div>

                {/* Project Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                                    {/* Project Image */}
                                    <div className="relative h-48 overflow-hidden bg-secondary/50">
                                        <Image
                                            src={project.image}
                                            alt={isRTL ? project.title.ar : project.title.en}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="flex gap-3">
                                                <a
                                                    href={isPlaceholderUrl(project.githubUrl) ? '#' : project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => handleLink(e, project.githubUrl, 'code')}
                                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                                <a
                                                    href={isPlaceholderUrl(project.liveUrl) ? '#' : project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => handleLink(e, project.liveUrl, 'live')}
                                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-5 flex flex-col flex-1 space-y-3">
                                        <h3 className="font-bold text-lg">
                                            {isRTL ? project.title.ar : project.title.en}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                            {isRTL ? project.description.ar : project.description.en}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {project.techStack.map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="text-xs px-2 py-0.5"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* See All Projects CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mt-12"
            >
                <a href={`/${locale}/projects`}>
                    <Button
                        size="lg"
                        className="gradient-btn text-white border-0 gap-2 px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        {isRTL ? 'عرض جميع المشاريع' : 'See All Projects'}
                        {isRTL
                            ? <span className="text-lg">←</span>
                            : <span className="text-lg">→</span>
                        }
                    </Button>
                </a>
            </motion.div>
        </section>
    );
}
