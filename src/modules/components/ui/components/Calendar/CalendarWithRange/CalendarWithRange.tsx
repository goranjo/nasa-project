import React, {useState} from 'react';
import {Calendar, CalendarProps, CalendarChangeEvent} from 'primereact/calendar';

interface CalendarWithRange extends Omit<CalendarProps, 'value' | 'onChange'> {
    // dateRange?: Date | Date[] | null;
    onChange?: (value: Date | Date[] | null) => void;
}

const CalendarWithRange: React.FC<CalendarWithRange>
    = ({
           onChange,
           ...rest
       }) => {
    const [dates, setDates] = useState<string | Date | Date[] | null>(null);

    const handleOnChange = (e: CalendarChangeEvent): void => {
        const value = e.value;
        const parsedValue = typeof value === 'string' ? new Date(value) : value || null;
        setDates(parsedValue)
        if (onChange) {
            onChange(parsedValue);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Calendar selectionMode="range" value={dates} onChange={handleOnChange} showIcon {...rest} />
        </div>
    );
};

export default CalendarWithRange;
