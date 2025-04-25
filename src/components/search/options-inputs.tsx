'use client';

import { useAtom } from 'jotai';
import { DatePickerWithRange } from '../ui/date-picker';
import { Separator } from '../ui/separator';
import { TravelersSelection } from './travelers-selection';
import { lastSearchedItineraryAtom } from '@/store';
import { DateRange } from 'react-day-picker';

export const OptionsInputs = () => {
    // STATE / ATOMS
    const [lastSearchedItinerary, setLastSearchedItinerary] = useAtom(
        lastSearchedItineraryAtom
    );

    // ACTIONS
    const handleSetLastSearchedItinerary = (range?: DateRange) =>
        setLastSearchedItinerary((prev) => ({
            ...prev,
            dateRange: range
        }));

    return (
        <div className="content-center flex items-center gap-1">
            <TravelersSelection />
            <Separator orientation="vertical" className="!h-[30px]" />
            <DatePickerWithRange
                defaultRange={lastSearchedItinerary.dateRange}
                onRangeChange={handleSetLastSearchedItinerary}
            />
        </div>
    );
};
