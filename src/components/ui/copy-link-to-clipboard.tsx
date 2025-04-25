'use client';

import { Button } from '@/components/ui/button';
import { LucideCheck, LucideClipboard } from 'lucide-react';
import { useState } from 'react';
import { PropagationStopper } from './propogation-stopper';

interface CopyLinkToClipboardProps {
    url: string;
}

export const CopyLinkToClipboard: React.FC<CopyLinkToClipboardProps> = ({
    url
}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleClipboardCopy = async () => {
        try {
            await navigator.clipboard.writeText(url ?? '');
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        } catch (err) {
            console.error('Failed to copy API key:', err);
        }
    };

    return (
        <PropagationStopper>
            <Button
                onClick={handleClipboardCopy}
                className="p-0 text-slate-500 hover:text-slate-500"
                size="icon"
                variant="stash"
                title={
                    isCopied
                        ? 'URL copied to clipboard'
                        : 'Copy URL to clipboard'
                }
                aria-label={
                    isCopied
                        ? 'URL copied to clipboard'
                        : 'Copy URL to clipboard'
                }
            >
                {isCopied ? (
                    <LucideCheck size={16} />
                ) : (
                    <LucideClipboard size={16} />
                )}
            </Button>
        </PropagationStopper>
    );
};
