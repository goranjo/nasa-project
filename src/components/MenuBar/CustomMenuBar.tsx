import {NavLink} from 'react-router-dom';
import {StyledMenuBar, StyledMenuItem} from "@/components/MenuBar/CustomMenuBar.styled.tsx";

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
                            <NavLink to={item.to} style={({isActive}) => ({
                                color: isActive ? '#ADFF2F' : '#000'
                            })}>
                                <i className={item.icon}></i>
                                {item.label}
                            </NavLink>
                        </StyledMenuItem>
                    ))}
                </ul>
            </nav>
        </StyledMenuBar>
    );
};

export default CustomMenuBar;
