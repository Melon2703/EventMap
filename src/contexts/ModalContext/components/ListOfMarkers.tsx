import React, { useCallback, useMemo, useState } from 'react';
import { Box, IconButton, List, Switch, SxProps, Theme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMarkersContext } from '../../../components/Map/comonents/Markers/MarksContextProvider';
import { IMark } from '../../../components/Map/comonents/Markers/types';

const modalSx: SxProps<Theme> = {
    width: 250,
    minHeight: 200,
    background: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '24px',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const userId = '1';

function ListOfMarkers() {
    const { stateMarkers, clearMarker } = useMarkersContext();

    const [isPublic, setIsPublic] = useState(false);

    const onClear = useCallback(
        (id: string) => {
            clearMarker(id);
        },
        [clearMarker],
    );

    const onChange = useCallback((_: any, checked: boolean) => {
        setIsPublic(checked);
    }, []);

    const { usersMarks, publicMarkers } = useMemo(
        () =>
            stateMarkers.reduce(
                ({ usersMarks: uMarks, publicMarkers: pMarkers }, marker) => {
                    if (marker.ownerId === userId) {
                        uMarks.push(marker);
                    } else {
                        pMarkers.push(marker);
                    }

                    return { usersMarks: uMarks, publicMarkers: pMarkers };
                },
                { usersMarks: [], publicMarkers: [] } as { usersMarks: IMark[]; publicMarkers: IMark[] },
            ),
        [stateMarkers],
    );

    return (
        <Box sx={modalSx}>
            <div>
                Личные <Switch value={isPublic} onChange={onChange} /> Публичные
            </div>
            <List style={{ width: '100%' }}>
                {(isPublic ? publicMarkers : usersMarks).map(({ name, position: { lat, lng }, id }) => (
                    // TODO: вынести в отедльную компоненту
                    <li key={`${lat}${lng}`}>
                        {name}
                        <IconButton className="icon" onClick={() => onClear(id)}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                ))}
            </List>
        </Box>
    );
}

export default ListOfMarkers;
