import Link from 'next/link';
import { cn } from '../../lib/utils';

type StashLinkProps = {
    className?: string;
    target?: string;
    href: string;
    children: React.ReactNode;
};

export const StashLink: React.FC<StashLinkProps> = ({
    href,
    className = '',
    target = '_self',
    children
}) => {
    return (
        <Link
            href={href}
            target={target}
            className={cn([
                'text-primary underline-offset-4 hover:underline hover:text-stash transition-colors',
                className
            ])}
        >
            {children}
        </Link>
    );
};
