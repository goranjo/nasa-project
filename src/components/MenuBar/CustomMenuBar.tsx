import {Link} from 'react-router-dom';
import {StyledMenuBar, StyledMenuItem} from "@/components/MenuBar/MenuBar.styled.tsx";

const CustomMenuBar = () => {
    const items = [
        {
            label: 'Home Page',
            icon: 'pi pi-home',
            to: '/',
        },
        {
            label: 'APOD Page',
            icon: 'pi pi-image',
            to: '/astronomy-picture-of-the-day',
        },
        {
            label: 'Mars Rover Photos',
            icon: 'pi pi-camera',
            to: '/mars-rover-photos',
        },
        {
            label: 'Near Earth Objects',
            icon: 'pi pi-globe',
            to: '/near-earth-objects',
        },
    ];

    return (
        <StyledMenuBar>
            <nav>
                <ul>
                    {items.map((item) => (
                        <StyledMenuItem key={item.to}>
                            <Link to={item.to}>
                                <i className={item.icon}></i>
                                {item.label}
                            </Link>
                        </StyledMenuItem>
                    ))}
                </ul>
            </nav>
        </StyledMenuBar>
    );
};

export default CustomMenuBar;
