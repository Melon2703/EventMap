import React, { useCallback } from 'react';
import { modalPromise } from '../../modalPromise';

import MarkerForm from '../MarkerForm';
import { EmptyEventInfo } from './types';
import { useGetUserId } from '../../../AuthContext/hooks';

const getDefaultValues = (ownerId: string, type = 'walk'): EmptyEventInfo => ({
    description: '',
    isPrivate: false,
    type,
    name: '',
    ownerId,
});

function SetMarker() {
    const ownerId = useGetUserId();

    const onSubmit = useCallback((value: EmptyEventInfo) => {
        modalPromise.resolve?.(value);
    }, []);

    return <MarkerForm defaultValues={getDefaultValues(ownerId)} continueText="Продолжить" onSubmit={onSubmit} />;
}

export default SetMarker;
