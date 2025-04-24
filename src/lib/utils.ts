import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Replaces spaces with hyphens (-) in a string and returns as lowercase
 * @param str The string to slugify
 * @returns slug
 */
export const slugify = (str: string): string => {
    return str
        .toLowerCase() // convert to lowercase
        .trim() // remove leading/trailing spaces
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/[^\w\-]+/g, '') // remove all non-word chars
        .replace(/\-\-+/g, '-'); // collapse multiple hyphens
};

/**
 * Calculates how many dollars off of a rate one gets with a specified discount
 * @param rate base rate
 * @param discount discount to be applied to the rate
 * @returns floored discount
 */
export const calculateDiscountRateDiff = (
    rate: number,
    discount: number = 0.1
) => {
    return Math.floor(rate - calculateDiscountedRate(rate, discount));
};

/**
 * Calculates a new rate based on a discount
 * @param rate base rate
 * @param discount discount to be applied to the rate
 * @returns discounted rate
 */
export const calculateDiscountedRate = (
    rate: number,
    discount: number = 0.1
) => {
    return Math.floor(rate - rate * discount);
};
