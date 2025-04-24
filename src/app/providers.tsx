'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProvidersProps = {
    children: React.ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};
