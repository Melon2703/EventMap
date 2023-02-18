import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';

import L, { LatLngLiteral } from 'leaflet';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ReactDOMServer from 'react-dom/server';
import EventInfo from '../../../../../contexts/ModalContext/components/SetMarker/types';

const customIcon = new L.DivIcon({
    html: ReactDOMServer.renderToString(<PlaceRoundedIcon style={{ fill: 'blue' }} />),
    className: 'custom-icon',
    iconSize: [50, 50],
});

interface CustomMarkerProps {
    position: LatLngLiteral;
    eventInfo: EventInfo;
}
function CustomMarker({ position, eventInfo }: CustomMarkerProps) {
    return (
        <Marker position={[position.lat, position.lng]} icon={customIcon}>
            <Tooltip direction="bottom">{eventInfo.name}</Tooltip>
        </Marker>
    );
}

export default CustomMarker;
