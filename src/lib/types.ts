export type Hotel = {
    id: number;
    name: string;
    city: string;
    daily_rate: number;
    has_member_rate: boolean;
    image: string;
    /** slug[0] = city slug, slug[1] = hotel name slug */
    slug: [string, string];
};

export type Destination = {
    name: string;
    slug: string;
};

export type HotelRate = {
    hotel_id: number;
    has_member_rate: boolean;
    daily_rate: number;
};
