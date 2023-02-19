import React, { useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useUserAuth } from '../../../../../../../../contexts/AuthContext/AuthContext';

export default function UserAction() {
    const { user, googleSignIn, logOut } = useUserAuth();

    const userId = user.id;

    const handleSignIn = useCallback(() => {
        googleSignIn();
    }, [googleSignIn]);

    const handleLogOut = useCallback(() => {
        logOut();
    }, [logOut]);

    const buttonInfo = useMemo(() => {
        const handler = userId ? handleLogOut : handleSignIn;

        const buttonText = userId ? 'Выйти' : 'Войти';

        return { handler, buttonText };
    }, [handleLogOut, handleSignIn, userId]);

    return <Button onClick={buttonInfo.handler}>{buttonInfo.buttonText}</Button>;
}
