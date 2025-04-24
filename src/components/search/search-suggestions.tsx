import { Destination, Hotel } from '@/lib/types';
import Link from 'next/link';

export type SuggestionsData = {
    destinations: Destination[];
    hotels: Hotel[];
};

type SearchSuggestionsProps = {
    query: string;
    isLoading: boolean;
    data?: SuggestionsData;
};

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
    query,
    isLoading,
    data = { destinations: [], hotels: [] }
}) => {
    const highlightMatch = (text: string, query: string) => {
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return text;

        const start = text.slice(0, index);
        const match = text.slice(index, index + query.length);
        const end = text.slice(index + query.length);

        return (
            <>
                {start}
                <span className="font-semibold text-orange-600">{match}</span>
                {end}
            </>
        );
    };

    return (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-lg z-10 max-h-80 overflow-auto">
            {isLoading ? (
                <div className="p-4 text-sm text-gray-500">Loading...</div>
            ) : (
                <>
                    <div className="p-2 border-b text-xs font-bold uppercase text-gray-500">
                        Destinations
                    </div>
                    {data?.destinations.length ? (
                        data.destinations.map((dest) => (
                            <Link
                                href={`/destination/${dest.slug}`}
                                key={dest.slug}
                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                                {highlightMatch(dest.name, query)}
                            </Link>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-400">
                            No matches
                        </div>
                    )}

                    <div className="p-2 border-b mt-2 text-xs font-bold uppercase text-gray-500">
                        Hotels
                    </div>
                    {data?.hotels.length ? (
                        data.hotels.map((hotel) => (
                            <Link
                                href={`/hotel/${hotel.slug[0]}/${hotel.slug[1]}`}
                                key={hotel.id}
                                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                                {highlightMatch(hotel.name, query)}
                            </Link>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-400">
                            No matches
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
