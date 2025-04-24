import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { MainWrapper } from '@/components/layout/home-main-wrapper';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Discover the Best Independent Hotels - Earn Free Nights',
    description:
        'Earn points for free nights at unique, independent boutique hotels. Stash is the top-rated loyalty program for independent hotels and the inspired travelers who love them.'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    <div className="w-full flex justify-center">
                        <div className="w-full flex flex-col">
                            <Header />
                            <MainWrapper>{children}</MainWrapper>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
