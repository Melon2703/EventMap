import React from 'react';
import { Box, List, SxProps, Theme } from '@mui/material';
import { useMarkersContext } from '../../../components/Map/comonents/Markers/MarksContextProvider';

const modalSx: SxProps<Theme> = {
    width: 200,
    background: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '24px',
    borderRadius: '24px',
};

function ListOfMarkers() {
    const { stateMarkers } = useMarkersContext();

    return (
        <Box sx={modalSx}>
            <List>
                {stateMarkers.map(({ name, position: { lat, lng } }) => (
                    <li key={`${lat}${lng}`}>{name}</li>
                ))}
            </List>
        </Box>
    );
}

export default ListOfMarkers;
