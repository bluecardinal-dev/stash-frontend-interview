/* eslint-disable @typescript-eslint/no-explicit-any */
const preventDefaultPropagtion = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
) => {
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
    e.preventDefault();
    e.stopPropagation();
};

type PropagationStopperProps = React.HTMLAttributes<HTMLDivElement>;

export const PropagationStopper = ({
    children,
    onClick,
    ...props
}: PropagationStopperProps) => {
    const handleEvent = (e: React.MouseEvent | React.KeyboardEvent) => {
        preventDefaultPropagtion(
            e as React.MouseEvent<HTMLElement, MouseEvent>
        );
        if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
        onClick?.(e as any);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleEvent}
            onKeyDown={handleEvent}
            {...props}
        >
            {children}
        </div>
    );
};
