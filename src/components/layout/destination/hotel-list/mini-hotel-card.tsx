import Image from 'next/image';
import { Card, CardContent } from '../../../ui/card';
import { Hotel } from '@/lib/types';
import { LucideMapPin } from 'lucide-react';
import Link from 'next/link';

type MiniHotelCardProps = {
    hotel: Hotel;
};

export const MiniHotelCard: React.FC<MiniHotelCardProps> = ({ hotel }) => {
    return (
        <Link href={`/hotel/${hotel.slug[0]}/${hotel.slug[1]}`}>
            <Card className="mb-8">
                <CardContent className="flex flex-col md:flex-row gap-4">
                    <Image
                        src={hotel.image}
                        alt={`${hotel.name} - ${hotel.city}`}
                        height={500}
                        width={500}
                        priority={true}
                        className="rounded-xl w-auto h-[75px]"
                    />
                    <div className="flex gap-1 flex-col grow">
                        <p className=" font-bold transition-all hover:underline underline-offset-4">
                            {hotel.name}
                        </p>
                        <div className="flex items-center text-slate-600 gap-1">
                            <LucideMapPin size={14} />
                            <p className="text-sm">{hotel.city}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
