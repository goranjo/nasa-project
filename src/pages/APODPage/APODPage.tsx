import Breadcrumbs from "@/modules/BreadcrumbsModule/BreadCrumbsModule.tsx";
import APOD from "@/modules/APOD";

function APODPage() {
    return (
        <>
            <Breadcrumbs/>
            <div>
                <APOD/>
            </div>
        </>

    )
}

export default APODPage