'use client';

import { stashClient } from '@/lib/stash-client';
import { Hotel, HotelRate } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { HotelListView } from './hotel-list-view';

type HotelListProps = {
    hotels: Hotel[];
    slug: string;
};

export const HotelList: React.FC<HotelListProps> = ({ hotels, slug }) => {
    const { data, isLoading } = useQuery<HotelRate[]>({
        queryKey: ['rates', slug],
        queryFn: async (): Promise<HotelRate[]> => {
            // Simulate latency, e.g., 500ms
            await new Promise((resolve) => setTimeout(resolve, 500));

            return await stashClient.getRatesForDestination(slug);
        }
    });

    return (
        <HotelListView
            slug={slug}
            hotels={hotels}
            rates={data ?? []}
            areRatesLoading={isLoading}
        />
    );
};
