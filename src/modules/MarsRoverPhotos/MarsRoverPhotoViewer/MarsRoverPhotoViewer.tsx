import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import config from '@/config/config.ts';
import { formatEarthDate } from '@/modules/MarsRoverPhotos/helpers/helpers.ts';
import RegularCalendar from '@/modules/components/ui/components/Calendar/RegularCalendar.tsx';
import RoverDropdown from "@/modules/MarsRoverPhotos/components/RoverDropDown.tsx";
import PhotoList from "@/modules/components/VirtualList/PhotoList.tsx";

enum MarsRover {
    Curiosity = 'curiosity',
    Opportunity = 'opportunity',
    Spirit = 'spirit',
}

interface Photo {
    id: number;
    img_src: string;
}

const MarsRoverPhotoViewer: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedRover, setSelectedRover] = useState<MarsRover>(MarsRover.Curiosity);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    useEffect(() => {
        if (selectedDate) {
            fetchPhotos(selectedDate, selectedRover);
        }
    }, [selectedDate, selectedRover]);

    const fetchPhotos = async (date: Date, rover: MarsRover) => {
        try {
            const formattedDate = formatEarthDate(date);
            const response = await fetch(
                `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${formattedDate}&api_key=${config.NASA_API_KEY}`
            );
            const data = await response.json();
            setPhotos(data.photos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const handleDateChange = (value: Date | undefined) => {
        setSelectedDate(value);
    };

    const handleRoverChange = (rover: MarsRover) => {
        setSelectedRover(rover);
    };

    const openPreviewModal = (photo: Photo) => {
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
                <RoverDropdown selectedRover={selectedRover} onChange={handleRoverChange} />
            </div>
            {photos.length === 0 ? (
                <p>No photos available for the selected date.</p>
            ) : (
                <PhotoList photos={photos} openPreviewModal={openPreviewModal} />
            )}
            <Dialog
                visible={previewVisible}
                onHide={hidePreviewModal}
                header="Photo Preview"
                footer={null}
                maximizable
                blockScroll
            >
                {selectedPhoto && <img src={selectedPhoto.img_src} alt={selectedPhoto.id.toString()} style={{ width: '100%' }} />}
            </Dialog>
        </div>
    );
};

export default MarsRoverPhotoViewer;
