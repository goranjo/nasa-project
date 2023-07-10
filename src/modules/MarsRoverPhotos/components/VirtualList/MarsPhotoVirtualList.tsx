import React from "react";
import PhotoList from "@/components/VirtualList/PhotoList/PhotoList";
import PhotoItemWithDetails from "@/modules/MarsRoverPhotos/components/VirtualList/PhotoItemWithDetails";
import {PhotoListWrapper} from "@/modules/MarsRoverPhotos/components/VirtualList/MarsPhotoVirtualList.styled";
import {IPhoto} from "@/modules/MarsRoverPhotos/components/VirtualList/types/IPhoto";

interface PhotoItemProps {
    photos: IPhoto[];
    openPreviewModal: (photo: IPhoto) => void;
}

const MarsPhotoVirtualList: React.FC<PhotoItemProps> = ({photos, openPreviewModal}) => {
    const renderPhotoItem = ({index, style}: { index: number; style: React.CSSProperties }) => {
        const photo = photos[index];

        return (
            <PhotoItemWithDetails
                photo={photo}
                openPreviewModal={openPreviewModal}
                style={style}
            />
        );
    };

    return (
        <PhotoListWrapper>
            <PhotoList
                photos={photos}
                openPreviewModal={openPreviewModal}
                renderPhotoItem={renderPhotoItem}
            />
        </PhotoListWrapper>

    );
};

export default MarsPhotoVirtualList;