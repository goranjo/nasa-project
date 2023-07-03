import React, {useState} from 'react';
import {Calendar, CalendarProps, CalendarChangeEvent} from 'primereact/calendar';

interface CalendarWithRange extends Omit<CalendarProps, 'value' | 'onChange'> {
    // dateRange?: Date | Date[] | null;
    onChange: (value: Date | Date[] | null) => void;
}

const CalendarWithRange: React.FC<CalendarWithRange>
    = ({
           onChange,
           ...rest
       }) => {

    const {placeholder} = rest;
    const [dates, setDates] = useState<string | Date | Date[] | null>(null);

    const handleOnChange = (e: CalendarChangeEvent): void => {
        const value = e.value;
        const parsedValue: Date | Date[] | null = typeof value === 'string' ? new Date(value) : value || null;
        setDates(parsedValue);

        let dateRange = null;
        if (Array.isArray(parsedValue)) {
            dateRange = parsedValue.reduce((prev: { startDate: Date | null, endDate: Date | null }, curr: Date, index: number) => {
                if (index === 0) {
                    return { startDate: curr, endDate: null };
                } else if (index === 1) {
                    return { ...prev, endDate: curr };
                }
                return prev;
            }, { startDate: null, endDate: null });
        }

        onChange(dateRange as Date | Date[] | null);
    };


    return (
        <div className="card flex justify-content-center">
            <Calendar
                selectionMode="range"
                value={dates}
                onChange={handleOnChange}
                showIcon={false}
                placeholder={placeholder}
                {...rest} />
        </div>
    );
};

export default CalendarWithRange;
