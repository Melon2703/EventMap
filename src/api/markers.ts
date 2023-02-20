import axios from 'axios';
import { IMark } from '../components/Map/comonents/Markers/types';
import { User } from '../contexts/AuthContext/types';

export const createMarker = async (marker: Omit<IMark, 'id'>) => {
    const { data } = await axios.post<User>('/new-marker', marker);

    return data;
};

export const getAllMarkers = async (ownerId: string) => {
    const { data } = await axios.get<IMark[]>('/all-markers', { params: { ownerId } });

    return data;
};

export const removeMarker = async (id: string) => {
    const { data } = await axios.delete('/remove-marker', { params: { id } });

    return data;
};
