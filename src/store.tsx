import { atomWithStorage } from 'jotai/utils';
import { Hotel, Itinerary } from './lib/types';
import { addDays } from 'date-fns';

export const savedHotelsAtom = atomWithStorage<Hotel[]>('savedHotels', []);

export const lastSearchedItineraryAtom = atomWithStorage<Itinerary>(
    'lastSearchedItinerary',
    {
        query: null,
        dateRange: {
            from: addDays(new Date(), 1),
            to: addDays(new Date(), 4)
        },
        party: {
            adults: 1,
            children: 0
        }
    }
);
