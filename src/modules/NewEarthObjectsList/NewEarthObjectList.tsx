import React, {useState, useEffect} from 'react';
import CalendarWithRange from '@/components/ui/Calendar/CalendarWithRange/CalendarWithRange';
import NeoList from '@/modules/NewEarthObjectsList/NeoList/NeoList';

const NewEarthObjectList: React.FC = (): React.ReactElement => {
    const [dateRange, setDateRange] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null,
    });

    useEffect(() => {
        const storedSearchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
        const {startDate: storedStartDate, endDate: storedEndDate} = storedSearchParams;
        if (storedStartDate && storedEndDate) {
            setDateRange({
                startDate: new Date(storedStartDate),
                endDate: new Date(storedEndDate),
            });
        }
    }, []);

    const handleDateRangeChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
        setDateRange({startDate: dates.startDate, endDate: dates.endDate});
    };

    return (
        <div>
            <CalendarWithRange
                placeholder="Select a range"
                dateRange={dateRange}
                onChange={handleDateRangeChange as unknown as (value: Date | Date[] | null) => void}
            />
            <NeoList startDate={dateRange.startDate} endDate={dateRange.endDate}/>
        </div>
    );
};

export default NewEarthObjectList;
