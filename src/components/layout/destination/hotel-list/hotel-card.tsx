import Image from 'next/image';
import { Card, CardContent } from '../../../ui/card';
import { Hotel, HotelRate as HotelRateType } from '@/lib/types';
import { LucideMapPin } from 'lucide-react';
import { HotelRate } from './hotel-rate';
import { CopyLinkToClipboard } from '@/components/ui/copy-link-to-clipboard';
import { BASE_URL } from '@/lib/constants';
import { AddSavedHotel } from './add-saved-hotel';

type HotelCardProps = {
    hotel: Hotel;
    rate: HotelRateType | null;
    isRateLoading: boolean;
};

export const HotelCard: React.FC<HotelCardProps> = ({
    hotel,
    rate,
    isRateLoading
}) => {
    return (
        <Card className="mb-8">
            <CardContent className="flex flex-col md:flex-row gap-4">
                <Image
                    src={hotel.image}
                    alt={`${hotel.name} - ${hotel.city}`}
                    height={500}
                    width={500}
                    priority={true}
                    className="rounded-xl w-full h-full md:w-[300px] md:h-auto"
                />
                <div className="flex gap-2 flex-col grow">
                    <p className="text-2xl font-medium transition-all hover:underline underline-offset-4">
                        {hotel.name}
                    </p>
                    <div className="flex items-center text-slate-600 gap-1">
                        <LucideMapPin size={14} />
                        <p>{hotel.city}</p>
                    </div>
                    <div className="flex justify-between grow w-full items-end">
                        <div className="flex">
                            <CopyLinkToClipboard
                                url={`${BASE_URL}/hotel/${hotel.slug[0]}/${hotel.slug[1]}`}
                            />
                            <AddSavedHotel hotel={hotel} />
                        </div>
                        <HotelRate rate={rate} isLoading={isRateLoading} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
