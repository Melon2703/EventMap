import React, { useEffect, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { useModal } from '../../../../../contexts/ModalContext/ModalContext';
import { useMarksContext } from '../../../../Root/MarksContextProvider';

type MarkerPosition = { lat: number; lng: number } | null;

interface CustomMarkerProps {
    order: number;
}
function CustomMarker({ order }: CustomMarkerProps) {
    const { onModalOpen } = useModal();

    const [position, setPosition] = useState<MarkerPosition>(null);

    const { setMarksCount, marksCount } = useMarksContext();

    const isAvailable = marksCount >= order;

    useMapEvents({
        click(event) {
            // TODO: интерактив и логика устоновки метки будут тут
            onModalOpen().then((isContinue) => {
                if (isContinue && isAvailable && !position) {
                    const { lat, lng } = event.latlng;

                    setPosition({ lat, lng });

                    setMarksCount((prev) => prev + 1);
                }
            });
        },
    });

    useEffect(() => {
        if (
            marksCount < order ||
            // обработка кейса после сброса marksCount
            order === marksCount
        ) {
            setPosition(null);
        }
    }, [isAvailable, marksCount, order]);

    if (!(isAvailable && position && position.lat !== 0)) {
        return null;
    }

    return <Marker position={[position.lat, position.lng]} />;
}

export default CustomMarker;
