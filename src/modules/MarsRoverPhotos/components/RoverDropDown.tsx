import React from 'react';
import CustomDropdown from "@/modules/components/ui/components/DropDown/CustomDropDown.tsx";

enum MarsRover {
    Curiosity = 'curiosity',
    Opportunity = 'opportunity',
    Spirit = 'spirit',
}

interface RoverDropdownProps {
    selectedRover: MarsRover;
    onChange: (rover: MarsRover) => void;
}

const RoverDropdown: React.FC<RoverDropdownProps> = ({ selectedRover, onChange }) => {
    const roverOptions = [
        { label: 'Curiosity', value: MarsRover.Curiosity },
        { label: 'Opportunity', value: MarsRover.Opportunity },
        { label: 'Spirit', value: MarsRover.Spirit },
    ];

    return <CustomDropdown options={roverOptions} value={selectedRover} onChange={(e) => onChange(e.value as MarsRover)} />;
};

export default RoverDropdown;
