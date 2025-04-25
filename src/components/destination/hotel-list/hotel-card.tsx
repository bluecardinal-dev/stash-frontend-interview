import Image from 'next/image';
import { Card, CardContent } from '../../ui/card';
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
    size?: 'list' | 'main';
};

export const HotelCard: React.FC<HotelCardProps> = ({
    hotel,
    rate,
    isRateLoading,
    size = 'list'
}) => {
    return (
        <Card className={`mb-8 ${size === 'main' && 'w-full mt-[40px]'}`}>
            <CardContent className="flex flex-col custom:flex-row gap-4">
                <Image
                    src={hotel.image}
                    alt={`${hotel.name} - ${hotel.city}`}
                    height={500}
                    width={500}
                    priority={true}
                    className={`rounded-xl ${size === 'list' ? 'md:w-[300px]' : 'md:w-[500px]'} w-full h-auto`}
                />
                <div className="flex gap-2 flex-col grow">
                    <p className="text-2xl font-medium transition-all hover:underline underline-offset-4 ml-[10px]">
                        {hotel.name}
                    </p>
                    <div className="flex items-center text-slate-600 gap-1 ml-[10px]">
                        <LucideMapPin size={14} />
                        <p>{hotel.city}</p>
                    </div>
                    {size === 'main' && (
                        <p className="text-slate-700 max-w-[700px] ml-[10px]">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry&apos;s standard dummy text ever since the
                            1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It
                            has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the
                            1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop
                            publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>
                    )}
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
