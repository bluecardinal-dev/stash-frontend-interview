import { HotelList } from '@/components/layout/destination/hotel-list/hotel-list';
import { stashClient } from '@/lib/stash-client';

export const dynamicParams = false;

/**
 * Generates static pages from returned data at build time.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
    const hotels = await stashClient.getHotels();

    return hotels.map((hotel) => ({
        city: hotel.slug[0]
    }));
}

type DestinationParams = {
    city: string;
};

type DestinationProps = {
    params: Promise<DestinationParams>;
};

const Destination: React.FC<DestinationProps> = async ({ params }) => {
    const { city } = await params;
    const hotels = await stashClient.getHotelsForDestination(city);
    const deslugifiedCity = hotels[0].city;

    return (
        <div className="flex py-8 gap-8 flex-col w-full">
            <h1 className="text-4xl text-stash font-medium">
                Hotels in {deslugifiedCity}
            </h1>
            <HotelList hotels={hotels} slug={city} />
        </div>
    );
};

export default Destination;
