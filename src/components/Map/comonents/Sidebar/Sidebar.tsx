import { IconButton } from '@mui/material';

import React, { useCallback } from 'react';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

import './Sidebar.css';
import { useModal } from '../../../../contexts/ModalContext/ModalContext';
import { ModalTypes } from '../../../../contexts/ModalContext/types';

function Sidebar() {
    const { onModalOpen } = useModal();

    const showMarkersList = useCallback(() => {
        onModalOpen(ModalTypes.SHOW_LIST_OF_POINT);
    }, [onModalOpen]);

    return (
        <aside>
            <IconButton className="icon" onClick={showMarkersList}>
                <ListAltRoundedIcon />
            </IconButton>
        </aside>
    );
}

export default React.memo(Sidebar);
