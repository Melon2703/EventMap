import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { emptyFunc } from '../../utils/empties';

interface IMarksContext {
    marksCount: number;
    setMarksCount: React.Dispatch<React.SetStateAction<number>>;
}

const MarksContext = createContext<IMarksContext>({ marksCount: 1, setMarksCount: emptyFunc });

export const useMarksContext = () => useContext(MarksContext);

export function MarksContextProvider({ children }: PropsWithChildren) {
    const [marksCount, setMarksCount] = useState(0);

    const contextValue = useMemo(() => ({ marksCount, setMarksCount }), [marksCount]);

    return <MarksContext.Provider value={contextValue}>{children}</MarksContext.Provider>;
}
