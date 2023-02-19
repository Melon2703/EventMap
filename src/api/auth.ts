import axios from 'axios';
import { User } from '../contexts/AuthContext/types';

const checkAuth = async (accessToken = '') => {
    const { data } = await axios.post<User>('/login', { accessToken });

    return data;
};

export default checkAuth;
