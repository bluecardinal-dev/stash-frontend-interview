'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

type ProvidersProps = {
    children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            <JotaiProvider>{children}</JotaiProvider>
        </QueryClientProvider>
    );
};
