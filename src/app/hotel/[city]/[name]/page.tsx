import { getHotelBySlug, getHotels } from '@/lib/data';

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
        city: hotel.slug[0],
        name: hotel.slug[1]
    }));
}

type HotelParams = {
    city: string;
    name: string;
};

type HotelProps = {
    params: Promise<HotelParams>;
};

const Hotel: React.FC<HotelProps> = async ({ params }) => {
    const { city, name } = await params;

    // NOTE: this is reading data.json from the filesystem, and then looping through the array
    // to find the hotel by ID (O(N)). This is a mock. Normally, we'd fetch data from the Stash backend.
    // Since dynamicParams = false, this only runs at build time unless the cached page is invalidated.
    const hotel = getHotelBySlug([city, name]);

    return (
        <div>
            {hotel.id}
            {hotel.name}
            {hotel.city}
        </div>
    );
};

export default Hotel;
