import {iNEO} from "@/modules/NewEarthObjectsList/types/iNEO.tsx";
import React from "react";

enum NEOColor {
    Green = 'green',
    Orange = 'orange',
    Red = 'red',
}

interface NEOItemProps {
    neo: iNEO;
}

const NEOItem: React.FC<NEOItemProps> = ({neo}) => {
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
        <div style={{backgroundColor: color}}>
            <span>{neo.id}</span>
            <span>{neo.closestDistance} LD</span>
        </div>
    );
};

export default NEOItem;
