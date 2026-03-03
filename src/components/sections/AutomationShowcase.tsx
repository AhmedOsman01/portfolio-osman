'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
    Workflow,
    Mail,
    MessageSquare,
    Share2,
    Database,
    Zap,
    ArrowRight,
    ArrowLeft,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const workflows = [
    {
        icon: Mail,
        title: { ar: 'أتمتة البريد الإلكتروني', en: 'Email Automation' },
        description: {
            ar: 'إرسال تلقائي للنشرات البريدية والمتابعات بناءً على سلوك المستخدم',
            en: 'Automatic sending of newsletters and follow-ups based on user behavior',
        },
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        icon: MessageSquare,
        title: { ar: 'إشعارات تلغرام', en: 'Telegram Notifications' },
        description: {
            ar: 'إشعارات فورية عبر تلغرام عند استلام رسائل جديدة أو طلبات',
            en: 'Instant Telegram notifications when receiving new messages or requests',
        },
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
    },
    {
        icon: Share2,
        title: { ar: 'نشر تلقائي على السوشيال ميديا', en: 'Auto Social Posting' },
        description: {
            ar: 'نشر المقالات الجديدة تلقائياً على جميع منصات التواصل الاجتماعي',
            en: 'Automatically publish new articles on all social media platforms',
        },
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
    },
    {
        icon: Database,
        title: { ar: 'مزامنة البيانات', en: 'Data Synchronization' },
        description: {
            ar: 'مزامنة تلقائية للبيانات بين الأنظمة المختلفة والتطبيقات',
            en: 'Automatic data sync between different systems and applications',
        },
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
    },
    {
        icon: Zap,
        title: { ar: 'ردود تلقائية ذكية', en: 'Smart Auto Responses' },
        description: {
            ar: 'ردود ذكية تلقائية على استفسارات العملاء باستخدام الذكاء الاصطناعي',
            en: 'AI-powered automatic smart responses to customer inquiries',
        },
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
    },
    {
        icon: Workflow,
        title: { ar: 'سير عمل مخصص', en: 'Custom Workflows' },
        description: {
            ar: 'تصميم وبناء سيناريوهات أتمتة مخصصة تناسب احتياجات عملك',
            en: 'Design and build custom automation scenarios tailored to your business needs',
        },
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
    },
];

export default function AutomationShowcase() {
    const t = useTranslations('automation');
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <section className="py-24">
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
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Workflow visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <Card className="glass border-primary/10 overflow-hidden">
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                                {['Trigger', 'Process', 'Action', 'Result'].map((step, i) => (
                                    <div key={step} className="flex items-center gap-2 sm:gap-4">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-blue-500/10 text-blue-500' :
                                                    i === 1 ? 'bg-purple-500/10 text-purple-500' :
                                                        i === 2 ? 'bg-orange-500/10 text-orange-500' :
                                                            'bg-emerald-500/10 text-emerald-500'
                                                }`}>
                                                {i === 0 ? '⚡' : i === 1 ? '⚙️' : i === 2 ? '🚀' : '✅'}
                                            </div>
                                            <span className="text-xs text-muted-foreground">{
                                                isRTL ? ['المُحفِّز', 'المعالجة', 'الإجراء', 'النتيجة'][i] : step
                                            }</span>
                                        </div>
                                        {i < 3 && (
                                            isRTL ? (
                                                <ArrowLeft className="w-4 h-4 text-muted-foreground hidden sm:block" />
                                            ) : (
                                                <ArrowRight className="w-4 h-4 text-muted-foreground hidden sm:block" />
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Workflow Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {workflows.map((workflow, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                                <CardContent className="p-5 space-y-3">
                                    <div className={`w-12 h-12 rounded-xl ${workflow.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <workflow.icon className={`w-6 h-6 ${workflow.color}`} />
                                    </div>
                                    <h3 className="font-bold text-base">
                                        {isRTL ? workflow.title.ar : workflow.title.en}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {isRTL ? workflow.description.ar : workflow.description.en}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
