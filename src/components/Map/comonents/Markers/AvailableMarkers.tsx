import React from 'react';
import { useMapEvents } from 'react-leaflet';
import EventInfo from '../../../../contexts/ModalContext/components/SetMarker/types';
import { useModal, modalPromise } from '../../../../contexts/ModalContext/ModalContext';
import { ModalTypes } from '../../../../contexts/ModalContext/types';
import { maxMarkers } from './common';
import CustomMarker from './CustomMarker/CustomMarker';

import { errorHandler, useMarkersContext } from './MarksContextProvider';

function AvailableMarkers() {
    const { stateMarkers, setStateMarkers } = useMarkersContext();

    const { onModalOpen, onModalClose } = useModal();

    const openModalCondition = stateMarkers.length < maxMarkers;

    useMapEvents({
        click(event) {
            if (openModalCondition) {
                onModalOpen(ModalTypes.SET_POINT, () => {
                    // @ts-expect-error
                    modalPromise.instance.then((eventInfo) => {
                        if (eventInfo) {
                            const { latlng } = event;

                            // TODO: поправить типы
                            const newMark = { position: latlng, ...(eventInfo as EventInfo) };

                            const markersTwin = [...stateMarkers];

                            markersTwin.push(newMark);

                            // TODO: переписать на логику с бэком
                            try {
                                localStorage.setItem('allMarkers', JSON.stringify(markersTwin));

                                setStateMarkers((prev) => [...prev, newMark]);

                                onModalClose();
                            } catch {
                                errorHandler();
                            }
                        }
                    });
                });
            }
        },
    });

    return (
        <>
            {stateMarkers.map(({ position, ...rest }) => (
                // TODO: поменять key
                <CustomMarker key={`${position.lat}${position.lng}`} position={position} eventInfo={rest} />
            ))}
        </>
    );
}

export default React.memo(AvailableMarkers);
