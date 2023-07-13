import React, {useEffect, useState} from 'react';
import {FixedSizeList} from 'react-window';
import NEOItem from '@/modules/NewEarthObjectsList/NeoItem/NeoItem';
import {INeo} from '@/modules/NewEarthObjectsList/types/INeo.tsx';
import config from '@/config/config';
import {formatEarthDate} from '@/modules/MarsRoverPhotos/helpers/helpers';
import {ProgressSpinner} from 'primereact/progressspinner';
import {CustomLink, NeoListWrapper} from "@/modules/NewEarthObjectsList/NeoList/NeoList.styled.tsx";
import {useFetchNEOs} from "@/modules/NewEarthObjectsList/hooks/useFetchNeos.tsx";

interface NEOListProps {
    neos: INeo[];
    setNEOs: (neos: INeo[]) => void;
    startDate: string | Date | null;
    endDate: string | Date | null;
}

const NEOList: React.FC<NEOListProps> = ({neos, setNEOs, startDate, endDate }): React.ReactElement => {
    const { isLoading, error, data } = useFetchNEOs(startDate, endDate);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', height: '300px' }}>
                <ProgressSpinner style={{ width: '10%' }} />
            </div>
        );
    }

    if (error) {
        return <p>Error fetching NEO data: {error.message}</p>;
    }

    return (
        <NeoListWrapper>
            {data.length === 0 ? (
                <p>No search results available.</p>
            ) : (
                <FixedSizeList height={400} itemCount={data.length} itemSize={60} width={'100%'}>
                    {({ index, style }) => (
                        <CustomLink key={data[index].id} to={`/near-earth-objects/${data[index].id}`} style={style}>
                            <NEOItem neo={data[index]} />
                        </CustomLink>
                    )}
                </FixedSizeList>
            )}
        </NeoListWrapper>
    );
}
export default NEOList;
