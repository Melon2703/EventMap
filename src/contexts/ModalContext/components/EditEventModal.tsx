import React, { useCallback } from 'react';
// import { modalPromise } from '../modalPromise';
import MarkerForm from './MarkerForm';
import { EmptyEventInfo, EventInfo } from './SetMarker/types';
import { useMarkersContext } from '../../../components/Map/comonents/Markers/MarksContextProvider';
import { getAllMarkers, updateMarker } from '../../../api/markers';

interface EditEventModalProps {
    defaultValues: EmptyEventInfo;
}

function EditEventModal({ defaultValues }: EditEventModalProps) {
    const { setStateMarkers } = useMarkersContext();

    const onSubmit = useCallback(
        (value: EventInfo) => {
            updateMarker(value).then(() =>
                getAllMarkers().then((markers) => {
                    setStateMarkers(markers);
                }),
            );
        },
        [setStateMarkers],
    );

    return <MarkerForm defaultValues={defaultValues} continueText="Сохранить" onSubmit={onSubmit} />;
}

export default EditEventModal;
