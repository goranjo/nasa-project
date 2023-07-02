import config from '@/config/config.ts';
import {IAPODResponse} from "@/modules/APOD/types/IAPODDataResponse.ts";

export async function fetchAPOD(): Promise<IAPODResponse> {
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?count=1&api_key=${config.NASA_API_KEY}`
    );
    return await response.json();
}
