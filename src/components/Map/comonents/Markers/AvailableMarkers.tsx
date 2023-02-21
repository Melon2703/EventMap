import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { useGetUserId } from '../../../../contexts/AuthContext/hooks';
import { useModal } from '../../../../contexts/ModalContext/context';

import { modalPromise } from '../../../../contexts/ModalContext/modalPromise';
import { ModalTypes } from '../../../../contexts/ModalContext/types';
import { errorHandler } from '../../../../utils/errorHandler';
import { maxMarkers } from './common';
import { CustomMarker } from './CustomMarker/CustomMarker';

import { useMarkersContext } from './MarksContextProvider';

function AvailableMarkers() {
    const { stateMarkers, setMarker } = useMarkersContext();

    const userId = useGetUserId();

    const { onModalOpen, onModalClose } = useModal();

    // TODO: делить маркеры в отдельном месте
    const openModalCondition = stateMarkers.filter(({ ownerId }) => userId === ownerId).length < maxMarkers;

    useMapEvents({
        click(event) {
            if (openModalCondition && userId) {
                onModalOpen(ModalTypes.SET_POINT, () => {
                    modalPromise.instance?.then((eventInfo) => {
                        if (eventInfo) {
                            const { latlng } = event;

                            const newMarker = { ...eventInfo, position: latlng };

                            try {
                                setMarker(newMarker).then(onModalClose);
                            } catch (error) {
                                errorHandler(error);
                            }
                        }
                    });
                });
            }
        },
    });

    return (
        <>
            {stateMarkers
                .filter(({ isPrivate, ownerId }) => !(ownerId !== userId && isPrivate))
                .map((eventInfo) => {
                    const { id, ownerId } = eventInfo;

                    const isOwn = ownerId === userId;

                    // TODO: обработаь кейс, когда маркеры находятся рядом
                    return <CustomMarker isOwn={isOwn} key={id} eventInfo={eventInfo} />;
                })}
        </>
    );
}

export default React.memo(AvailableMarkers);
