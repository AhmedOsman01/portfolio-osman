'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';

// URLs that are considered placeholders / not yet deployed
const PLACEHOLDER_PATTERNS = [
    'example.com',
    'github.com/example',
    'placeholder.com',
    'your-domain.com',
];

export function isPlaceholderUrl(url: string): boolean {
    if (!url || url === '#') return true;
    return PLACEHOLDER_PATTERNS.some((p) => url.includes(p));
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function usePlaceholderAlert() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<'live' | 'code'>('live');

    const handleLink = (
        e: React.MouseEvent<HTMLElement>,
        url: string,
        linkType: 'live' | 'code' = 'live'
    ) => {
        if (isPlaceholderUrl(url)) {
            e.preventDefault();
            setType(linkType);
            setOpen(true);
        }
        // Real URLs proceed normally
    };

    return { open, setOpen, type, handleLink };
}

// ─── Dialog Component ───────────────────────────────────────────────────────

interface PlaceholderAlertDialogProps {
    open: boolean;
    onClose: () => void;
    type: 'live' | 'code';
}

export function PlaceholderAlertDialog({
    open,
    onClose,
    type,
}: PlaceholderAlertDialogProps) {
    const locale = useLocale();
    const isAr = locale === 'ar';

    const messages = {
        live: {
            title: isAr ? 'عذراً، الصفحة غير متاحة بعد' : 'Coming Soon!',
            body: isAr
                ? 'نأسف، هذا المشروع لا يزال قيد التطوير ولم يُنشر بعد. 🙏\nشكراً لصبرك — سيكون متاحاً قريباً!'
                : "We're sorry, this project is still under development and hasn't been deployed yet. 🙏\nThank you for your patience — it'll be live soon!",
        },
        code: {
            title: isAr ? 'المستودع غير متاح' : 'Repository Not Public',
            body: isAr
                ? 'نأسف، هذا المستودع خاص أو لم يُنشر بعد. 🙏\nيمكنك التواصل معنا لمزيد من المعلومات.'
                : "We're sorry, this repository is private or not published yet. 🙏\nFeel free to contact us for more information.",
        },
    };

    const msg = messages[type];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm text-center">
                <button
                    onClick={onClose}
                    className="absolute top-3 end-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                <DialogHeader className="items-center">
                    <div className="text-5xl mb-3">🚧</div>
                    <DialogTitle className="text-xl font-bold">{msg.title}</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2 whitespace-pre-line">
                        {msg.body}
                    </DialogDescription>
                </DialogHeader>
                <Button
                    onClick={onClose}
                    className="gradient-btn text-white border-0 mt-2 w-full"
                >
                    {isAr ? 'حسناً، شكراً!' : 'Got it, thanks!'}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
