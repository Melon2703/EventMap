import React, { useContext, createContext, useState, useEffect, PropsWithChildren, useMemo, useCallback } from 'react';
import {
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    User,
    onAuthStateChanged,
    signInWithRedirect,
    signOut,
} from 'firebase/auth';
import app from '../../firebase-config';
import { errorHandler } from '../../components/Map/comonents/Markers/MarksContextProvider';

type TUser = User | null;

interface AuthContextValue {
    user: TUser;
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    googleSignIn: () => {},
    logOut: () => {},
});

export const useUserAuth = () => useContext(AuthContext);

// TODO: должен быть singleton, объединить и инкапсулировать, если будет необходимо // https://firebase.google.com/docs/auth/web/google-signin
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<TUser>(null);

    // открываем окно с регистрацией\авторизацией через гугл
    // объект юзера будем принимать через useEffect ниже
    const googleSignIn = useCallback(async () => signInWithRedirect(auth, provider), []);

    const logOut = useCallback(async () => {
        try {
            await signOut(auth);

            setUser(null);
        } catch (error) {
            errorHandler(error);
        }
    }, []);

    // onAuthStateChange
    //  This observer gets called whenever the user's sign-in state changes.
    // на сколько я понял, вытаскивает объект юзера из localStorage или cookies
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser: TUser) => {
            if (newUser) {
                setUser(newUser);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // getRedirectResult для обработки объекта юзера после редиректа
    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    setUser(result.user);
                }
            })
            .catch((error) => {
                errorHandler(error.message);
            });
    }, []);

    const value = useMemo(() => ({ user, googleSignIn, logOut }), [googleSignIn, logOut, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
