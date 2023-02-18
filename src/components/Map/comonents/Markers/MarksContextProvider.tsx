import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { emptyFunc } from '../../../../utils/empties';
import { IMark } from './types';

// TODO: сделать нормальный обработчик
// eslint-disable-next-line no-console
export const errorHandler = (error: any) => console.log(error);

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

    useLayoutEffect(() => {
        try {
            const markers = (JSON.parse(localStorage.getItem('allMarkers') ?? '') ?? []) as IMark[];

            setStateMarkers(markers);
        } catch (error) {
            let errorMessage = 'Unexpected error occured. ';

            if (error instanceof Error) {
                errorMessage += `Failed to parse stored markers: ${error.message}`;
            }

            errorHandler(errorMessage);
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
