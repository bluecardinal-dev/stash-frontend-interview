'use client';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import { LucideUsers2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Counter } from './counter';

export const TravelersSelection: React.FC = () => {
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="stash">
                    <LucideUsers2 />
                    {adults + children}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-full flex flex-col gap-2">
                    <Counter
                        label="Adults"
                        count={adults}
                        setCount={setAdults}
                    />
                    <Counter
                        label="Children"
                        count={children}
                        setCount={setChildren}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};
