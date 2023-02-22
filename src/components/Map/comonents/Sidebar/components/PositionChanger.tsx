import { LatLngExpression } from 'leaflet';
import { useCallback, useLayoutEffect } from 'react';
import { useMap } from 'react-leaflet';
import { defaultCenter } from '../../../consts';

export const PositionChanger: React.FC = () => {
    const map = useMap();

    const setView = useCallback(
        (coords: LatLngExpression) => {
            map.setView(coords);

            sessionStorage.setItem('usersCoods', JSON.stringify(coords));
        },
        [map],
    );

    useLayoutEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setView([latitude, longitude]);
                },
                () => {
                    // TODO: предоставлять возможность самому выбрать геолокацию
                    setView(defaultCenter);
                },
            );
        } else {
            // TODO: предоставлять возможность самому выбрать геолокацию
            setView(defaultCenter);
        }
    }, [setView]);

    return null;
};
