import React, { useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useUserAuth } from '../../../../../../../../contexts/AuthContext/AuthContext';

export default function UserAction() {
    const { user, googleSignIn, logOut } = useUserAuth();

    const handleSignIn = useCallback(() => {
        googleSignIn();
    }, [googleSignIn]);

    const handleLogOut = useCallback(() => {
        logOut();
    }, [logOut]);

    const buttonInfo = useMemo(() => {
        const handler = user ? handleLogOut : handleSignIn;

        const buttonText = user ? 'Выйти' : 'Войти';

        return { handler, buttonText };
    }, [handleLogOut, handleSignIn, user]);

    return <Button onClick={buttonInfo.handler}>{buttonInfo.buttonText}</Button>;
}
