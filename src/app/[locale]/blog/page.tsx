'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import BlogCard from '@/components/blog/BlogCard';

interface Post {
    _id: string;
    title: { ar: string; en: string };
    slug: string;
    excerpt: { ar: string; en: string };
    tags: string[];
    category: string;
    coverImage: string;
    publishedAt: string;
    readingTime: number;
    views: number;
}

const categories = ['all', 'development', 'automation', 'ai', 'tutorials', 'tips'];

export default function BlogPage() {
    const t = useTranslations('blog');
    const locale = useLocale();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPosts();
    }, [page, activeCategory, search]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '9',
                ...(search && { search }),
                ...(activeCategory !== 'all' && { category: activeCategory }),
            });

            const res = await fetch(`/api/posts?${params}`);
            const data = await res.json();

            setPosts(data.posts || []);
            setTotalPages(data.pagination?.totalPages || 1);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-4"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text">
                        {t('title')}
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-10 space-y-4"
                >
                    <div className="relative">
                        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t('search')}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="ps-10 h-11"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeCategory === cat ? 'default' : 'outline'}
                                size="sm"
                                className={`rounded-full px-4 h-8 ${activeCategory === cat
                                        ? 'gradient-btn text-white border-0'
                                        : 'hover:border-primary/50'
                                    }`}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    setPage(1);
                                }}
                            >
                                {cat === 'all' ? t('allPosts') : cat}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-48 w-full rounded-lg" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, i) => (
                            <BlogCard key={post._id} post={post} index={i} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-2xl mb-2">📝</p>
                        <p className="text-muted-foreground">{t('noResults')}</p>
                    </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            {locale === 'ar' ? 'السابق' : 'Previous'}
                        </Button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <Button
                                key={i}
                                variant={page === i + 1 ? 'default' : 'outline'}
                                size="sm"
                                className={page === i + 1 ? 'gradient-btn text-white border-0' : ''}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            {locale === 'ar' ? 'التالي' : 'Next'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
