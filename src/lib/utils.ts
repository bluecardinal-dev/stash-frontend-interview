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
