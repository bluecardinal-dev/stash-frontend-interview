import { Input } from '../ui/input';
import { Dispatch, SetStateAction } from 'react';
import { SearchSuggestions, SuggestionsData } from './search-suggestions';
import { Label } from '../ui/label';
import { Search } from 'lucide-react';

type SearchInputViewProps = {
    data?: SuggestionsData;
    input: string;
    isLoading: boolean;
    showSuggestions: boolean;
    query: string;
    setInput: Dispatch<SetStateAction<string>>;
    setIsInputFocused: Dispatch<SetStateAction<boolean>>;
};

export const SearchInputView: React.FC<SearchInputViewProps> = ({
    data,
    input,
    isLoading,
    showSuggestions,
    query,
    setInput,
    setIsInputFocused
}) => {
    return (
        <div className="relative w-full max-w-lg">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Label htmlFor="input">
                    <Search size={18} className="text-slate-600" />
                </Label>
            </div>
            <Input
                value={input}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                    setTimeout(() => setIsInputFocused(false), 100);
                }}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search hotels, destinations, etc."
                className="w-full border-slate-200 pl-10 py-6 !text-base rounded-none focus-visible:ring-orange-200"
            />

            {showSuggestions && (
                <SearchSuggestions
                    query={query}
                    data={data}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};
