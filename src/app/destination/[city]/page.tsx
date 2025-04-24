import { getHotels, getHotelsForDestination } from '@/lib/data';

export const dynamicParams = false;

/**
 * Generates static pages from returned data at build time.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
    // NOTE: this is reading data.json from the filesystem. This is a mock.
    // Normally, we'd fetch data from the Stash backend.
    const hotels = getHotels();

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

    // NOTE: this is reading data.json from the filesystem, and then looping through the array
    // to find the hotel by ID (O(N)). This is a mock. Normally, we'd fetch data from the Stash backend.
    // Since dynamicParams = false, this only runs at build time unless the cached page is invalidated.
    const hotels = getHotelsForDestination(city);

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
