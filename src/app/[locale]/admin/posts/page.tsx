'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Post {
    _id: string;
    title: { ar: string; en: string };
    slug: string;
    status: string;
    category: string;
    views: number;
    publishedAt: string;
}

export default function AdminPostsPage() {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/posts?status=&limit=50');
                const data = await res.json();
                setPosts(data.posts || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (slug: string) => {
        if (!confirm(isRTL ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return;
        try {
            await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
            setPosts(posts.filter((p) => p.slug !== slug));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{isRTL ? 'المقالات' : 'Posts'}</h1>
                <Button className="gradient-btn text-white border-0 gap-2">
                    <Plus className="w-4 h-4" />
                    {isRTL ? 'مقال جديد' : 'New Post'}
                </Button>
            </div>

            {loading ? (
                <p className="text-muted-foreground">{isRTL ? 'جارٍ التحميل...' : 'Loading...'}</p>
            ) : posts.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                        {isRTL ? 'لا توجد مقالات بعد' : 'No posts yet'}
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="hover:border-primary/20 transition-colors">
                                <CardContent className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate">
                                            {isRTL ? post.title.ar : post.title.en}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                                                {post.status === 'published' ? (isRTL ? 'منشور' : 'Published') : (isRTL ? 'مسودة' : 'Draft')}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">{post.category}</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> {post.views}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(post.slug)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
