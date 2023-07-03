import {HomePageWrapper} from "@/pages/HomePage/HomePage.styled.tsx";

const HomePage = () => {
    return (
        <HomePageWrapper className={'homepage-container'}>

            <a href="/astronomy-picture-of-the-day">
                <i className={'pi pi-image'}></i>
                <span>Astronomy Picture of the Day</span>
            </a>
            <a href="/mars-rover-photos">
                <i className={'pi pi-camera'}></i>
                <span>Mars Rover Photos</span>
            </a>
            <a href="/near-earth-objects">
                <i className={'pi pi-globe'}></i>
                <span>Near Earth Objects</span>
            </a>

        </HomePageWrapper>
    );
}

export default HomePage;