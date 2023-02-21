import { LatLngLiteral } from 'leaflet';

export interface EventInfo {
    id: string;
    type: string;
    isPrivate: boolean;
    description: string;
    name: string;
    ownerId: string;
    position: LatLngLiteral;
}

export type EmptyEventInfo = Omit<EventInfo, 'id' | 'position'>;
