import React, {useState} from 'react';
import {Calendar, CalendarProps, CalendarChangeEvent} from 'primereact/calendar';

interface RegularCalendar extends Omit<CalendarProps, 'value' | 'onChange'> {
    onChange: (value: Date | Date[] | null) => void;
}

const RegularCalendar: React.FC<RegularCalendar>
    = ({
           onChange,
           ...rest
       }) => {

    const {placeholder} = rest;
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
            <Calendar
                value={dates}
                onChange={handleOnChange}
                showIcon={false}
                placeholder={placeholder}
                {...rest} />
        </div>
    );
};

export default RegularCalendar;
