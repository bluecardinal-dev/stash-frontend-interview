export type Hotel = {
    id: number;
    name: string;
    city: string;
    daily_rate: number;
    has_member_rate: number;
    image: string;
    /** slug[0] = city slug, slug[1] = hotel name slug */
    slug: [string, string];
};
