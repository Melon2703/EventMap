import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { modalPromise } from '../../modalPromise';

import MarkerForm from '../MarkerForm';
import { EmptyEventInfo } from './types';
import { useGetUserId } from '../../../AuthContext/hooks';
import { useModal } from '../../context';

const getDefaultValues = (ownerId: string, type = 'walk'): EmptyEventInfo => ({
    description: '',
    isPrivate: false,
    type,
    name: '',
    ownerId,
});

const SetMarker = () => {
    const ownerId = useGetUserId();

    const { onModalClose } = useModal();

    const onSubmit = useCallback((value: EmptyEventInfo) => {
        modalPromise.resolve?.(value);
    }, []);

    return (
        <MarkerForm
            secondButton={<Button onClick={onModalClose}>Отмена</Button>}
            defaultValues={getDefaultValues(ownerId)}
            continueText="Создать"
            onSubmit={onSubmit}
        />
    );
};

export default SetMarker;
