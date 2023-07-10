import React, {useState, useEffect} from 'react';
import {Dialog} from 'primereact/dialog';
import RegularCalendar from '@/components/ui/Calendar/RegularCalendar/RegularCalendar';
import RoverDropdown from '@/modules/MarsRoverPhotos/components/RoverDropDown';
import {MarsRover} from '@/modules/MarsRoverPhotos/types/enums/MarsRover';
import {fetchMarsRoverPhotos} from '@/modules/MarsRoverPhotos/MarsRoverPhotoViewerService';
import {IPhoto} from '@/modules/MarsRoverPhotos/components/VirtualList/types/IPhoto';
import MarsPhotoVirtualList from '@/modules/MarsRoverPhotos/components/VirtualList/MarsPhotoVirtualList';
import * as Styles from '@/modules/MarsRoverPhotos/MarsRoverPhotoViewer/MarsRoverPhotoViewer.styled';

const MarsRoverPhotoViewer: React.FC = (): React.ReactElement => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedRover, setSelectedRover] = useState<MarsRover>(MarsRover.Curiosity);
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
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

    const handleRoverChange = (rover: MarsRover) => setSelectedRover(rover as MarsRover);

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
            <Styles.Container>
                <Styles.Heading>Mars Rover Photo Viewer</Styles.Heading>
                <Styles.ToolsContainer>
                    <Styles.DateContainer>
                        <label htmlFor="date">Select Date:</label>
                        <RegularCalendar
                            id="date"
                            inputId="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yy-mm-dd"
                            showIcon
                        />
                    </Styles.DateContainer>
                    <Styles.RoverContainer>
                        <label htmlFor="rover">Select Rover:</label>
                        <RoverDropdown
                            id="rover"
                            inputId="rover"
                            selectedRover={selectedRover}
                            value={selectedRover}
                            onChange={(rover: string) => handleRoverChange(rover as MarsRover)}
                        />
                    </Styles.RoverContainer>
                </Styles.ToolsContainer>
            </Styles.Container>
            {photos.length === 0 ? (
                <p>No photos available for the selected date.</p>
            ) : (
                <MarsPhotoVirtualList photos={photos} openPreviewModal={openPreviewModal}/>
            )}
            <Dialog
                visible={previewVisible}
                onHide={hidePreviewModal}
                header="Photo Preview"
                footer={null}
                maximizable
                blockScroll
            >
                {selectedPhoto && (
                    <img src={selectedPhoto.img_src} alt={selectedPhoto.id.toString()} style={{maxWidth: '100%'}}/>
                )}
            </Dialog>
        </div>
    );
};

export default MarsRoverPhotoViewer;
