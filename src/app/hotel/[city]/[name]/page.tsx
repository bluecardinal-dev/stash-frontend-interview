import { MainWrapper } from '@/components/layout/home-main-wrapper';
import { stashClient } from '@/lib/stash-client';
import { Metadata } from 'next';
import Image from 'next/image';

type HotelParams = {
    city: string;
    name: string;
};

type HotelProps = {
    params: Promise<HotelParams>;
};

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

/**
 * Generates metadata for static pages at build time
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
 */
export async function generateMetadata({
    params
}: HotelProps): Promise<Metadata> {
    const { city, name } = await params;
    const hotel = await stashClient.getHotelBySlug([city, name]);

    return {
        title: `${hotel.name} - Stash Hotel Rewards`,
        description: `Book at ${hotel.name}, one of the best independent hotels in ${hotel.city}.`,
        // @note: we would want a specific image of this location
        openGraph: {
            images: [hotel.image]
        }
    };
}

const Hotel: React.FC<HotelProps> = async ({ params }) => {
    const { city, name } = await params;
    const hotel = await stashClient.getHotelBySlug([city, name]);

    return (
        <MainWrapper>
            <Image
                src={hotel.image}
                alt={`${hotel.name} - ${hotel.city}`}
                height={500}
                width={500}
                priority={true}
                className="rounded-xl w-auto h-auto"
            />
        </MainWrapper>
    );
};

export default Hotel;
