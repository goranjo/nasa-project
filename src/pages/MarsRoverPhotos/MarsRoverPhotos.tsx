import {MarsRoverPhotosContainer} from "./MarsRoverPhotos.styled.tsx";
import Breadcrumbs from "@/modules/BreadcrumbsModule/BreadCrumbsModule.tsx";
import MarsRoverPhotoViewer from "@/modules/MarsRoverPhotos";

function MarsRoverPhotos() {
    return (
        <>
            <Breadcrumbs/>
            <MarsRoverPhotosContainer>
                <MarsRoverPhotoViewer/>
            </MarsRoverPhotosContainer>
        </>
    )
}

export default MarsRoverPhotos
