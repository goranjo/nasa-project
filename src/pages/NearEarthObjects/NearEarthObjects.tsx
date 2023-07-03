import NewEarthObjectList from "@/modules/NewEarthObjectsList";
import Breadcrumbs from "@/modules/BreadcrumbsModule/BreadCrumbsModule.tsx";

const NearEarthObjects = () => {
  return (
      <div>
          <Breadcrumbs/>
          <h2>New Earth Object List</h2>
          <NewEarthObjectList/>
      </div>
  )
}

export default NearEarthObjects;