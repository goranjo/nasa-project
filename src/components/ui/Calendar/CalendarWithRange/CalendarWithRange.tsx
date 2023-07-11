import React, {useState, useRef, useEffect} from 'react';
import {Calendar, CalendarProps, CalendarChangeEvent} from 'primereact/calendar';

interface CalendarWithRange extends Omit<CalendarProps, 'value' | 'onChange'> {
    dateRange?: { startDate: Date | string | null; endDate: Date | string | null };
    onChange: (value: { startDate: Date | null; endDate: Date | null }) => void;
}

const CalendarWithRange: React.FC<CalendarWithRange> = ({onChange, dateRange, ...rest}) => {
    const {placeholder} = rest;
    const [dates, setDates] = useState<Date | Date[] | null>([]);
    const calendarRef = useRef<Calendar>(null);

    useEffect(() => {
        if (dateRange?.startDate === null && dateRange?.endDate === null) {
            setDates([])
        } else {
            setDates([dateRange?.startDate as Date, dateRange?.endDate as Date]);
        }
    }, [dateRange])

    const handleOnChange = (e: CalendarChangeEvent): void => {
        const value = e.value;
        const parsedValue: Date | Date[] | null = typeof value === 'string' ? new Date(value) : value || null;
        setDates(parsedValue);

        let datesRanges = null;
        if (Array.isArray(parsedValue)) {
            datesRanges = parsedValue.reduce(
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

        onChange(datesRanges as { startDate: Date | null; endDate: Date | null });

        if (dateRange?.startDate && dateRange?.endDate) {
            console.log('aaaaaaaaaa')
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
                    value={dates}
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
