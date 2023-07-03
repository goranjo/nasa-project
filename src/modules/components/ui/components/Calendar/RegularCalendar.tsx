import React from 'react';
import {Calendar, CalendarProps, CalendarChangeEvent} from 'primereact/calendar';

interface RegularCalendarProps extends Omit<CalendarProps, 'onChange'> {
    onChange: (value: Date | Date[] | null) => void;
    value: Date | undefined;
}

const RegularCalendar: React.FC<RegularCalendarProps>
    = ({
           onChange,
           value,
           ...rest
       }) => {
    const {placeholder} = rest;

    const handleOnChange = (e: CalendarChangeEvent): void => {
        const parsedValue: Date | Date[] | null = e.value instanceof Date ? e.value : null;
        if (onChange) {
            onChange(parsedValue);
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Calendar
                value={value}
                onChange={handleOnChange}
                showIcon={false}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
};

export default RegularCalendar;
