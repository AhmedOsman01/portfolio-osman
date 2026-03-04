'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Category = 'all' | 'web-app' | 'automation' | 'ai' | 'saas';

const sampleProjects = [
    {
        id: '1',
        title: { ar: 'منصة إدارة المشاريع', en: 'Project Management Platform' },
        description: {
            ar: 'منصة SaaS متكاملة لإدارة المشاريع والمهام مع لوحة تحكم تفاعلية وتقارير متقدمة',
            en: 'Full-featured SaaS platform for project and task management with interactive dashboard and advanced reporting',
        },
        icon: '📊',
        gradient: 'from-blue-600/40 via-indigo-600/30 to-purple-700/40',
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
        icon: '⚙️',
        gradient: 'from-emerald-600/40 via-teal-600/30 to-cyan-700/40',
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
        icon: '🤖',
        gradient: 'from-pink-600/40 via-rose-600/30 to-purple-700/40',
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
        icon: '🛒',
        gradient: 'from-orange-600/40 via-amber-600/30 to-yellow-700/40',
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
        icon: '📈',
        gradient: 'from-cyan-600/40 via-sky-600/30 to-blue-700/40',
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
        icon: '✨',
        gradient: 'from-violet-600/40 via-purple-600/30 to-fuchsia-700/40',
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

    const filteredProjects =
        activeCategory === 'all'
            ? sampleProjects
            : sampleProjects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="py-24 bg-secondary/30">
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
                                    {/* Image — unique gradient + icon */}
                                    <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                                        {/* Grid pattern overlay */}
                                        <div className="absolute inset-0 opacity-20" style={{
                                            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                            backgroundSize: '20px 20px',
                                        }} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-6xl group-hover:scale-125 transition-transform duration-500 drop-shadow-lg select-none">
                                                {project.icon}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="flex gap-3">
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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
        </section>
    );
}
