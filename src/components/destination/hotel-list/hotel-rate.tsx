import { Skeleton } from '@/components/ui/skeleton';
import { HotelRate as HotelRateType } from '@/lib/types';
import { calculateDiscountRateDiff } from '@/lib/utils';

type HotelRateProps = {
    rate: HotelRateType | null;
    isLoading: boolean;
};

export const HotelRate: React.FC<HotelRateProps> = ({ rate, isLoading }) => {
    if (isLoading || !rate) {
        return (
            <div className="flex flex-col items-end space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        );
    }
    return (
        <div className="flex flex-col items-end gap-0">
            {rate.has_member_rate && (
                <div className="p-2 rounded-lg bg-green-800 text-white text-xs font-bold">
                    ${calculateDiscountRateDiff(rate.daily_rate)} off
                </div>
            )}
            <div className="flex gap-2 items-center">
                {rate.has_member_rate && (
                    <p className="line-through text-sm">${rate.daily_rate}</p>
                )}
                <p className="font-bold text-xl">${rate.daily_rate}</p>
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-[10px] text-slate-600">Daily rate</p>{' '}
                {rate.has_member_rate && (
                    <p className="text-[10px] text-slate-600">
                        / Member discount applied
                    </p>
                )}
            </div>
        </div>
    );
};
