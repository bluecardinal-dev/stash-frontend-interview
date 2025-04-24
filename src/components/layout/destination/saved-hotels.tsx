import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel } from '@/lib/types';
import { savedHotelsAtom } from '@/store';
import { useAtomValue } from 'jotai';
import { MiniHotelCard } from './hotel-list/mini-hotel-card';

export const SavedHotels: React.FC = () => {
    const savedHotels = useAtomValue(savedHotelsAtom);

    const renderHotels = (hotels: Hotel[]) => {
        return (
            <>
                {hotels.map((hotel) => (
                    <MiniHotelCard hotel={hotel} key={hotel.id} />
                ))}
            </>
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
