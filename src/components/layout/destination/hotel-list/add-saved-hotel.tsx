import { Button } from '@/components/ui/button';
import { LucideHeart } from 'lucide-react';
import { PropagationStopper } from '../../../ui/propogation-stopper';
import { useAtom } from 'jotai/react';
import { savedHotelsAtom } from '@/store';
import { cn } from '@/lib/utils';
import { Hotel } from '@/lib/types';

interface AddSavedHotelProps {
    hotel: Hotel;
}

export const AddSavedHotel: React.FC<AddSavedHotelProps> = ({ hotel }) => {
    const [savedHotels, setSavedHotels] = useAtom(savedHotelsAtom);

    const isAdded = savedHotels.some(
        (savedHotel) => savedHotel.id === hotel.id
    );

    const handleToggleSaved = () => {
        setSavedHotels((prev) =>
            isAdded ? prev.filter((h) => h.id !== hotel.id) : [...prev, hotel]
        );
    };

    return (
        <PropagationStopper>
            <Button
                onClick={handleToggleSaved}
                className={cn(
                    'transition-colors',
                    isAdded
                        ? 'text-stash hover:stash'
                        : 'text-slate-500 hover:text-slate-500'
                )}
                size="icon"
                variant="stash"
                title={isAdded ? 'Unsave hotel' : 'Save hotel'}
                aria-label={isAdded ? 'Unsave hotel' : 'Save hotel'}
            >
                {isAdded ? (
                    <LucideHeart size={16} className="text-red" />
                ) : (
                    <LucideHeart size={16} />
                )}
            </Button>
        </PropagationStopper>
    );
};
