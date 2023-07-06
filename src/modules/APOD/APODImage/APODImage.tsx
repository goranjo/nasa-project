import React, {useState} from 'react';
import * as Styles from "@/modules/APOD/APODImage/APODImage.styled.ts";
import {formatDateStringToHumanReadable} from "@/modules/APOD/helpers/helpers.tsx";

interface APODImageProps {
    title: string;
    url: string;
    date: string;
    onLoad?: () => void;
}

const APODImage: React.FC<APODImageProps> = ({title, url, date, onLoad}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad();
        }
    };

    return (
        <Styles.ImageContainer className={`apod-image ${isLoaded ? 'loaded' : ''}`}>
            <Styles.Title>{title}</Styles.Title>
            <Styles.Date>{formatDateStringToHumanReadable(date, 'MMMM DD, YYYY')}</Styles.Date>
            <Styles.Image src={url} alt={title} onLoad={handleImageLoad} isloaded={isLoaded.toString()} />
        </Styles.ImageContainer>
    );
};

export default APODImage;
