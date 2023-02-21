import { useUserAuth } from './AuthContext';

/* eslint-disable import/prefer-default-export */
export const useGetUserId = () => {
    const {
        user: { id: ownerId },
    } = useUserAuth();

    return ownerId;
};
