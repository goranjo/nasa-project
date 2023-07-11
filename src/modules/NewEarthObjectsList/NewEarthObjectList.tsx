import React, {useState, useEffect} from 'react';
import CalendarWithRange from '@/components/ui/Calendar/CalendarWithRange/CalendarWithRange';
import NeoList from '@/modules/NewEarthObjectsList/NeoList/NeoList';
import {Button} from "primereact/button";
import {iNEO} from "@/modules/NewEarthObjectsList/types/iNEO.tsx";

const NewEarthObjectList: React.FC = (): React.ReactElement => {
    const [dateRange, setDateRange] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null,
    });
    const [neos, setNEOs] = useState<iNEO[]>([]);

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

    const handleClearClick = () => {
        setDateRange({startDate: null, endDate: null});
        setNEOs([]);
        localStorage.removeItem('searchResults');
        localStorage.removeItem('searchParams');
    };

    return (
        <div>
            <div style={{display: 'flex'}}>
                <CalendarWithRange
                    style={{width: '220px'}}
                    placeholder="Select a range"
                    dateRange={dateRange as { startDate: Date | null; endDate: Date | null }}
                    onChange={(value: Date | { startDate: Date | null; endDate: Date | null } | null) => handleDateRangeChange(value as { startDate: Date | null; endDate: Date | null })}
                />
                {dateRange.startDate !== null && (
                    <div className="p-inputgroup">
                        <Button icon="pi pi-times" className="p-button-rounded p-button-text" onClick={handleClearClick}/>
                    </div>
                )}
            </div>

            <NeoList neos={neos} setNEOs={setNEOs} startDate={dateRange.startDate} endDate={dateRange.endDate}/>
        </div>
    );
};

export default NewEarthObjectList;
