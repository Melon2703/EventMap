import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { emptyFunc } from '../../../../utils/empties';
import { IMark } from './types';

const markers = (JSON.parse(localStorage.getItem('allMarkers') ?? '') ?? []) as IMark[];

// TODO: сделать нормальный обработчик
export const errorHandler = () => console.log('Parsing error');

interface IMarkersContext {
    stateMarkers: IMark[];
    setStateMarkers: React.Dispatch<React.SetStateAction<IMark[]>>;
    clearMarkers: () => void;
}

const MarkersContext = createContext<IMarkersContext>({
    stateMarkers: [],
    setStateMarkers: emptyFunc,
    clearMarkers: emptyFunc,
});

export const useMarkersContext = () => useContext(MarkersContext);

export function MarkersContextProvider({ children }: PropsWithChildren) {
    const [stateMarkers, setStateMarkers] = useState(markers);

    const clearMarkers = useCallback(() => {
        try {
            localStorage.setItem('allMarkers', JSON.stringify([]));

            setStateMarkers([]);
        } catch {
            errorHandler();
        }
    }, []);

    const contextValue = useMemo(() => ({ stateMarkers, setStateMarkers, clearMarkers }), [clearMarkers, stateMarkers]);

    return <MarkersContext.Provider value={contextValue}>{children}</MarkersContext.Provider>;
}