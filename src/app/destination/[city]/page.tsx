import { HotelList } from '@/components/layout/destination/hotel-list/hotel-list';
import { stashClient } from '@/lib/stash-client';
import { Metadata } from 'next';

type DestinationParams = {
    city: string;
};

type DestinationProps = {
    params: Promise<DestinationParams>;
};

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

/**
 * Generates metadata for static pages at build time
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
 */
export async function generateMetadata({
    params
}: DestinationProps): Promise<Metadata> {
    const { city } = await params;

    const hotels = await stashClient.getHotelsForDestination(city);

    const deslugifiedCity = hotels[0].city;
    const placeholderImage = hotels[0].image;

    return {
        title: `Best Independent Hotels in ${deslugifiedCity} - Stash Hotel Rewards`,
        description: `Find the best independent hotels in ${deslugifiedCity} and earn points when booking.`,
        // @note: we would want a specific image of this location
        openGraph: {
            images: [placeholderImage]
        }
    };
}

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
