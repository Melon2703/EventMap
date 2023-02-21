import React, { useCallback, useMemo } from 'react';
// import { modalPromise } from '../modalPromise';
import { Button } from '@mui/material';
import MarkerForm from './MarkerForm';
import { EventInfo } from './SetMarker/types';
import { useMarkersContext } from '../../../components/Map/comonents/Markers/MarksContextProvider';
import { getAllMarkers, updateMarker } from '../../../api/markers';
import { useModal } from '../context';
import { useGetUserId } from '../../AuthContext/hooks';

interface EditEventModalProps {
    defaultValues: EventInfo;
}

function EditEventModal({ defaultValues }: EditEventModalProps) {
    const userId = useGetUserId();

    const isOwner = defaultValues.ownerId === userId;

    const { setStateMarkers, clearMarker } = useMarkersContext();

    const { onModalClose } = useModal();

    const onSubmit = useCallback(
        (value: EventInfo) => {
            updateMarker(value).then(() => {
                onModalClose();

                getAllMarkers().then((markers) => {
                    setStateMarkers(markers);
                });
            });
        },
        [onModalClose, setStateMarkers],
    );

    const onClear = useCallback(() => {
        clearMarker(defaultValues.id).then(() => onModalClose());
    }, [clearMarker, defaultValues.id, onModalClose]);

    const secondButton = useMemo(() => {
        if (isOwner) {
            return <Button onClick={onClear}>Удалить</Button>;
        }
    }, [isOwner, onClear]);

    return (
        <MarkerForm
            secondButton={secondButton}
            defaultValues={defaultValues}
            continueText="Сохранить"
            onSubmit={onSubmit}
        />
    );
}

export default EditEventModal;
