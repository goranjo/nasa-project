import React, {useState, useEffect} from 'react';
import {Dialog} from 'primereact/dialog';
import RegularCalendar from '@/components/ui/Calendar/RegularCalendar/RegularCalendar.tsx';
import RoverDropdown from "@/modules/MarsRoverPhotos/components/RoverDropDown.tsx";
import PhotoList from "@/components/VirtualList/PhotoList/PhotoList.tsx";
import {MarsRover} from "@/modules/MarsRoverPhotos/types/enums/MarsRover.tsx";
import {fetchMarsRoverPhotos} from "@/modules/MarsRoverPhotos/MarsRoverPhotoViewerService.tsx";
import {IPhoto} from "@/modules/MarsRoverPhotos/components/VirtualList/types/IPhoto";
import MarsPhotoVirtualList from "@/modules/MarsRoverPhotos/components/VirtualList/MarsPhotoVirtualList.tsx";


const MarsRoverPhotoViewer: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedRover, setSelectedRover] = useState<MarsRover>(MarsRover.Curiosity);
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);

    useEffect(() => {
        if (selectedDate) {
            fetchPhotos(selectedDate, selectedRover);
        }
    }, [selectedDate, selectedRover]);

    const fetchPhotos = async (date: Date, rover: MarsRover) => {
        try {
            const response = await fetchMarsRoverPhotos(rover, date);
            setPhotos(response.photos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };


    const handleDateChange = (value: Date | Date[] | null) => {
        setSelectedDate(value ? (Array.isArray(value) ? value[0] : value) : undefined);
    };


    const handleRoverChange = (rover: MarsRover) => {
        setSelectedRover(rover);
    };

    const openPreviewModal = (photo: IPhoto) => {
        setSelectedPhoto(photo);
        setPreviewVisible(true);
    };

    const hidePreviewModal = () => {
        setPreviewVisible(false);
        setSelectedPhoto(null);
    };

    return (
        <div>
            <h2>Mars Rover Photo Viewer</h2>
            <div>
                <label htmlFor="date">Select Date:</label>
                <RegularCalendar
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yy-mm-dd"
                    showIcon
                />
            </div>
            <div>
                <label htmlFor="rover">Select Rover:</label>
                <RoverDropdown
                    selectedRover={selectedRover}
                    onChange={handleRoverChange}
                />
            </div>
            {photos.length === 0 ? (
                <p>No photos available for the selected date.</p>
            ) : (
                <MarsPhotoVirtualList
                    photos={photos}
                    openPreviewModal={openPreviewModal}
                />
            )}
            <Dialog
                visible={previewVisible}
                onHide={hidePreviewModal}
                header="Photo Preview"
                footer={null}
                maximizable
                blockScroll
            >
                {selectedPhoto &&
                    <img src={selectedPhoto.img_src} alt={selectedPhoto.id.toString()} style={{maxWidth: '100%'}}/>}
            </Dialog>
        </div>
    );
};

export default MarsRoverPhotoViewer;
