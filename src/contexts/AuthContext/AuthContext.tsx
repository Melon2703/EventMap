/* eslint-disable import/no-extraneous-dependencies */

import React, { useContext, createContext, useState, useEffect, PropsWithChildren, useMemo } from 'react';
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

interface AuthContextValue {
    user: User | null;
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    googleSignIn: () => {},
    logOut: () => {},
});

export function UserAuth() {
    return useContext(AuthContext);
}

// https://firebase.google.com/docs/auth/web/start
// https://firebase.google.com/docs/auth/web/google-signin
export function AuthContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = async () => {
        console.log('sign in');
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        // открываем окно с регистрацией\авторизацией через гугл
        // объект юзера будем принимать через useEffect ниже
        signInWithRedirect(auth, provider);
    };

    const logOut = async () => {
        const auth = getAuth(app);

        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    // onAuthStateChange
    //  This observer gets called whenever the user's sign-in state changes.
    //
    // на сколько я понял, вытаскивает объект юзера из localStorage или cookies
    useEffect(() => {
        const auth = getAuth(app);

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setUser(user);
                console.log('OnAuthStateChange User: ', user);
            }
        });
        return () => {
            unsubscribe();
        };
    });

    // getRedirectResult для обработки объекта юзера после редиректа
    useEffect(() => {
        const auth = getAuth(app);

        getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    setUser(result.user);
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }, []);

    const value = useMemo(() => ({ user, googleSignIn, logOut }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
