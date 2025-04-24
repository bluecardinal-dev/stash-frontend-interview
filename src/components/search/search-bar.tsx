import { OptionsInputs } from './options-inputs';
import { SearchInput } from './search-input';

export const SearchBar: React.FC = () => {
    return (
        <div className="flex justify-between grow pl-10 flex-col custom:flex-row gap-2 custom:gap-0">
            <SearchInput />
            <OptionsInputs />
        </div>
    );
};
