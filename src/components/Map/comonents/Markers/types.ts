import { LatLngLiteral } from 'leaflet';
import EventInfo from '../../../../contexts/ModalContext/components/SetMarker/types';

export interface IMark extends EventInfo {
    position: LatLngLiteral;
}
