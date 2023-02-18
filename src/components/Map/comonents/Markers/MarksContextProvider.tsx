import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { emptyFunc } from '../../../../utils/empties';
import { IMark } from './types';

// TODO: сделать нормальный обработчик
export const errorHandler = () => console.log('Parsing error');

interface IMarkersContext {
    stateMarkers: IMark[];
    setMarker: (newMark: IMark) => void;
    clearMarker: (clearId: string) => void;
}

const MarkersContext = createContext<IMarkersContext>({
    stateMarkers: [],
    setMarker: emptyFunc,
    clearMarker: emptyFunc,
});

export const useMarkersContext = () => useContext(MarkersContext);

// TODO: перейти на reactQuery, тогда этот контекст нужен не будет
export function MarkersContextProvider({ children }: PropsWithChildren) {
    const [stateMarkers, setStateMarkers] = useState<IMark[]>([]);

    // при загрузке страницы вылезала ошибка в   const markers = (JSON.parse(localStorage.getItem('allMarkers') ?? '') ?? []) as IMark[];
    useEffect(() => {
        try {
            const markers = (JSON.parse(localStorage.getItem('allMarkers') ?? '') ?? []) as IMark[];
            setStateMarkers(markers);
        } catch (error) {
            let errorMessage = 'Unexpected error occured. ';
            if (error instanceof Error) errorMessage += `Failed to parse stored markers: ${error.message}`;
            console.error(errorMessage);
        }
    }, []);

    const setMarker = useCallback((newMark: IMark) => {
        setStateMarkers((prev) => [...prev, newMark]);
    }, []);

    const clearMarker = useCallback((clearId: string) => {
        setStateMarkers((prev) => prev.filter(({ id }) => id !== clearId));
    }, []);

    const contextValue = useMemo(
        () => ({ stateMarkers, setMarker, clearMarker }),
        [clearMarker, setMarker, stateMarkers],
    );

    return <MarkersContext.Provider value={contextValue}>{children}</MarkersContext.Provider>;
}
