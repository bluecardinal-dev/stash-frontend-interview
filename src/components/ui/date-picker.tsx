'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';

interface DatePickerWithRangeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    defaultRange?: DateRange;
    onRangeChange?: (range?: DateRange) => void;
}

export function DatePickerWithRange({
    className,
    defaultRange,
    onRangeChange
}: DatePickerWithRangeProps) {
    // STATE
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), 1),
        to: addDays(new Date(), 4)
    });

    // ACTIONS
    React.useEffect(() => {
        if (defaultRange) {
            setDate(defaultRange);
        }
    }, [defaultRange]);

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant="ghost"
                        className={cn(
                            'justify-start text-left font-normal cursor-pointer font-bold text-stash-dark hover:text-stash-dark rounded-3xl',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => {
                            setDate(range);
                            if (onRangeChange) onRangeChange(range);
                        }}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
