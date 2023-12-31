import {Route, Routes} from "react-router-dom";
import React, {Suspense} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import CustomMenuBar from "@/components/MenuBar/CustomMenuBar";
import NeoDetails from "@/modules/NewEarthObjectsList/NeoDetails/NeoDetails";

const HomePage = React.lazy(
    () => import("@/pages/HomePage/HomePage"),
);

const APODPage = React.lazy(
    () => import("@/pages/APODPage/APODPage"),
);

const MarsRoverPhotos = React.lazy(
    () => import("@/pages/MarsRoverPhotos/MarsRoverPhotos"),
);

const NearEarthObjects = React.lazy(
    () => import("@/pages/NearEarthObjects/NearEarthObjects"),
);

const RouterModule = () => {

    return (
        <HelmetProvider>
            <CustomMenuBar/>
            <Routes>
                <Route path="/" element={
                    <>
                        <Helmet>
                            <title>Nasa: Home </title>
                        </Helmet>
                        <Suspense fallback={<div>Loading...</div>}>
                            <HomePage/>
                        </Suspense>
                    </>
                }></Route>
                <Route path="/astronomy-picture-of-the-day" element={
                    <>
                        <Helmet>
                            <title>Nasa: Astronomy Picture of the Day </title>
                        </Helmet>
                        <Suspense fallback={<div>Loading...</div>}>
                            <APODPage/>
                        </Suspense>
                    </>
                }></Route>
                <Route path="/mars-rover-photos" element={
                    <>
                        <Helmet>
                            <title>Nasa: Mars Rover Photos </title>
                        </Helmet>
                        <Suspense fallback={<div>Incoming...</div>}>
                            <MarsRoverPhotos/>
                        </Suspense>
                    </>
                }></Route>

                <Route path="/near-earth-objects" element={
                    <>
                        <Helmet>
                            <title>Nasa: Near Earth Objects </title>
                        </Helmet>
                        <Suspense fallback={<div>Incoming...</div>}>
                            <NearEarthObjects/>
                        </Suspense>
                    </>
                }></Route>
                <Route path="/near-earth-objects/:id" element={
                    <NeoDetails/>
                }>
                </Route>
            </Routes>
        </HelmetProvider>
    );
};

export default RouterModule;
