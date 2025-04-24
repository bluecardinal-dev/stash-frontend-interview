import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [
            new URL('https://assets.stashrewards.com/**'),
            new URL('https://images.stashrewards.com/**')
        ]
    }
};

export default nextConfig;
