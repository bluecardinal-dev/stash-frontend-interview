'use client';

import { useState } from 'react';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { stashClient } from '@/lib/stash-client';
import { SearchInputView } from './search-input-view';

export const SearchInput = () => {
    const [input, setInput] = useState('');
    const [query, isDebouncing] = useDebounce(input, 300);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['suggestions', query],
        queryFn: () => stashClient.getSuggestions(query),
        enabled: !!query
    });

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
