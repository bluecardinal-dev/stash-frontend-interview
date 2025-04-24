import { SearchBar } from '@/components/search/search-bar';
import { Logo } from '../logo';

export const Header: React.FC = () => {
    return (
        <header className="w-full flex border-b border-slate-200 justify-center">
            <div className="w-full max-w-[1400px] flex flex-col custom:flex-row min-h-[69px] items-center py-4 px-[40px] custom:px-0 gap-2 custom:gap-0">
                <Logo />
                <SearchBar />
            </div>
        </header>
    );
};
