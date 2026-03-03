'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/routing';
import ShareButtons from '@/components/blog/ShareButtons';
import { useParams } from 'next/navigation';

interface Post {
    _id: string;
    title: { ar: string; en: string };
    slug: string;
    content: { ar: string; en: string };
    excerpt: { ar: string; en: string };
    tags: string[];
    category: string;
    coverImage: string;
    author: string;
    publishedAt: string;
    readingTime: number;
    views: number;
    seoTitle: { ar: string; en: string };
    seoDescription: { ar: string; en: string };
}

export default function BlogPostPage() {
    const t = useTranslations('blog');
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const params = useParams();
    const slug = params.slug as string;

    const [post, setPost] = useState<Post | null>(null);
    const [related, setRelated] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data.post);
                    setRelated(data.related || []);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-24 pb-16 text-center">
                <p className="text-2xl mb-2">🔍</p>
                <p className="text-muted-foreground">Post not found</p>
                <Link href="/blog" className="text-primary mt-4 inline-block hover:underline">
                    ← {t('allPosts')}
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString(
        isRTL ? 'ar-SA' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4">
                <article className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href="/blog"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                        >
                            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                            {t('allPosts')}
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 mb-8"
                    >
                        <Badge className="gradient-btn text-white border-0">
                            {post.category}
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                            {isRTL ? post.title.ar : post.title.en}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {formattedDate}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readingTime} {isRTL ? 'دقائق للقراءة' : 'min read'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Eye className="w-4 h-4" />
                                {post.views} {isRTL ? 'مشاهدة' : 'views'}
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Share */}
                        <ShareButtons
                            url={`/blog/${post.slug}`}
                            title={isRTL ? post.title.ar : post.title.en}
                            compact={false}
                        />
                    </motion.div>

                    <Separator className="mb-8" />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: (isRTL ? post.content.ar : post.content.en).replace(/\n/g, '<br />'),
                            }}
                        />
                    </motion.div>

                    <Separator className="mb-8" />

                    {/* Share bottom */}
                    <div className="flex items-center justify-between mb-12">
                        <span className="text-sm font-medium">{t('share')}</span>
                        <ShareButtons
                            url={`/blog/${post.slug}`}
                            title={isRTL ? post.title.ar : post.title.en}
                            compact={false}
                        />
                    </div>

                    {/* Related Posts */}
                    {related.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold mb-6">{t('relatedPosts')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {related.map((relatedPost) => (
                                    <Link key={relatedPost._id} href={`/blog/${relatedPost.slug}`}>
                                        <Card className="hover:border-primary/30 transition-all h-full">
                                            <CardContent className="p-4 space-y-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {relatedPost.category}
                                                </Badge>
                                                <h4 className="font-semibold text-sm line-clamp-2">
                                                    {isRTL ? relatedPost.title.ar : relatedPost.title.en}
                                                </h4>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {isRTL ? relatedPost.excerpt.ar : relatedPost.excerpt.en}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
}
