'use client';

import { Hotel, HotelRate } from '@/lib/types';
import { HotelCard } from '../destination/hotel-list/hotel-card';
import { stashClient } from '@/lib/stash-client';
import { useQuery } from '@tanstack/react-query';

type HotelContainerProps = {
    hotel: Hotel;
};

export const HotelContainer: React.FC<HotelContainerProps> = ({ hotel }) => {
    const { data, isLoading, isFetching } = useQuery<HotelRate | undefined>({
        queryKey: ['rates', hotel.slug[0]],
        queryFn: async (): Promise<HotelRate | undefined> => {
            // Simulate latency, e.g., 500ms
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Querying all rates for a city here as this call is likely already
            // cached by react-query
            const rates = await stashClient.getRatesForDestination(
                hotel.slug[0]
            );
            return rates.find((rate) => rate.hotel_id === hotel.id);
        }
    });

    return (
        <HotelCard
            hotel={hotel}
            isRateLoading={isLoading || isFetching}
            rate={data ?? null}
            size="main"
        />
    );
};
