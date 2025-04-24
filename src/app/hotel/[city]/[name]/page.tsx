import { stashClient } from '@/lib/stash-client';
import Image from 'next/image';

export const dynamicParams = false;

/**
 * Generates static pages from returned data at build time.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
    const hotels = await stashClient.getHotels();

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
    const hotel = await stashClient.getHotelBySlug([city, name]);

    return (
        <div>
            {hotel.id}
            {hotel.name}
            {hotel.city}
            <Image
                src={hotel.image}
                alt={`${hotel.name} - ${hotel.city}`}
                height={500}
                width={500}
                priority={true}
                className="rounded-xl w-auto h-auto"
            />
        </div>
    );
};

export default Hotel;
