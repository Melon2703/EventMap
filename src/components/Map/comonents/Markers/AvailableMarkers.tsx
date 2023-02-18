import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { useModal, modalPromise } from '../../../../contexts/ModalContext/ModalContext';
import { ModalTypes } from '../../../../contexts/ModalContext/types';
import { maxMarkers } from './common';
import CustomMarker from './CustomMarker/CustomMarker';

import { errorHandler, useMarkersContext } from './MarksContextProvider';

function AvailableMarkers() {
    const { stateMarkers, setMarker } = useMarkersContext();

    const { onModalOpen, onModalClose } = useModal();

    const openModalCondition = stateMarkers.length < maxMarkers;

    useMapEvents({
        click(event) {
            if (openModalCondition) {
                onModalOpen(ModalTypes.SET_POINT, () => {
                    modalPromise.instance?.then((eventInfo) => {
                        if (eventInfo) {
                            const { latlng } = event;

                            const newMark = { position: latlng, ...eventInfo };

                            const markersTwin = [...stateMarkers];

                            markersTwin.push(newMark);

                            // TODO: переписать на логику с бэком
                            try {
                                localStorage.setItem('allMarkers', JSON.stringify(markersTwin));

                                setMarker(newMark);

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
                // TODO: обработаь кейс, когда маркеры находятся рядом
                <CustomMarker key={`${position.lat}${position.lng}`} position={position} eventInfo={rest} />
            ))}
        </>
    );
}

export default React.memo(AvailableMarkers);
