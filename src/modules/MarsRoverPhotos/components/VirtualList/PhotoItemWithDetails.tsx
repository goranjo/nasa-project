import React from "react";
import styled from "styled-components";
import {formatEarthDate} from "@/modules/MarsRoverPhotos/helpers/helpers";
import PhotoItem, {PhotoItemProps} from "@/components/VirtualList/PhotoList/PhotoItem";

const PhotoItemWrapper = styled.div`
  position: relative;

  &:hover .photo-details {
    display: block !important;
  }
`;

const PhotoDetails = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: none;
  z-index: 1;
  cursor: pointer;
`;

const PhotoItemWithDetails: React.FC<PhotoItemProps> = ({photo, openPreviewModal, style}): React.ReactElement => {
    const stylePhotoItem = {
        ...style,
        width: "unset",
    };

    const handleOpenModal = () => {
        openPreviewModal(photo);
    };

    return (
        <PhotoItemWrapper>
            <PhotoItem photo={photo} openPreviewModal={openPreviewModal} style={stylePhotoItem}>
                <PhotoDetails className="photo-details" onClick={handleOpenModal}>
                    <p>Earth Date: {formatEarthDate(photo.earth_date)}</p>
                    <p>Camera Full Name: {photo.camera?.full_name}</p>
                </PhotoDetails>
            </PhotoItem>
        </PhotoItemWrapper>
    );
};

export default PhotoItemWithDetails;
