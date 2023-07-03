import config from '@/config/config.ts';
import {formatEarthDate} from "@/modules/MarsRoverPhotos/helpers/helpers.ts";
import {MarsRover} from "@/modules/MarsRoverPhotos/types/enums/MarsRover.tsx";
import {IMarsRoverPhoto} from "@/modules/MarsRoverPhotos/types/IMarsRoverPhoto.tsx";

export async function fetchMarsRoverPhotos(rover: MarsRover, date: Date): Promise<IMarsRoverPhoto> {
    const formattedDate = formatEarthDate(date);
    const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${formattedDate}&api_key=${config.NASA_API_KEY}`
    );
    const data: IMarsRoverPhoto = await response.json();
    return data;
}
