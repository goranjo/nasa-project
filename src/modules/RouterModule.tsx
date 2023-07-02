import {Route, Routes} from "react-router-dom";
import React from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import MarsRoverPhotos from "../pages/MarsRoverPhotos/MarsRoverPhotos.tsx";

const APODPage = React.lazy(
    () => import("@/pages/APODPage/APODPage.tsx"),
);

const RouterModule = () => {
    return (
        <HelmetProvider>
            <Routes>
                <Route path="/home" element={<APODPage/>}></Route>
                <Route path="/mars-rover-photos" element={
                    <>
                        <Helmet>
                            <title>Nasa: Mars Rover Photos </title>
                        </Helmet>
                        <MarsRoverPhotos/>
                    </>
                }>

                </Route>
            </Routes>
        </HelmetProvider>
    );
};

export default RouterModule;
