import React, { useEffect, useState } from 'react';
import NEOItem from '@/modules/NewEarthObjectsList/NeoItem/NeoItem';
import { iNEO } from '@/modules/NewEarthObjectsList/types/iNEO';
import config from '@/config/config';
import { formatEarthDate } from '@/modules/MarsRoverPhotos/helpers/helpers';
import {Link} from "react-router-dom";

interface NEOListProps {
    startDate: string | Date | null;
    endDate: string | Date | null;
}

const NEOList: React.FC<NEOListProps> = ({ startDate, endDate }) => {
    const [neos, setNEOs] = useState<iNEO[]>([]);

    useEffect(() => {
        const fetchNEOs = async () => {
            try {
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
            } catch (error) {
                console.error('Error fetching NEO data:', error);
            }
        };

        if (startDate && endDate) {
            fetchNEOs();
        }
    }, [startDate, endDate]);

    //pass to Link component neo.singleLink
    return (
        <div>
            {neos.map((neo) => (
                <Link key={neo.id} to={`/near-earth-objects/neo-details/${neo.id}`}>
                    <NEOItem neo={neo} />
                </Link>
            ))}
        </div>
    );
};

export default NEOList;
