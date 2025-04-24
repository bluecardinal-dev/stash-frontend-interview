import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { HomeMainWrapper } from '@/components/layout/home/home-main-wrapper';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

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
                            <HomeMainWrapper>{children}</HomeMainWrapper>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
