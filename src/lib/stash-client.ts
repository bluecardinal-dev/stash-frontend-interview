import { Destination, Hotel, HotelRate } from './types';
import { slugify } from './utils';
import data from '../../public/data.json';

/**
 * Mock client for retrieving data from Stash backend. Mock methods read data.json
 * from the filesystem. For a prod, data would be fetched from the API,
 */
class StashClient {
    /**
     * Reads provided data.json file and returns the typecasted Hotel data.
     * @returns A list of hotels
     */
    async getHotels(): Promise<Hotel[]> {
        // Add city and name slugs for the sake of this demo and return.
        // A slug will be a tuple with the first item being the slugified city
        // and the second item being the slugified hotel name.
        return data.map((hotel) => {
            return {
                ...hotel,
                slug: [slugify(hotel.city), slugify(hotel.name)]
            };
        });
    }

    /**
     * Reads provided data.json file and returns a Hotel from a given city / name combo.
     * This retrieves the full data object and loops through each (O(N)) to find the hotel.
     * In a real implementation, this would fetch information for a single hotel.
     * @returns A hotel
     */
    async getHotelBySlug(slug?: [string, string]): Promise<Hotel> {
        if (!slug) {
            throw new Error('Invalid hotel slug: slug is undefined');
        }

        const hotels = await this.getHotels();
        const hotel = hotels.find(
            (hotel) => hotel.slug[0] === slug[0] && hotel.slug[1] === slug[1]
        );

        if (!hotel) {
            throw new Error(
                `Invalid hotel slug: hotel with slug ${slug} does not exist`
            );
        }

        return hotel;
    }

    /**
     * Reads provided data.json file and returns Hotels in a given destination.
     * This retrieves the full data object and loops through each (O(N)) to find the hotels
     * in each destination. In a real implementation, this would fetch information for just the data needed.
     * @returns A list of hotels
     */
    async getHotelsForDestination(slug: string): Promise<Hotel[]> {
        if (!slug) {
            throw new Error('Invalid destination slug: slug is undefined');
        }

        const hotels = await this.getHotels();
        return hotels.filter((hotel) => hotel.slug[0] === slug);
    }

    /**
     * Reads provided data.json file and returns the top 25 cities represented in the hotel data (occurance).
     * In a real implementation, this would fetch information for just the data needed.
     * @returns A list of destinations
     */
    async getTopDestinations(): Promise<Destination[]> {
        const hotels = await this.getHotels();

        const cityCountMap = new Map<string, number>();

        for (const hotel of hotels) {
            cityCountMap.set(
                hotel.city,
                (cityCountMap.get(hotel.city) || 0) + 1
            );
        }

        const destinations: Destination[] = Array.from(cityCountMap.entries())
            .map(([city, count]) => ({
                name: city,
                slug: slugify(city),
                count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 25);

        return destinations;
    }

    /**
     * Reads provided data.json file and returns the rates for each hotel in the destination based
     * on itinerary range. In a real implementation, this would fetch information for just the data needed.
     * @returns A list of rates
     */
    async getRatesForDestination(slug: string): Promise<HotelRate[]> {
        const hotels = await this.getHotelsForDestination(slug);
        return hotels.map((hotel) => ({
            hotel_id: hotel.id,
            has_member_rate: hotel.has_member_rate,
            daily_rate: hotel.daily_rate
        }));
    }
}

export const stashClient = new StashClient();
