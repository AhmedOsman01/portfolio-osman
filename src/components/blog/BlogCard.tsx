'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
import ShareButtons from './ShareButtons';

interface BlogCardProps {
    post: {
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
    };
    index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    const formattedDate = new Date(post.publishedAt).toLocaleDateString(
        isRTL ? 'ar-SA' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                {/* Image */}
                <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                        </div>
                        <div className="absolute top-3 start-3">
                            <Badge className="gradient-btn text-white border-0 text-xs">
                                {post.category}
                            </Badge>
                        </div>
                    </div>
                </Link>

                <CardContent className="p-5 flex flex-col flex-1 space-y-3">
                    {/* Title */}
                    <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors">
                            {isRTL ? post.title.ar : post.title.en}
                        </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {isRTL ? post.excerpt.ar : post.excerpt.en}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} {isRTL ? 'د' : 'min'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                        </span>
                    </div>

                    {/* Social Share */}
                    <ShareButtons
                        url={`/blog/${post.slug}`}
                        title={isRTL ? post.title.ar : post.title.en}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}
