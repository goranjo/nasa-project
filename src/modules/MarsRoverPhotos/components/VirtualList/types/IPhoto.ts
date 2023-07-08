import {ICamera} from "@/modules/MarsRoverPhotos/components/VirtualList/types/ICamera";

export interface IPhoto {
    id: number;
    img_src: string;
    earth_date?: string;
    camera?: ICamera;
}