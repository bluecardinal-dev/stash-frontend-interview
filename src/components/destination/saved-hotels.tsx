import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel } from '@/lib/types';
import { savedHotelsAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { MiniHotelCard } from './hotel-list/mini-hotel-card';

export const SavedHotels: React.FC = () => {
    // ATOMS / STATE
    const savedHotels = useAtomValue(savedHotelsAtom);

    // ACTIONS
    const renderHotels = (hotels: Hotel[]) => {
        return (
            <div className="flex flex-col gap-4">
                {hotels.map((hotel) => (
                    <MiniHotelCard hotel={hotel} key={hotel.id} />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full custom:w-[400px]">
            <Card className="w-full gap-0">
                <CardHeader>
                    <CardTitle className="text-lg">Saved Hotels</CardTitle>
                </CardHeader>
                <CardContent>
                    {!savedHotels || savedHotels.length === 0 ? (
                        <p className="italic">
                            You haven&apos;t saved any hotels yet.
                        </p>
                    ) : (
                        renderHotels(savedHotels)
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
