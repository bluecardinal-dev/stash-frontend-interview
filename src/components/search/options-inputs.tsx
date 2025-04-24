import { DatePickerWithRange } from '../ui/date-picker';
import { Separator } from '../ui/separator';
import { TravelersSelection } from './travelers-selection';

export const OptionsInputs = () => {
    return (
        <div className="content-center flex items-center gap-1">
            <TravelersSelection />
            <Separator orientation="vertical" className="!h-[30px]" />
            <DatePickerWithRange />
        </div>
    );
};
