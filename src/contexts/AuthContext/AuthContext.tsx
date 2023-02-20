import React, { useContext, createContext, useState, PropsWithChildren, useMemo, useCallback } from 'react';
import { signOut, signInWithPopup } from 'firebase/auth';

import { auth, provider } from '../../firebaseInstance';

import { User } from './types';
import checkAuth from '../../api/auth';
import { errorHandler } from '../../utils/errorHandler';

interface AuthContextValue {
    user: User;
    googleSignIn: () => void;
    logOut: () => void;
}

const defaultUser = { id: '', email: '' };

const AuthContext = createContext<AuthContextValue>({
    user: defaultUser,
    googleSignIn: () => {},
    logOut: () => {},
});

export const useUserAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User>(defaultUser);

    const logOut = useCallback(async () => {
        try {
            await signOut(auth);

            setUser(defaultUser);
        } catch (error) {
            errorHandler(error);
        }
    }, []);

    const googleSignIn = useCallback(async () => {
        try {
            await signInWithPopup(auth, provider);

            const accessToken = await auth.currentUser?.getIdToken();

            checkAuth(accessToken).then((newUser) => {
                setUser(newUser);
            });
        } catch (error) {
            errorHandler(error);
        }
    }, []);

    const value = useMemo(() => ({ user, googleSignIn, logOut }), [googleSignIn, logOut, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
