import { z } from 'zod';

export const jsonResponse = (
    data: object,
    status = 200,
    headers: HeadersInit = {}
): Response => {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
};

export const parseJson = async <T>(
    req: Request,
    schema: z.ZodType<T>,
    headers: Record<string, string> = {}
): Promise<T | Response> => {
    try {
        const json = (await req.json()) as unknown;
        return schema.parse(json);
    } catch (e) {
        console.error(e);
        return jsonResponse({ error: 'Invalid request format' }, 400, headers);
    }
};
