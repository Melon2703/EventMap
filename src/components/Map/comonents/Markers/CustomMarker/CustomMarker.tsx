import React, { useEffect, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { useMarksContext } from '../../../../Root/MarksContextProvider';

type MarkerPosition = { lat: number; lng: number } | null;

interface CustomMarkerProps {
    order: number;
}
function CustomMarker({ order }: CustomMarkerProps) {
    const [position, setPosition] = useState<MarkerPosition>(null);

    const { setMarksCount, marksCount } = useMarksContext();

    const isAvailable = marksCount >= order;

    useMapEvents({
        click(event) {
            if (isAvailable && !position) {
                const { lat, lng } = event.latlng;

                // TODO: интерактив и логика устоновки метки будут тут

                setPosition({ lat, lng });

                setMarksCount((prev) => prev + 1);
            }
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

    return <Marker position={[position.lat, position.lng]} interactive={false} />;
}

export default CustomMarker;
