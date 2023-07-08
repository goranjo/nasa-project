import React from "react";
import PhotoList from "@/components/VirtualList/PhotoList/PhotoList.tsx";
import PhotoItemWithDetails from "@/modules/MarsRoverPhotos/components/VirtualList/PhotoItemWithDetails.tsx";
import {PhotoListWrapper} from "@/modules/MarsRoverPhotos/components/VirtualList/MarsPhotoVirtualList.styled.tsx";

const MarsPhotoVirtualList: React.FC<ExtendedPhotoListProps> = ({photos, openPreviewModal}) => {
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