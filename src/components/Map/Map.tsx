import React from 'react';
import './Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const batumiCoords: LatLngExpression | undefined = [41.643414, 41.6399];

interface MapProps {
    className?: string;
}
function Map({ className }: MapProps) {
    return (
        <MapContainer className={className} center={batumiCoords} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}

Map.defaultProps = {
    className: '',
};

export default Map;
