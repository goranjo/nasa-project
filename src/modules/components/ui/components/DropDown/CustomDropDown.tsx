import React from 'react';
import { Dropdown, DropdownProps } from 'primereact/dropdown';

interface CustomDropdownProps extends DropdownProps {
    options: { label: string; value: never }[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, ...props }) => {
    return <Dropdown options={options} {...props} />;
};

export default CustomDropdown;
