import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useMarksContext } from '../../../Root/MarksContextProvider';

function Sidebar() {
    const { setMarksCount } = useMarksContext();

    const clearMarks = useCallback(() => setMarksCount(0), [setMarksCount]);

    return (
        <aside>
            <Button onClick={clearMarks} variant="text">
                Clear
            </Button>
        </aside>
    );
}

export default React.memo(Sidebar);
