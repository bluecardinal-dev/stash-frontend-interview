import { jsonResponse, parseJson } from '@/lib/api';
import { GENERIC_API_SUCCESS_OBJECT } from '@/lib/constants';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { z } from 'zod';

// TYPES
enum InvalidationType {
    ALL = 'ALL',
    SINGLE = 'SINGLE'
}

type RequestBody = {
    invalidationType: InvalidationType;
    slug?: [string, string];
};

const requestBodySchema = z
    .object({
        invalidationType: z.nativeEnum(InvalidationType),
        slug: z.tuple([z.string(), z.string()]).optional()
    })
    .refine((input) => {
        // allows id to be optional only when invalidationType is 'InvalidationType.ALL'
        if (
            input.invalidationType !== InvalidationType.ALL &&
            input.slug === undefined
        )
            return false;

        return true;
    });

/**
 * Invalidates the cache of a particular static page (all hotels or individual hotel).
 * @see https://nextjs.org/docs/app/building-your-application/caching#revalidatepath
 * @returns HTTP response object
 */
export const POST = async (req: NextRequest) => {
    try {
        const body = await parseJson<RequestBody>(req, requestBodySchema);
        if (body instanceof Response) return body;

        if (body.invalidationType === InvalidationType.ALL) {
            revalidatePath('/');
            return jsonResponse(GENERIC_API_SUCCESS_OBJECT, 200);
        }

        revalidatePath(`/hotel/${body.slug?.[0]}/${body.slug?.[1]}`);
        revalidatePath(`/search/${body.slug?.[0]}`);
    } catch (e) {
        console.log(e);
        return jsonResponse({ message: 'Internal server error' }, 500);
    }
};
