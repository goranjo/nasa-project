import {INeo} from "@/modules/NewEarthObjectsList/types/INeo.tsx";
import React from "react";

enum NEOColor {
    Green = 'green',
    Orange = 'orange',
    Red = 'red',
}

interface NEOItemProps {
    neo: INeo;
}

const NEOItem: React.FC<NEOItemProps> = ({neo}): React.ReactElement => {
    const colorLookupTable: { [key: number]: NEOColor } = {
        0.5: NEOColor.Red,
        1: NEOColor.Orange,
    };

    let color: NEOColor = NEOColor.Green;

    for (const threshold in colorLookupTable) {
        if (neo.closestDistance <= parseFloat(threshold)) {
            color = colorLookupTable[threshold];
            break;
        }
    }

    return (
        <div style={{color: '#fff', backgroundColor: color}}>
            <p>Name: {neo.name}</p>
            <p>Lunar Distance: {neo.closestDistance} LD</p>
        </div>
    );
};

export default NEOItem;
