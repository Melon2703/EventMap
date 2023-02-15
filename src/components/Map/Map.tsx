import React, { useLayoutEffect, useState } from 'react';
import './Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Skeleton } from '@mui/material';
import AvailableMarkers from './comonents/Markers/AvailableMarkers';

interface MapProps {
    className?: string;
}
function Map({ className }: MapProps) {
    const [personalCoords, setPersonalCoords] = useState<LatLngExpression | undefined>();

    useLayoutEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                setPersonalCoords([latitude, longitude]);
            });
        } else {
            // TODO: предоставлять возможность самому выбрать геолокацию
            setPersonalCoords([50, 25]);
        }
    }, []);

    // TODO: поборать динамическое обновление personalCoords (как минимум через рендер разных карт, но это не очень)
    if (!personalCoords) {
        return <Skeleton className={className} variant="rectangular" width="100%" height="100%" />;
    }

    return (
        <MapContainer className={className} center={personalCoords} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            />
            <AvailableMarkers />
        </MapContainer>
    );
}

Map.defaultProps = {
    className: '',
};

export default Map;
