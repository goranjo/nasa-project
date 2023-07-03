import React, {useState} from 'react';
import CalendarWithRange from '@/modules/components/ui/components/Calendar/CalendarWithRange/CalendarWithRange.tsx';
import NeoList from '@/modules/NewEarthObjectsList/NeoList/NeoList.tsx';

const NewEarthObjectList: React.FC = () => {
    const [dateRange, setDateRange] = useState<{ startDate: Date | null, endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });

    const handleDateRangeChange = (dates: { startDate: Date | null, endDate: Date | null }) => {
        setDateRange({startDate: dates.startDate, endDate: dates.endDate});
    };

    return (
        <div>
            <CalendarWithRange
                placeholder={'Select a range'}
                onChange={handleDateRangeChange as unknown as (value: Date | Date[] | null) => void}
            />
            <NeoList startDate={dateRange.startDate} endDate={dateRange.endDate}/>
        </div>
    );
};

export default NewEarthObjectList;
