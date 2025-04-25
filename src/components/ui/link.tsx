import Link from 'next/link';
import { cn } from '../../lib/utils';
import { MouseEvent } from 'react';

type StashLinkProps = {
    className?: string;
    target?: string;
    href: string;
    children: React.ReactNode;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export const StashLink: React.FC<StashLinkProps> = ({
    href,
    className = '',
    target = '_self',
    children,
    onClick
}) => {
    return (
        <Link
            href={href}
            target={target}
            className={cn([
                'text-primary underline-offset-4 hover:underline hover:text-stash transition-colors',
                className
            ])}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};
