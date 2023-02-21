import React, { useCallback, useMemo, useState } from 'react';
import { Box, IconButton, List, MenuItem, Switch, SxProps, Theme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMarkersContext } from '../../../components/Map/comonents/Markers/MarksContextProvider';

import { useGetUserId } from '../../AuthContext/hooks';
import { EventInfo } from './SetMarker/types';
import { useMarkerOpener } from '../../../components/Map/comonents/Markers/CustomMarker/hooks';

const modalSx: SxProps<Theme> = {
    width: 320,
    height: 250,
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

function ListOfMarkers() {
    const { stateMarkers, clearMarker } = useMarkersContext();

    const ownerId = useGetUserId();

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

    const { usersMarkers, publicMarkers } = useMemo(
        () =>
            stateMarkers.reduce(
                ({ usersMarkers: uMarks, publicMarkers: pMarkers }, marker) => {
                    if (marker.ownerId === ownerId) {
                        uMarks.push(marker);
                        // TODO: ПРОВЕРКИ НА ФРОНТЕ БЫТЬ НЕ ДОЛЖНО. Эта проверка обязательна должна быть на бэке,
                        // то есть надо проверять, разрешен ли пользователь, который запрашивает метки доступ к приватным событям других пользователей,
                        // иначе эти события можно посмотреть в запросе
                    } else if (!marker.isPrivate) {
                        pMarkers.push(marker);
                    }

                    return { usersMarkers: uMarks, publicMarkers: pMarkers };
                },
                { usersMarkers: [], publicMarkers: [] } as { usersMarkers: EventInfo[]; publicMarkers: EventInfo[] },
            ),
        [ownerId, stateMarkers],
    );

    const markerOpener = useMarkerOpener();

    return (
        <Box sx={modalSx}>
            <div>
                Личные <Switch value={isPublic} onChange={onChange} /> Публичные
            </div>
            <List style={{ width: '100%', overflow: 'scroll' }}>
                {(isPublic ? publicMarkers : usersMarkers).map((eventInfo) => {
                    const { name, id } = eventInfo;

                    // TODO: вынести в отедльную компоненту
                    return (
                        <MenuItem
                            style={{ borderRadius: 8, minHeight: 52 }}
                            onClick={() => markerOpener(eventInfo)}
                            key={id}
                        >
                            {name}
                            {!isPublic ? (
                                <IconButton
                                    style={{ marginLeft: 'auto' }}
                                    className="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        onClear(id);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            ) : null}
                        </MenuItem>
                    );
                })}
            </List>
        </Box>
    );
}

export default ListOfMarkers;
