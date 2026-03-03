'use client';

import { useLocale } from 'next-intl';
import { Layers, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminProjectsPage() {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    {isRTL ? 'المشاريع' : 'Projects'}
                </h1>
                <Button className="gradient-btn text-white border-0 gap-2">
                    <Plus className="w-4 h-4" />
                    {isRTL ? 'مشروع جديد' : 'New Project'}
                </Button>
            </div>

            <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                    <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                    <p>{isRTL ? 'إدارة المشاريع قريباً' : 'Project management coming soon'}</p>
                    <p className="text-xs mt-1">
                        {isRTL ? 'يمكنك إدارة المشاريع عبر قاعدة البيانات مباشرة' : 'You can manage projects directly in the database'}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
