import fs from 'fs';
import path from 'path';
import { slugify } from './utils';
import { Hotel } from './types';

/**
 * Reads provided data.json file and returns the typecasted Hotel data.
 * @returns A list of hotels
 */
export const getHotels = (): Hotel[] => {
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
};

/**
 * Reads provided data.json file and returns a Hotel from a given ID.
 * @returns A hotel
 */
export const getHotelById = (id?: string | number): Hotel => {
    if (!id) {
        throw new Error("Invalid hotel ID: 'undefined' provided");
    }

    const hotels = getHotels();
    const hotel = hotels.find((hotel) => String(hotel.id) === id);

    if (!hotel) {
        throw new Error(`Invalid hotel ID: hotel with ID ${id} does not exist`);
    }

    return hotel;
};

/**
 * Reads provided data.json file and returns a Hotel from a given city / name combo.
 * @returns A hotel
 */
export const getHotelBySlug = (slug?: [string, string]): Hotel => {
    if (!slug) {
        throw new Error('Invalid hotel slug: slug is undefined');
    }

    const hotels = getHotels();
    const hotel = hotels.find(
        (hotel) => hotel.slug[0] === slug[0] && hotel.slug[1] === slug[1]
    );

    if (!hotel) {
        throw new Error(
            `Invalid hotel slug: hotel with slug ${slug} does not exist`
        );
    }

    return hotel;
};

/**
 * Reads provided data.json file and returns Hotels in a given destination.
 * @returns A list of hotels
 */
export const getHotelsForDestination = (slug: string): Hotel[] => {
    if (!slug) {
        throw new Error('Invalid destination slug: slug is undefined');
    }

    const hotels = getHotels();
    return hotels.filter((hotel) => hotel.slug[0] === slug);
};
