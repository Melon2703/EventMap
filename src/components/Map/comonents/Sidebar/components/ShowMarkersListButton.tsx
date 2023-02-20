import { IconButton } from '@mui/material';
import React, { useCallback } from 'react';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import { useModal } from '../../../../../contexts/ModalContext/ModalContext';
import { ModalTypes } from '../../../../../contexts/ModalContext/types';

export default function ShowMarkersListButton() {
    const { onModalOpen } = useModal();

    const showMarkersList = useCallback(() => {
        onModalOpen(ModalTypes.SHOW_LIST_OF_POINT);
    }, [onModalOpen]);

    return (
        <IconButton className="icon" onClick={showMarkersList}>
            <ListAltRoundedIcon />
        </IconButton>
    );
}
