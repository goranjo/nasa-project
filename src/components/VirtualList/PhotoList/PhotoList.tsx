import React from 'react';
import {FixedSizeList as List} from 'react-window';
import {IPhoto} from "@/modules/MarsRoverPhotos/components/VirtualList/types/IPhoto";
import PhotoItem from "@/components/VirtualList/PhotoList/PhotoItem";

interface PhotoListProps {
    photos: IPhoto[];
    openPreviewModal: (photo: IPhoto) => void;
    renderPhotoItem?: ({ index, style }: { index: number; style: React.CSSProperties }) => React.ReactElement;
}

const PhotoList: React.FC<PhotoListProps> = ({photos, openPreviewModal, renderPhotoItem}) => {
    const defaultRenderPhotoItem = ({index, style}: { index: number; style: React.CSSProperties }) => {
        const photo = photos[index];

        return (
            <PhotoItem key={photo.id} openPreviewModal={openPreviewModal} photo={photo} style={style}/>
        );
    };

    const finalRenderPhotoItem = renderPhotoItem || defaultRenderPhotoItem;

    return (
        <div className="photo-list">
            <List
                height={600}
                width={'auto'}
                itemCount={photos.length}
                itemSize={300}
                itemData={photos}
            >
                {finalRenderPhotoItem}
            </List>
        </div>
    );
};

export default PhotoList;
