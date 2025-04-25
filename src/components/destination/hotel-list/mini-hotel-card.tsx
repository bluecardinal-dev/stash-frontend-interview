import Image from 'next/image';
import { Hotel } from '@/lib/types';
import { LucideMapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSetAtom } from 'jotai';
import { savedHotelsAtom } from '@/store';
import { PropagationStopper } from '@/components/ui/propogation-stopper';
import { Card, CardContent } from '@/components/ui/card';

type MiniHotelCardProps = {
    hotel: Hotel;
};

export const MiniHotelCard: React.FC<MiniHotelCardProps> = ({ hotel }) => {
    const setSavedHotels = useSetAtom(savedHotelsAtom);

    const handleToggleSaved = () => {
        setSavedHotels((prev) => prev.filter((h) => h.id !== hotel.id));
    };

    return (
        <Link href={`/hotel/${hotel.slug[0]}/${hotel.slug[1]}`}>
            <Card>
                <CardContent className="flex flex-col md:flex-row gap-4">
                    <Image
                        src={hotel.image}
                        alt={`${hotel.name} - ${hotel.city}`}
                        height={500}
                        width={500}
                        priority={true}
                        className="rounded-xl w-full h-full md:w-auto md:h-[75px]"
                    />
                    <div className="flex gap-1 flex-col grow">
                        <p className=" font-bold transition-all hover:underline underline-offset-4">
                            {hotel.name}
                        </p>
                        <div className="flex items-center text-slate-600 gap-1">
                            <LucideMapPin size={14} />
                            <p className="text-sm">{hotel.city}</p>
                        </div>
                        <div>
                            <PropagationStopper>
                                <Button
                                    variant="link"
                                    className="p-0 text-sm h-auto"
                                    onClick={handleToggleSaved}
                                >
                                    Remove
                                </Button>
                            </PropagationStopper>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
