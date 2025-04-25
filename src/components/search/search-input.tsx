'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { stashClient } from '@/lib/stash-client';
import { SearchInputView } from './search-input-view';
import { useAtomValue } from 'jotai';
import { lastSearchedItineraryAtom } from '@/store';

export const SearchInput = () => {
    // ATOMS / STATE
    const lastSearchedItinerary = useAtomValue(lastSearchedItineraryAtom);
    const [input, setInput] = useState<string>('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    // ACTIONS
    const [query, isDebouncing] = useDebounce(input, 300);
    const { data, isLoading } = useQuery({
        queryKey: ['suggestions', query],
        queryFn: () => stashClient.getSuggestions(query),
        enabled: !!query
    });

    useEffect(() => {
        if (lastSearchedItinerary.query) {
            setInput(lastSearchedItinerary.query);
        }
    }, [lastSearchedItinerary.query]);

    const showSuggestions =
        isInputFocused &&
        !!query &&
        !isDebouncing &&
        data !== undefined &&
        query.length > 2;

    return (
        <SearchInputView
            data={data}
            input={input}
            isLoading={isLoading}
            showSuggestions={showSuggestions}
            query={query}
            setInput={setInput}
            setIsInputFocused={setIsInputFocused}
        />
    );
};
