import fs from 'fs';
import path from 'path';
import { Hotel } from './types';
import { slugify } from './utils';

/**
 * Mock client for retrieving data from Stash backend. Mock methods read data.json
 * from the filesystem. For a prod, data would be fetched from the API,
 */
class StashClient {
    /**
     * Reads provided data.json file and returns the typecasted Hotel data.
     * @returns A list of hotels
     */
    getHotels(): Hotel[] {
        const filePath = path.join(process.cwd(), 'public', 'data.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const hotels: Hotel[] = JSON.parse(fileContents);

        // Add city and name slugs for the sake of this demo and return.
        // A slug will be a tuple with the first item being the slugified city
        // and the second item being the slugified hotel name.
        return hotels.map((hotel) => {
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
    getHotelBySlug(slug?: [string, string]): Hotel {
        if (!slug) {
            throw new Error('Invalid hotel slug: slug is undefined');
        }

        const hotels = this.getHotels();
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
    getHotelsForDestination(slug: string): Hotel[] {
        if (!slug) {
            throw new Error('Invalid destination slug: slug is undefined');
        }

        const hotels = this.getHotels();
        return hotels.filter((hotel) => hotel.slug[0] === slug);
    }
}

export const stashClient = new StashClient();
