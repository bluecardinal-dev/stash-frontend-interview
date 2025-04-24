import { ClientTest } from '@/app/client';
import { stashClient } from '@/lib/stash-client';
import Image from 'next/image';

export const dynamicParams = false;

/**
 * Generates static pages from returned data at build time.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
    const hotels = stashClient.getHotels();

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
    const hotel = stashClient.getHotelBySlug([city, name]);

    return (
        <div>
            {hotel.id}
            {hotel.name}
            {hotel.city}
            <ClientTest test={'no'} />
            <Image
                src={hotel.image}
                alt={`${hotel.name} - ${hotel.city}`}
                height={500}
                width={500}
                priority={true}
            />
        </div>
    );
};

export default Hotel;
