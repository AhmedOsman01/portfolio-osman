'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
    {
        name: { ar: 'أحمد العلي', en: 'Ahmed Al-Ali' },
        role: { ar: 'مدير تقني', en: 'CTO' },
        company: { ar: 'شركة تقنية', en: 'Tech Company' },
        content: {
            ar: 'عمل احترافي ممتاز. تم تسليم المشروع في الوقت المحدد وبجودة عالية. أنصح بالتعامل معه بشدة.',
            en: 'Excellent professional work. The project was delivered on time with high quality. Highly recommended.',
        },
        rating: 5,
    },
    {
        name: { ar: 'سارة محمد', en: 'Sarah Mohammed' },
        role: { ar: 'مؤسسة شركة', en: 'Startup Founder' },
        company: { ar: 'شركة ناشئة', en: 'Startup Inc.' },
        content: {
            ar: 'ساعدنا في أتمتة عمليات التسويق بالكامل. وفرنا أكثر من 20 ساعة أسبوعياً بفضل حلوله الذكية.',
            en: 'Helped us fully automate our marketing operations. We saved over 20 hours per week thanks to their smart solutions.',
        },
        rating: 5,
    },
    {
        name: { ar: 'خالد الراشدي', en: 'Khalid Al-Rashidi' },
        role: { ar: 'مدير مشاريع', en: 'Project Manager' },
        company: { ar: 'وكالة رقمية', en: 'Digital Agency' },
        content: {
            ar: 'من أفضل المطورين الذين تعاملت معهم. فهم ممتاز للمتطلبات وتنفيذ سريع ودقيق.',
            en: 'One of the best developers I have worked with. Excellent understanding of requirements and fast, accurate execution.',
        },
        rating: 5,
    },
];

export default function Testimonials() {
    const t = useTranslations('testimonials');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <section className="py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                {/* Header */}
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

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <Card className="h-full hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 relative">
                                <CardContent className="p-6 space-y-4">
                                    <Quote className="w-8 h-8 text-primary/20 absolute top-4 end-4" />

                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {Array.from({ length: item.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {isRTL ? item.content.ar : item.content.en}
                                    </p>

                                    {/* Author */}
                                    <div className="pt-2 border-t border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center text-white font-bold text-sm">
                                                {(isRTL ? item.name.ar : item.name.en).charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">
                                                    {isRTL ? item.name.ar : item.name.en}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {isRTL ? item.role.ar : item.role.en} •{' '}
                                                    {isRTL ? item.company.ar : item.company.en}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
