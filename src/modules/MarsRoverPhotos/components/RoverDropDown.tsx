import React from 'react';
import RegularDropDown, { RegularDropDownProps } from "@/components/ui/DropDown/RegularDropDown";

enum MarsRover {
    Curiosity = 'curiosity',
    Opportunity = 'opportunity',
    Spirit = 'spirit',
}

interface RoverDropdownProps extends RegularDropDownProps {
    selectedRover: MarsRover;
    onChange: (rover: string) => void;
}

const RoverDropdown: React.FC<RoverDropdownProps> = ({ selectedRover, onChange }): React.ReactElement => {
    const roverOptions = Object.values(MarsRover).map((rover) => ({
        label: rover.charAt(0).toUpperCase() + rover.slice(1),
        value: rover,
    }));

    return <RegularDropDown
        options={roverOptions}
        value={selectedRover}
        onChange={(rover) => onChange(rover as MarsRover)}
    />;
};

export default RoverDropdown;
