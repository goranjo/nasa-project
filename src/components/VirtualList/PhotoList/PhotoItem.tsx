import React from "react";
import {IPhoto} from "@/modules/MarsRoverPhotos/components/VirtualList/types/IPhoto";

export interface PhotoItemProps {
    photo: IPhoto;
    openPreviewModal: (photo: IPhoto) => void;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const PhotoItem: React.FC<PhotoItemProps> = ({photo, openPreviewModal, style, children}): React.ReactElement => {
    return (
        <div key={photo.id} style={{...style, marginBottom: '10px', display: 'flex'}}>
            <div
                className="photo-item"
                style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                <img
                    style={{maxHeight: '100%', maxWidth: '100%', padding: '5px'}}
                    src={photo.img_src}
                    alt={photo.id.toString()}
                    className="thumbnail"
                    onClick={() => openPreviewModal(photo)}
                />
                {children}
            </div>
        </div>
    );
};

export default PhotoItem;