'use client';

import { useLocale } from 'next-intl';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminSubscribersPage() {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Users className="w-6 h-6 inline-block me-2" />
                    {isRTL ? 'المشتركين' : 'Subscribers'}
                </h1>
            </div>

            <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p>{isRTL ? 'لا يوجد مشتركين بعد' : 'No subscribers yet'}</p>
                    <p className="text-xs mt-1">
                        {isRTL ? 'سيظهر المشتركون هنا بعد الاشتراك من النشرة البريدية' : 'Subscribers will appear here after signing up via the newsletter'}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
