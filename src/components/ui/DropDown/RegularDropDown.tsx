import React from 'react';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import {MarsRover} from "@/modules/MarsRoverPhotos/types/enums/MarsRover.tsx";

interface CustomDropdownProps extends DropdownProps {
    options: { label: string; value: MarsRover }[];
}

const RegularDropDown: React.FC<CustomDropdownProps> = ({ options, ...props }) => {
    return <Dropdown options={options} {...props} />;
};

export default RegularDropDown;
