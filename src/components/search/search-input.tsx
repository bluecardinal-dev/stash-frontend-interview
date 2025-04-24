import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const SearchInput = () => {
    return (
        <div className="relative w-full max-w-md">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Label htmlFor="input">
                    <Search size={18} className="text-slate-600" />
                </Label>
            </div>
            <Input
                type="text"
                id="input"
                autoComplete="off"
                placeholder="Search destinations, hotels, etc."
                className="w-full border-slate-200 pl-10 py-6 !text-base rounded-none focus-visible:ring-orange-200"
            />
        </div>
    );
};
