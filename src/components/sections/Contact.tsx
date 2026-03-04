'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
    Send,
    Mail,
    MapPin,
    Phone,
    MessageSquare,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';



export default function Contact() {
    const t = useTranslations('contact');
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        serviceType: '',
        budgetRange: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(t('success'));
                setFormData({ name: '', email: '', message: '', serviceType: '', budgetRange: '' });
            } else {
                const data = await res.json();
                toast.error(data.error || t('error'));
            }
        } catch {
            toast.error(t('error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24">
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
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: locale === 'ar' ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {[
                            { icon: Mail, value: 'ahmedosmanelhady@gmail.com', href: 'mailto:ahmedosmanelhady@gmail.com' },
                            { icon: Phone, value: isRTL ? '٠١٠٠١٣١٢٧٤٩ - ٠١١٠١٤٧٦٨٥٤' : '01001312749 - 01101476854', href: 'tel:+201001312749' },
                            { icon: MapPin, value: isRTL ? 'أسيوط - أبوتيج، مصر' : 'Assyut - Abotig, Egypt', href: 'https://maps.google.com/?q=Abotig,Assiut,Egypt' },
                        ].map((info, index) => (
                            <a key={index} href={info.href}>
                                <Card className="hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group mb-4">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <info.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{info.value}</span>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}

                        <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
                            <CardContent className="p-6 text-center space-y-3">
                                <MessageSquare className="w-8 h-8 text-primary mx-auto" />
                                <p className="text-sm text-muted-foreground">
                                    {locale === 'ar'
                                        ? 'متاح للعمل على مشاريع جديدة ومثيرة'
                                        : 'Available for exciting new projects'}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <Card className="glass border-primary/10">
                            <CardContent className="p-6 sm:p-8">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{t('name')}</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="h-11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t('email')}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="h-11"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>{t('serviceType')}</Label>
                                            <Select
                                                value={formData.serviceType}
                                                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                                            >
                                                <SelectTrigger className="h-11">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="webDev">{t('services.webDev')}</SelectItem>
                                                    <SelectItem value="automation">{t('services.automation')}</SelectItem>
                                                    <SelectItem value="api">{t('services.api')}</SelectItem>
                                                    <SelectItem value="ai">{t('services.ai')}</SelectItem>
                                                    <SelectItem value="consulting">{t('services.consulting')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t('budgetRange')}</Label>
                                            <Select
                                                value={formData.budgetRange}
                                                onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                                            >
                                                <SelectTrigger className="h-11">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="small">{t('budgets.small')}</SelectItem>
                                                    <SelectItem value="medium">{t('budgets.medium')}</SelectItem>
                                                    <SelectItem value="large">{t('budgets.large')}</SelectItem>
                                                    <SelectItem value="enterprise">{t('budgets.enterprise')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">{t('message')}</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows={5}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full gradient-btn text-white border-0 h-12 text-base gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>{t('sending')}</>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                {t('send')}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
