'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
    FileText,
    MessageSquare,
    Users,
    Eye,
    TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Stats {
    posts: number;
    contacts: number;
    subscribers: number;
    views: number;
}

export default function AdminDashboard() {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [stats, setStats] = useState<Stats>({ posts: 0, contacts: 0, subscribers: 0, views: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            // Placeholder stats - in production these would come from API
            setStats({ posts: 12, contacts: 45, subscribers: 230, views: 1520 });
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            icon: FileText,
            label: isRTL ? 'المقالات' : 'Posts',
            value: stats.posts,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
        },
        {
            icon: MessageSquare,
            label: isRTL ? 'الرسائل' : 'Messages',
            value: stats.contacts,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
        },
        {
            icon: Users,
            label: isRTL ? 'المشتركين' : 'Subscribers',
            value: stats.subscribers,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
        },
        {
            icon: Eye,
            label: isRTL ? 'المشاهدات' : 'Total Views',
            value: stats.views,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">
                    {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    {isRTL ? 'نظرة عامة على بيانات الموقع' : 'Overview of your site data'}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="hover:border-primary/20 transition-colors">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                </div>
                                <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                        {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <a href={`/${locale}/admin/posts`}>
                            <Card className="hover:border-primary/30 transition-all cursor-pointer hover:shadow-md">
                                <CardContent className="p-4 text-center">
                                    <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
                                    <p className="text-sm font-medium">
                                        {isRTL ? 'إدارة المقالات' : 'Manage Posts'}
                                    </p>
                                </CardContent>
                            </Card>
                        </a>
                        <a href={`/${locale}/admin/contacts`}>
                            <Card className="hover:border-primary/30 transition-all cursor-pointer hover:shadow-md">
                                <CardContent className="p-4 text-center">
                                    <MessageSquare className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                                    <p className="text-sm font-medium">
                                        {isRTL ? 'عرض الرسائل' : 'View Messages'}
                                    </p>
                                </CardContent>
                            </Card>
                        </a>
                        <a href={`/${locale}/admin/subscribers`}>
                            <Card className="hover:border-primary/30 transition-all cursor-pointer hover:shadow-md">
                                <CardContent className="p-4 text-center">
                                    <Users className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                                    <p className="text-sm font-medium">
                                        {isRTL ? 'المشتركين' : 'Subscribers'}
                                    </p>
                                </CardContent>
                            </Card>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
