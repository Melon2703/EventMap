import axios from 'axios';

import { User } from '../contexts/AuthContext/types';
import { EventInfo } from '../contexts/ModalContext/components/SetMarker/types';

export const createMarker = async (marker: Omit<EventInfo, 'id'>) => {
    const { data } = await axios.post<User>('/new-marker', marker);

    return data;
};

export const getAllMarkers = async () => {
    const { data } = await axios.get<EventInfo[]>('/all-markers');

    return data;
};

export const removeMarker = async (id: string) => {
    const { data } = await axios.delete(`/remove-marker/${id}`);

    return data;
};

export const updateMarker = async (marker: EventInfo) => {
    const { data } = await axios.post(`/update-marker/${marker.id}`, { ...marker });

    return data;
};
