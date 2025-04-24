import { stashClient } from '@/lib/stash-client';

export const dynamicParams = false;

/**
 * Generates static pages from returned data at build time.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
    const hotels = stashClient.getHotels();

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
    const hotels = stashClient.getHotelsForDestination(city);

    return (
        <div>
            {hotels.map((hotel) => (
                <div key={hotel.id}>
                    {hotel.id}
                    {hotel.name}
                    {hotel.city}
                </div>
            ))}
        </div>
    );
};

export default Destination;
