import Link from 'next/link';

export const Logo: React.FC = () => {
    return (
        <Link href="/" aria-label="Go to home page">
            <p className="text-3xl leading-none font-bold text-stash">STASH</p>
            <p className="text-sm">Hotel Rewards &#x24C7;</p>
        </Link>
    );
};
