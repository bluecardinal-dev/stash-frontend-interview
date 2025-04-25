'use client';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LucideUsers2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Counter } from './counter';
import { useAtom } from 'jotai';
import { lastSearchedItineraryAtom } from '@/store';

export const TravelersSelection: React.FC = () => {
    // ATOMS / STATE
    const [lastSearchedItinerary, setLastSearchedItinerary] = useAtom(
        lastSearchedItineraryAtom
    );
    const adults = lastSearchedItinerary.party.adults;
    const children = lastSearchedItinerary.party.children;

    // ACTIONS
    const setPartyCount = (type: 'adults' | 'children', count: number) => {
        setLastSearchedItinerary((prev) => ({
            ...prev,
            party: {
                ...prev.party,
                [type]: count
            }
        }));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="stash">
                    <LucideUsers2 />
                    {adults + children}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-full flex flex-col gap-2">
                    <Counter
                        label="Adults"
                        count={adults}
                        min={1}
                        setCount={(count) => setPartyCount('adults', count)}
                    />
                    <Counter
                        label="Children"
                        count={children}
                        setCount={(count) => setPartyCount('children', count)}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};
