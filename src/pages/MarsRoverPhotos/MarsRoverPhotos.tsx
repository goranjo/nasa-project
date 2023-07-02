import {APODContainer} from "./MarsRoverPhotos.styled.tsx";
import Breadcrumbs from "@/modules/BreadcrumbsModule/BreadCrumbsModule.tsx";
import CalendarWithRange from "../../modules/components/ui/components/Calendar/CalendarWithRange/CalendarWithRange.tsx";
// import {useState} from "react";
// import {Dialog} from "primereact/dialog";

function MarsRoverPhotos() {
    // const [visible, setVisible] = useState<boolean>(false);

    // const showDialog = () => {
    //     setVisible(true);
    // };

    return (
        <>
            <Breadcrumbs/>
            <APODContainer>
                <CalendarWithRange/>
            </APODContainer>
        </>
    )
}

export default MarsRoverPhotos
