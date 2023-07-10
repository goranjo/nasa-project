import React from 'react';
import {Dropdown, DropdownChangeEvent, DropdownProps} from 'primereact/dropdown';

export interface RegularDropDownProps extends Omit<DropdownProps, 'onChange'> {
    options?: { label: string; value: string }[];
    onChange?: (value: string) => void;
}

const RegularDropDown: React.FC<RegularDropDownProps> = ({options, onChange, ...props}) => {
    const handleOnChange = (event: DropdownChangeEvent) => {
        if (onChange) {
            onChange(event.value);
        }
    };

    return <Dropdown options={options} onChange={handleOnChange} {...props} />;
};

export default RegularDropDown;
