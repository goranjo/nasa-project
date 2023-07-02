import React, {useState} from 'react';
import {Image, ImageContainer, Title} from "@/modules/APOD/APODImage/APODImage.styled.ts";

interface APODImageProps {
    title: string;
    url: string;
    onLoad?: () => void;
}

const APODImage: React.FC<APODImageProps> = ({title, url, onLoad}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (onLoad) {
            onLoad();
        }
    };

    return (
        <ImageContainer className={`apod-image ${isLoaded ? 'loaded' : ''}`}>
            <Title>{title}</Title>
            <Image src={url} alt={title} onLoad={handleImageLoad} isloaded={isLoaded} />
        </ImageContainer>
    );
};

export default APODImage;
