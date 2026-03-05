'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface Project {
    _id: string;
    title: { ar: string; en: string };
    description: { ar: string; en: string };
    image: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    category: 'web-app' | 'automation' | 'ai' | 'saas';
    order: number;
    featured: boolean;
}

interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const PROJECTS_PER_PAGE = 6;

const categories = [
    { key: 'all', en: 'All Projects', ar: 'جميع المشاريع' },
    { key: 'web-app', en: 'Web Apps', ar: 'تطبيقات ويب' },
    { key: 'saas', en: 'SaaS', ar: 'SaaS' },
    { key: 'automation', en: 'Automation', ar: 'أتمتة' },
    { key: 'ai', en: 'AI', ar: 'ذكاء اصطناعي' },
];

const categoryColors: Record<string, string> = {
    'web-app': 'text-cyan-500 bg-cyan-500/10',
    saas: 'text-violet-500 bg-violet-500/10',
    automation: 'text-orange-500 bg-orange-500/10',
    ai: 'text-pink-500 bg-pink-500/10',
};

function ProjectCardSkeleton() {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <Skeleton className="h-52 w-full" />
            <CardContent className="p-5 space-y-3 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 pt-1">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProjectsPage() {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const [projects, setProjects] = useState<Project[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: PROJECTS_PER_PAGE, total: 0, totalPages: 1 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<'live' | 'code'>('live');

    const isPlaceholder = (url: string) =>
        !url ||
        url === '#' ||
        url.includes('example.com') ||
        url.includes('github.com/example');

    const handleLink = (e: React.MouseEvent<HTMLElement>, url: string, type: 'live' | 'code') => {
        if (isPlaceholder(url)) {
            e.preventDefault();
            setAlertType(type);
            setShowAlert(true);
        }
        // If real URL, the anchor proceeds normally
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: PROJECTS_PER_PAGE.toString(),
                ...(debouncedSearch && { search: debouncedSearch }),
                ...(activeCategory !== 'all' && { category: activeCategory }),
            });
            const res = await fetch(`/api/projects?${params}`);
            if (res.ok) {
                const data = await res.json();
                setProjects(data.projects || []);
                setPagination(data.pagination);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedSearch, activeCategory]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleCategoryChange = (key: string) => {
        setActiveCategory(key);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen pt-24 pb-20">

            {/* Not-available Alert Dialog */}
            <Dialog open={showAlert} onOpenChange={setShowAlert}>
                <DialogContent className="max-w-sm text-center">
                    <button
                        onClick={() => setShowAlert(false)}
                        className="absolute top-3 end-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <DialogHeader className="items-center">
                        <div className="text-5xl mb-3">🚧</div>
                        <DialogTitle className="text-xl font-bold">
                            {isRTL ? 'عذراً، الصفحة غير متاحة بعد' : 'Coming Soon!'}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
                            {alertType === 'live'
                                ? (isRTL
                                    ? 'نأسف، هذا المشروع لا يزال قيد التطوير ولم يُنشر بعد. 🙏\nشكراً لصبرك — سيكون متاحاً قريباً!'
                                    : "We're sorry, this project is still under development and hasn't been deployed yet. 🙏\nThank you for your patience — it'll be live soon!")
                                : (isRTL
                                    ? 'نأسف، هذا المستودع خاص أو لم يُنشر بعد. 🙏\nيمكنك التواصل معنا لمزيد من المعلومات.'
                                    : "We're sorry, this repository is private or not published yet. 🙏\nFeel free to contact us for more information.")}
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={() => setShowAlert(false)}
                        className="gradient-btn text-white border-0 mt-2 w-full"
                    >
                        {isRTL ? 'حسناً، شكراً!' : 'Got it, thanks!'}
                    </Button>
                </DialogContent>
            </Dialog>

            <div className="container mx-auto px-4 max-w-7xl">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="gradient-text">
                            {isRTL ? 'مشاريعي' : 'My Projects'}
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {isRTL
                            ? 'مجموعة من أعمالي ومشاريعي في تطوير الويب والأتمتة والذكاء الاصطناعي'
                            : 'A collection of my work in web development, automation, and artificial intelligence'}
                    </p>
                    {pagination.total > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                            {isRTL ? `${pagination.total} مشروع` : `${pagination.total} projects`}
                        </p>
                    )}
                </motion.div>

                {/* Search + Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
                        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={isRTL ? 'ابحث في المشاريع...' : 'Search projects...'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="ps-9"
                        />
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => handleCategoryChange(cat.key)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${activeCategory === cat.key
                                    ? 'gradient-btn text-white border-transparent shadow-lg shadow-primary/20'
                                    : 'bg-secondary/50 border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {isRTL ? cat.ar : cat.en}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {Array.from({ length: PROJECTS_PER_PAGE }).map((_, i) => (
                                <ProjectCardSkeleton key={i} />
                            ))}
                        </motion.div>
                    ) : projects.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-24"
                        >
                            <p className="text-6xl mb-4">🔍</p>
                            <p className="text-xl font-semibold mb-2">
                                {isRTL ? 'لا توجد مشاريع' : 'No projects found'}
                            </p>
                            <p className="text-muted-foreground">
                                {isRTL ? 'جرب تغيير الفلتر أو كلمة البحث' : 'Try changing the filter or search term'}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.07 }}
                                    className="group"
                                >
                                    <Card className="overflow-hidden h-full flex flex-col hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                                        {/* Image */}
                                        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={isRTL ? project.title.ar : project.title.en}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-5xl">🚀</span>
                                                </div>
                                            )}

                                            {/* Overlay on hover with links */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                                {project.githubUrl && (
                                                    <a
                                                        href={isPlaceholder(project.githubUrl) ? '#' : project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => handleLink(e, project.githubUrl, 'code')}
                                                        className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                                        title="GitHub"
                                                    >
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={isPlaceholder(project.liveUrl) ? '#' : project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => handleLink(e, project.liveUrl, 'live')}
                                                        className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                                        title="Live Demo"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>

                                            {/* Badges */}
                                            <div className="absolute top-3 start-3 flex gap-2">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[project.category] || 'text-primary bg-primary/10'}`}>
                                                    {project.category}
                                                </span>
                                                {project.featured && (
                                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-500 flex items-center gap-1">
                                                        <Star className="w-3 h-3" />
                                                        {isRTL ? 'مميز' : 'Featured'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <CardContent className="p-5 flex flex-col flex-1 space-y-3">
                                            <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                                                {isRTL ? project.title.ar : project.title.en}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                                                {isRTL ? project.description.ar : project.description.en}
                                            </p>

                                            {/* Tech stack */}
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {project.techStack.slice(0, 4).map((tech) => (
                                                    <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {project.techStack.length > 4 && (
                                                    <Badge variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
                                                        +{project.techStack.length - 4}
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 pt-2">
                                                {project.liveUrl && (
                                                    <a
                                                        href={isPlaceholder(project.liveUrl) ? '#' : project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => handleLink(e, project.liveUrl, 'live')}
                                                        className="flex-1"
                                                    >
                                                        <Button size="sm" className="w-full gradient-btn text-white border-0 gap-1.5 text-xs h-8">
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                            {isRTL ? 'عرض' : 'Live Demo'}
                                                        </Button>
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={isPlaceholder(project.githubUrl) ? '#' : project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => handleLink(e, project.githubUrl, 'code')}
                                                        className={project.liveUrl ? '' : 'flex-1'}
                                                    >
                                                        <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs h-8 border-border hover:border-primary/40">
                                                            <Github className="w-3.5 h-3.5" />
                                                            {isRTL ? 'الكود' : 'Code'}
                                                        </Button>
                                                    </a>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {!loading && pagination.totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-2 mt-12"
                    >
                        {/* Previous */}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="gap-1 h-9 px-3 border-border hover:border-primary/40 disabled:opacity-40"
                        >
                            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                            {isRTL ? 'السابق' : 'Prev'}
                        </Button>

                        {/* Page numbers */}
                        <div className="flex gap-1">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${pageNum === currentPage
                                        ? 'gradient-btn text-white shadow-lg shadow-primary/20'
                                        : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        {/* Next */}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === pagination.totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="gap-1 h-9 px-3 border-border hover:border-primary/40 disabled:opacity-40"
                        >
                            {isRTL ? 'التالي' : 'Next'}
                            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                    </motion.div>
                )}

                {/* Results info */}
                {!loading && projects.length > 0 && (
                    <p className="text-center text-xs text-muted-foreground mt-4">
                        {isRTL
                            ? `عرض ${(currentPage - 1) * PROJECTS_PER_PAGE + 1}–${Math.min(currentPage * PROJECTS_PER_PAGE, pagination.total)} من ${pagination.total} مشروع`
                            : `Showing ${(currentPage - 1) * PROJECTS_PER_PAGE + 1}–${Math.min(currentPage * PROJECTS_PER_PAGE, pagination.total)} of ${pagination.total} projects`}
                    </p>
                )}
            </div>
        </div>
    );
}
