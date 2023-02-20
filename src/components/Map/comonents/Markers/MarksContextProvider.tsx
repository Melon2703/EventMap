import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createMarker, getAllMarkers, removeMarker } from '../../../../api/markers';
import { useUserAuth } from '../../../../contexts/AuthContext/AuthContext';

import { errorHandler } from '../../../../utils/errorHandler';
import { IMark } from './types';

interface IMarkersContext {
    stateMarkers: IMark[];
    setMarker: (newMark: Omit<IMark, 'id'>) => Promise<void>;
    clearMarker: (clearId: string) => Promise<void>;
}

const MarkersContext = createContext<IMarkersContext>({
    stateMarkers: [],
    setMarker: Promise.resolve,
    clearMarker: Promise.resolve,
});

export const useMarkersContext = () => useContext(MarkersContext);

// TODO: перейти на reactQuery, тогда этот контекст нужен не будет
export function MarkersContextProvider({ children }: PropsWithChildren) {
    const [stateMarkers, setStateMarkers] = useState<IMark[]>([]);

    const {
        user: { id: ownerId },
    } = useUserAuth();

    useEffect(() => {
        const getMarkers = async () => {
            try {
                const markers = await getAllMarkers(ownerId);

                setStateMarkers(markers);
            } catch (error) {
                errorHandler(error);
            }
        };

        if (ownerId) {
            getMarkers();
        } else {
            setStateMarkers([]);
        }
    }, [ownerId, stateMarkers.length]);

    const setMarkers = useCallback((marks: IMark[]) => {
        setStateMarkers(marks);
    }, []);

    const setMarker = useCallback(
        (newMark: Omit<IMark, 'id'>) =>
            createMarker(newMark).then(() => {
                getAllMarkers(ownerId).then((markers) => {
                    setMarkers(markers);
                });
            }),
        [ownerId, setMarkers],
    );

    const clearMarker = useCallback(
        (id: string) =>
            removeMarker(id).then(() => {
                getAllMarkers(ownerId).then((markers) => {
                    setMarkers(markers);
                });
            }),
        [ownerId, setMarkers],
    );

    const contextValue = useMemo(
        () => ({ stateMarkers, clearMarker, setMarker }),
        [clearMarker, setMarker, stateMarkers],
    );

    return <MarkersContext.Provider value={contextValue}>{children}</MarkersContext.Provider>;
}
