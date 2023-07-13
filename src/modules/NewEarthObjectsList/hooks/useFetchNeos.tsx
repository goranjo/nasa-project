import { useQuery } from 'react-query';
import { formatEarthDate } from '@/modules/MarsRoverPhotos/helpers/helpers';
import config from '@/config/config';
import { INeo } from '@/modules/NewEarthObjectsList/types/INeo';

export function useFetchNEOs(startDate: string | Date | null, endDate: string | Date | null) {
    return useQuery<INeo[], Error>(['neos', startDate, endDate], async () => {
        const formattedStartDate = formatEarthDate(startDate);
        const formattedEndDate = formatEarthDate(endDate);

        const response = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${config.NASA_API_KEY}`
        );
        const data = await response.json();

        const neoData = data.near_earth_objects;
        const neos: INeo[] = [];

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

        return neos;
    });
}
