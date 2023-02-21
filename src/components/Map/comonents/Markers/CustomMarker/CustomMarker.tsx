import React, { useCallback } from 'react';
import { Marker, Tooltip } from 'react-leaflet';

import L from 'leaflet';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import ReactDOMServer from 'react-dom/server';
import { EventInfo } from '../../../../../contexts/ModalContext/components/SetMarker/types';
import { useModal } from '../../../../../contexts/ModalContext/context';
import { ModalTypes } from '../../../../../contexts/ModalContext/types';

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
function CustomMarker({ eventInfo, isOwn }: CustomMarkerProps) {
    const { position } = eventInfo;

    const { onModalOpen } = useModal();

    const onClick = useCallback(() => {
        onModalOpen(ModalTypes.SHOW_EDIT_EVENT, undefined, eventInfo);
    }, [eventInfo, onModalOpen]);

    return (
        <Marker eventHandlers={{ click: onClick }} position={[position.lat, position.lng]} icon={customIcon(isOwn)}>
            <Tooltip direction="bottom">{eventInfo.name}</Tooltip>
        </Marker>
    );
}

export default CustomMarker;
