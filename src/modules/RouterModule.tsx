import {Link, NavLink, Route, Routes} from "react-router-dom";
import React, {Suspense} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";
import NearEarthObjects from "@/pages/NearEarthObjects/NearEarthObjects.tsx";

const APODPage = React.lazy(
    () => import("@/pages/APODPage/APODPage.tsx"),
);

const MarsRoverPhotos = React.lazy(
    () => import("@/pages/MarsRoverPhotos/MarsRoverPhotos.tsx"),
);

const RouterModule = () => {

    return (
        <HelmetProvider>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">APOD Page</NavLink>
                    </li>
                    <li>
                        <Link to="/mars-rover-photos">Mars Rover Photos</Link>
                    </li>
                    <li>
                        <Link to="/near-earth-objects">Near Earth Objects</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={
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
                        <Suspense fallback={<div>Loading...</div>}>
                            <MarsRoverPhotos/>
                        </Suspense>
                    </>
                }></Route>

                <Route path="/near-earth-objects" element={
                    <>
                        <Helmet>
                            <title>Nasa: Near Earth Objects </title>
                        </Helmet>
                        <Suspense fallback={<div>Loading...</div>}>
                            <NearEarthObjects/>
                        </Suspense>
                    </>
                }></Route>
            </Routes>
        </HelmetProvider>
    );
};

export default RouterModule;
