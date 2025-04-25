import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { LucideMinus, LucidePlus } from 'lucide-react';

type CounterProps = {
    count: number;
    label: string;
    min?: number;
    setCount: (count: number) => void;
};

export const Counter: React.FC<CounterProps> = ({
    count,
    label,
    setCount,
    min = 0
}) => {
    const decrementFn = (prevCount: number) => {
        if (prevCount === min) {
            return 0;
        }

        return prevCount - 1;
    };

    const incrementFn = (prevCount: number) => {
        return prevCount + 1;
    };

    return (
        <div className="w-full flex justify-between">
            <Label htmlFor={label} className="font-bold">
                {label}
            </Label>
            <div id={label} className="flex gap-2 items-center">
                <Button
                    size="icon"
                    aria-label={`Decrement ${label}`}
                    onClick={() => setCount(decrementFn(count))}
                    variant="stash"
                    disabled={count === min}
                >
                    <LucideMinus />
                </Button>
                <p className="font-bold text-sm">{count}</p>
                <Button
                    size="icon"
                    aria-label={`Increment ${label}`}
                    onClick={() => setCount(incrementFn(count))}
                    variant="stash"
                >
                    <LucidePlus />
                </Button>
            </div>
        </div>
    );
};
