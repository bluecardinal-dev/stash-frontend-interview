import { Hotel, HotelRate } from '@/lib/types';
import Link from 'next/link';
import { SavedHotels } from '../saved-hotels';
import { HotelCard } from './hotel-card';

type HotelListViewProps = {
    rates: HotelRate[];
    areRatesLoading: boolean;
    hotels: Hotel[];
    slug: string;
};

export const HotelListView: React.FC<HotelListViewProps> = ({
    hotels,
    rates,
    areRatesLoading
}) => {
    return (
        <div className="flex w-full gap-8 flex-col custom:flex-row">
            <div className="grow">
                {hotels.map((hotel) => {
                    const rate =
                        (rates ?? []).find(
                            (rate) => rate.hotel_id === hotel.id
                        ) ?? null;

                    return (
                        <Link
                            key={hotel.id}
                            href={`/hotel/${hotel.slug[0]}/${hotel.slug[1]}`}
                        >
                            <HotelCard
                                hotel={hotel}
                                rate={rate}
                                isRateLoading={areRatesLoading}
                            />
                        </Link>
                    );
                })}
            </div>
            <SavedHotels />
        </div>
    );
};
