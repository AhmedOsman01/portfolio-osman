'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    Facebook,
    Twitter,
    Linkedin,
    Link2,
    Share2,
    MessageCircle,
    Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareButtonsProps {
    url: string;
    title: string;
    compact?: boolean;
}

export default function ShareButtons({ url, title, compact = true }: ShareButtonsProps) {
    const t = useTranslations('blog');
    const [copied, setCopied] = useState(false);

    const fullUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${url}`
        : url;

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
            color: 'hover:text-blue-600',
        },
        {
            name: 'Twitter/X',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
            color: 'hover:text-sky-500',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
            color: 'hover:text-blue-700',
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: `https://wa.me/?text=${encodeURIComponent(`${title} ${fullUrl}`)}`,
            color: 'hover:text-green-500',
        },
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            toast.success(t('linkCopied'));
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url: fullUrl });
            } catch {
                // User cancelled
            }
        }
    };

    const iconSize = compact ? 'w-3.5 h-3.5' : 'w-4 h-4';
    const btnSize = compact ? 'h-7 w-7' : 'h-8 w-8';

    return (
        <div className="flex items-center gap-1.5">
            {typeof navigator !== 'undefined' && 'share' in navigator && (
                <Button
                    variant="ghost"
                    size="icon"
                    className={`${btnSize} text-muted-foreground hover:text-primary`}
                    onClick={handleNativeShare}
                >
                    <Share2 className={iconSize} />
                </Button>
            )}
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`${btnSize} text-muted-foreground ${link.color}`}
                    >
                        <link.icon className={iconSize} />
                    </Button>
                </a>
            ))}
            <Button
                variant="ghost"
                size="icon"
                className={`${btnSize} text-muted-foreground hover:text-primary`}
                onClick={handleCopyLink}
            >
                {copied ? <Check className={iconSize} /> : <Link2 className={iconSize} />}
            </Button>
        </div>
    );
}
