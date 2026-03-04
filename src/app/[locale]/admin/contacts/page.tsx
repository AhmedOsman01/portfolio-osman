'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    serviceType: string;
    budgetRange: string;
    isRead: boolean;
    createdAt: string;
}

export default function AdminContactsPage() {
    const locale = useLocale();
    const isRTL = locale === 'ar';
    const [contacts, setContacts] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            // In production, this would fetch from an API endpoint
            setLoading(false);
            setContacts([]);
        };
        fetchContacts();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Mail className="w-6 h-6 inline-block me-2" />
                    {isRTL ? 'الرسائل' : 'Messages'}
                </h1>
                <Badge variant="secondary">
                    {contacts.length} {isRTL ? 'رسالة' : 'messages'}
                </Badge>
            </div>

            {loading ? (
                <p className="text-muted-foreground">{isRTL ? 'جارٍ التحميل...' : 'Loading...'}</p>
            ) : contacts.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <Mail className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                        <p>{isRTL ? 'لا توجد رسائل بعد' : 'No messages yet'}</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={contact._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className={`hover:border-primary/20 transition-colors ${!contact.isRead ? 'border-primary/30' : ''}`}>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-sm">{contact.name}</h3>
                                                {!contact.isRead && (
                                                    <Badge className="gradient-btn text-white border-0 text-xs">
                                                        {isRTL ? 'جديد' : 'New'}
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2">{contact.email}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{contact.message}</p>
                                            <div className="flex gap-2 mt-2">
                                                {contact.serviceType && (
                                                    <Badge variant="secondary" className="text-xs">{contact.serviceType}</Badge>
                                                )}
                                                {contact.budgetRange && (
                                                    <Badge variant="secondary" className="text-xs">{contact.budgetRange}</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(contact.createdAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                                            </span>
                                            {!contact.isRead && (
                                                <button className="text-xs text-primary hover:underline flex items-center gap-1">
                                                    <Check className="w-3 h-3" />
                                                    {isRTL ? 'تم القراءة' : 'Mark read'}
                                                </button>
                                            )}
                                        </div>
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
