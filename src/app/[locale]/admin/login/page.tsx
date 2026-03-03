'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Code2, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminLoginPage() {
    const router = useRouter();
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(isRTL ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
            } else {
                toast.success(isRTL ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully');
                router.push(`/${locale}/admin`);
            }
        } catch {
            toast.error(isRTL ? 'حدث خطأ' : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-grid-pattern relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-xl gradient-btn flex items-center justify-center mx-auto mb-4">
                        <Code2 className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">{isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {isRTL ? 'سجّل دخولك للمتابعة' : 'Sign in to continue'}
                    </p>
                </div>

                <Card className="glass border-primary/10">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="loginEmail">
                                    <Mail className="w-4 h-4 inline-block me-2" />
                                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                                </Label>
                                <Input
                                    id="loginEmail"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="loginPassword">
                                    <Lock className="w-4 h-4 inline-block me-2" />
                                    {isRTL ? 'كلمة المرور' : 'Password'}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="loginPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 pe-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute end-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full gradient-btn text-white border-0 h-11"
                            >
                                {loading
                                    ? (isRTL ? 'جارٍ الدخول...' : 'Signing in...')
                                    : (isRTL ? 'تسجيل الدخول' : 'Sign In')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
