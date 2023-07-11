import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import NEOItem from '@/modules/NewEarthObjectsList/NeoItem/NeoItem';
import { iNEO } from '@/modules/NewEarthObjectsList/types/iNEO';
import config from '@/config/config';
import { formatEarthDate } from '@/modules/MarsRoverPhotos/helpers/helpers';
import { Link } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

interface NEOListProps {
    neos: iNEO[];
    setNEOs: (neos: iNEO[]) => void;
    startDate: string | Date | null;
    endDate: string | Date | null;
}

const NEOList: React.FC<NEOListProps> = ({neos, setNEOs, startDate, endDate }): React.ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchNEOs = async (): Promise<void> => {
        try {
            setLoading(true);
            setNEOs([]);

            const formattedStartDate = formatEarthDate(startDate);
            const formattedEndDate = formatEarthDate(endDate);

            const response = await fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${config.NASA_API_KEY}`
            );
            const data = await response.json();

            const neoData = data.near_earth_objects;
            const neos: iNEO[] = [];

            for (const date in neoData) {
                const neoItems = neoData[date];

                for (const neoItem of neoItems) {
                    const closestDistance = neoItem.close_approach_data[0]?.miss_distance?.lunar;

                    if (closestDistance !== undefined) {
                        neos.push({
                            id: neoItem.id,
                            name: neoItem.name,
                            singleNeo: neoItem.links.self,
                            closestDistance: parseFloat(closestDistance),
                        });
                    }
                }
            }

            setNEOs(neos);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching NEO data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (startDate && endDate) {
            fetchNEOs();
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (neos.length > 0) {
            localStorage.setItem('searchResults', JSON.stringify(neos));
        }
        if (startDate && endDate) {
            localStorage.setItem('searchParams', JSON.stringify({ startDate, endDate }));
        }
    }, [neos, startDate, endDate]);

    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem('searchResults') || '[]');
        setNEOs(storedResults);

        const storedSearchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
        const { startDate: storedStartDate, endDate: storedEndDate } = storedSearchParams;
        if (storedStartDate && storedEndDate) {
            fetchNEOs();
        }
    }, []);

    const renderNEOItem = ({ index, style }: any) => {
        const neo = neos[index];

        return (
            <Link key={neo.id} to={`/near-earth-objects/${neo.id}`} style={style}>
                <NEOItem neo={neo} />
            </Link>
        );
    };

    return (
        <div>
            {loading && (
                <ProgressSpinner
                    style={{
                        width: '10%',
                        alignItems: 'center',
                        display: 'flex',
                        height: '300px',
                    }}
                />
            )}
            {neos.length === 0 ? (
                <p>No search results available.</p>
            ) : (
                <FixedSizeList height={400} itemCount={neos.length} itemSize={60} width={'100%'}>
                    {renderNEOItem}
                </FixedSizeList>
            )}
        </div>
    );
};

export default NEOList;
