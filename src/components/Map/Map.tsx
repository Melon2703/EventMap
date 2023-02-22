import React from 'react';
import './Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';

import AvailableMarkers from './comonents/Markers/AvailableMarkers';
import { PositionChanger } from './comonents/Sidebar/components/PositionChanger';
import { defaultCenter } from './consts';

// Moscow, Russia: 55.7558° N, 37.6173° E
// Tbilisi, Georgia: 41.7151° N, 44.8271° E
// Yerevan, Armenia: 40.1772° N, 44.5035° E
// Belgrade, Serbia: 44.7866° N, 20.4489° E

const getInitialCoords = () => {
    try {
        return JSON.parse(sessionStorage.getItem('usersCoods') ?? '');
    } catch {
        return null;
    }
};

function Map() {
    // TODO: открывать инфо-модалку тут

    const initialCoords = getInitialCoords();

    return (
        <MapContainer preferCanvas style={{ height: '100vh' }} center={initialCoords ?? defaultCenter} zoom={8}>
            {!initialCoords ? <PositionChanger /> : null}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            />
            <AvailableMarkers />
        </MapContainer>
    );
}

export default Map;
