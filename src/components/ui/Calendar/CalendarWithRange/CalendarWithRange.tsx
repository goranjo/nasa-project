import React, {useState, useRef} from 'react';
import {Calendar, CalendarProps, CalendarChangeEvent} from 'primereact/calendar';

interface CalendarWithRange extends Omit<CalendarProps, 'value' | 'onChange'> {
    dateRange?: { startDate: Date | null; endDate: Date | null };
    onChange: (value: Date | Date[] | null) => void;
}

const CalendarWithRange: React.FC<CalendarWithRange> = ({onChange, dateRange, ...rest}) => {
    const {placeholder} = rest;
    const [dates, setDates] = useState<Date | Date[] | null>(null);
    const calendarRef = useRef<Calendar>(null);

    const handleOnChange = (e: CalendarChangeEvent): void => {
        const value = e.value;
        const parsedValue: Date | Date[] | null = typeof value === 'string' ? new Date(value) : value || null;
        setDates(parsedValue);

        let dateRange = null;
        if (Array.isArray(parsedValue)) {
            dateRange = parsedValue.reduce(
                (prev: { startDate: Date | null; endDate: Date | null }, curr: Date, index: number) => {
                    if (index === 0) {
                        return {startDate: curr, endDate: null};
                    } else if (index === 1) {
                        return {...prev, endDate: curr};
                    }
                    return prev;
                },
                {startDate: null, endDate: null}
            );
        }

        onChange(dateRange as Date | Date[] | null);

        if (dateRange?.startDate && dateRange?.endDate) {
            closeCalendar();
        }
    };

    const closeCalendar = () => {
        if (calendarRef.current) {
            calendarRef.current.hide();
        }
    };

    const renderCalendarHeader = () => {
        return (
            <div className="p-d-flex p-ai-center p-jc-between">
                <button className="p-button p-button-text p-button-icon-only" onClick={closeCalendar}>
                    <i className="pi pi-times"/>
                </button>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <div>
                <Calendar
                    ref={calendarRef}
                    selectionMode="range"
                    value={dates || [dateRange?.startDate, dateRange?.endDate] as Date | Date[] | null}
                    onChange={handleOnChange}
                    showIcon={false}
                    placeholder={placeholder}
                    headerTemplate={renderCalendarHeader}
                    {...rest}
                />
            </div>
        </div>
    );
};

export default CalendarWithRange;
