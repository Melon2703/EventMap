import React, { useCallback } from 'react';
import { Marker, Tooltip } from 'react-leaflet';

import L from 'leaflet';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ReactDOMServer from 'react-dom/server';
import { EventInfo } from '../../../../../contexts/ModalContext/components/SetMarker/types';
import { useMarkerOpener } from './hooks';

const customIcon = (isOwn: boolean) =>
    new L.DivIcon({
        html: ReactDOMServer.renderToString(<PlaceRoundedIcon style={{ fill: isOwn ? 'blue' : 'red' }} />),
        className: 'custom-icon',
        iconSize: [50, 50],
    });

interface CustomMarkerProps {
    eventInfo: EventInfo;
    isOwn: boolean;
}
export const CustomMarker: React.FC<CustomMarkerProps> = ({ eventInfo, isOwn }) => {
    const { position } = eventInfo;

    const markerOpener = useMarkerOpener();

    const onCLick = useCallback(() => markerOpener(eventInfo), [eventInfo, markerOpener]);

    return (
        <Marker eventHandlers={{ click: onCLick }} position={[position.lat, position.lng]} icon={customIcon(isOwn)}>
            <Tooltip direction="bottom">{eventInfo.name}</Tooltip>
        </Marker>
    );
};
