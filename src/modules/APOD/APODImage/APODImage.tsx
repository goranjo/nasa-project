import React, { useState } from 'react';
import * as Styles from '@/modules/APOD/APODImage/APODImage.styled';
import { formatDateStringToHumanReadable } from '@/modules/APOD/helpers/helpers';
import { Skeleton } from 'primereact/skeleton';

interface APODImageProps {
    title: string;
    url: string;
    date: string;
    onLoad?: () => void;
}

const APODImage: React.FC<APODImageProps> = ({ title, url, date, onLoad }): React.ReactElement => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad();
        }
    };

    return (
        <Styles.ImageContainer className={`apod-image ${isLoaded ? 'loaded' : ''}`}>
            {!isLoaded && (
                <Skeleton
                    shape="rectangle"
                    size="500px"
                    style={{ display: 'flex', marginRight: '10px' }}
                />
            )}
            <Styles.Title>{title}</Styles.Title>
            <Styles.Date>{formatDateStringToHumanReadable(date, 'MMMM DD, YYYY')}</Styles.Date>
            <Styles.Image src={url} alt={title} onLoad={handleImageLoad} isloaded={isLoaded.toString()} />
        </Styles.ImageContainer>
    );
};

export default APODImage;
