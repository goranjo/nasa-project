import React, { useRef } from 'react';
import { FixedSizeList as List } from 'react-window';

interface Photo {
    id: number;
    img_src: string;
}

interface PhotoListProps {
    photos: Photo[];
    openPreviewModal: (photo: Photo) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, openPreviewModal }) => {
    const lastPhotoRef = useRef<HTMLDivElement>(null);

    const renderPhotoItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const photo = photos[index];
        return (
            <div key={photo.id} className="photo-item" style={style} ref={index === photos.length - 1 ? lastPhotoRef : undefined}>
                <img
                    style={{marginBottom: '10px'}}
                    src={photo.img_src}
                    alt={photo.id.toString()}
                    className="thumbnail"
                    onClick={() => openPreviewModal(photo)}
                />
            </div>
        );
    };

    return (
        <div className="photo-list">
            <List
                style={{cursor: 'pointer'}}
                height={600}
                width={'auto'}
                itemCount={photos.length}
                itemSize={100}
                itemData={photos}
            >
                {renderPhotoItem}
            </List>
        </div>
    );
};

export default PhotoList;
