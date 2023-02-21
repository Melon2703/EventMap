import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createMarker, getAllMarkers, removeMarker } from '../../../../api/markers';
import { useGetUserId } from '../../../../contexts/AuthContext/hooks';
import { EventInfo } from '../../../../contexts/ModalContext/components/SetMarker/types';

import { errorHandler } from '../../../../utils/errorHandler';
import { emptyFunc } from '../../../../utils/empties';

interface EventInfoersContext {
    stateMarkers: EventInfo[];
    setMarker: (newMark: Omit<EventInfo, 'id'>) => Promise<void>;
    clearMarker: (clearId: string) => Promise<void>;
    setStateMarkers: React.Dispatch<React.SetStateAction<EventInfo[]>>;
}

const MarkersContext = createContext<EventInfoersContext>({
    stateMarkers: [],
    setStateMarkers: emptyFunc,
    setMarker: Promise.resolve,
    clearMarker: Promise.resolve,
});

export const useMarkersContext = () => useContext(MarkersContext);

// TODO: перейти на reactQuery, тогда этот контекст нужен не будет
export function MarkersContextProvider({ children }: PropsWithChildren) {
    const [stateMarkers, setStateMarkers] = useState<EventInfo[]>([]);

    const userId = useGetUserId();

    useEffect(() => {
        const getMarkers = async () => {
            try {
                const markers = await getAllMarkers();

                // TODO: возвращать publicMarkers & userMarkers тут
                setStateMarkers(markers);
            } catch (error) {
                errorHandler(error);
            }
        };

        getMarkers();
    }, [stateMarkers.length, userId]);

    const setMarkers = useCallback((marks: EventInfo[]) => {
        setStateMarkers(marks);
    }, []);

    const setMarker = useCallback(
        (newMark: Omit<EventInfo, 'id'>) =>
            createMarker(newMark).then(() => {
                getAllMarkers().then((markers) => {
                    setMarkers(markers);
                });
            }),
        [setMarkers],
    );

    const clearMarker = useCallback(
        (id: string) =>
            removeMarker(id).then(() => {
                getAllMarkers().then((markers) => {
                    setMarkers(markers);
                });
            }),
        [setMarkers],
    );

    const contextValue = useMemo(
        () => ({ stateMarkers, clearMarker, setMarker, setStateMarkers }),
        [clearMarker, setMarker, stateMarkers],
    );

    return <MarkersContext.Provider value={contextValue}>{children}</MarkersContext.Provider>;
}
