import { IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

import { ModalTypes } from '../../../../../contexts/ModalContext/types';
import { useModal } from '../../../../../contexts/ModalContext/context';

export default function ShowMarkersListButton() {
    const { onModalOpen } = useModal();

    const showMarkersList = useCallback(() => {
        onModalOpen(ModalTypes.SHOW_LIST_OF_POINT);
    }, [onModalOpen]);

    return (
        <IconButton className="icon" onClick={showMarkersList}>
            <ListAltRoundedIcon fontSize="large" />
        </IconButton>
    );
}
