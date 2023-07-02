import React, {useEffect, useState} from 'react';
import APODImage from '@/modules/APOD/APODImage/APODImage.tsx';
import {fetchAPOD} from '@/modules/APOD/APODService.tsx';
import {IAPODData} from "@/modules/APOD/types/IAPODData.ts";
import {IAPODResponse} from "@/modules/APOD/types/IAPODDataResponse.ts";
import {TransitionContainer} from "@/modules/APOD/APOD/APOD.styled.ts";

const APOD: React.FC = () => {
    const [apodData, setApodData] = useState<IAPODData | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imageKey, setImageKey] = useState(0);

    useEffect(() => {
        const timer = setInterval(fetchData, 10000);
        fetchData();

        return () => {
            clearInterval(timer);
        };
    }, []);

    const fetchData = async () => {
        try {
            const response: IAPODResponse = await fetchAPOD();
            const data: IAPODData | null = response[0];

            // if (data) {
            setIsTransitioning(true);
            setTimeout(() => {
                setIsTransitioning(false);
                setApodData(data);
                setImageKey((prevKey) => prevKey + 1);
            }, 1000);
            // }
        } catch (error) {
            console.error('Error fetching APOD:', error);
        }
    };
    if (!apodData) {
        return <div>Incoming...</div>;
    }

    return (
        <div>
            <h1>Astronomy Picture of the Day</h1>
            <span>{apodData.date}</span>
            <TransitionContainer transitioning={isTransitioning}>
                <APODImage
                    key={imageKey}
                    title={apodData.title}
                    url={apodData.url}
                    onLoad={() => setIsTransitioning(false)}
                />
            </TransitionContainer>
            <p>{apodData.explanation}</p>
        </div>
    );
};

export default APOD;
