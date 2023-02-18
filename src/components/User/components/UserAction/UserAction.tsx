import React from 'react';
import Button from '@mui/material/Button';
import { UserAuth } from '../../../../contexts/AuthContext/AuthContext';

export default function UserAction() {
    const { user, googleSignIn, logOut } = UserAuth();

    const handleSignIn = () => {
        googleSignIn();
    };

    const handleLogOut = () => {
        logOut();
    };

    return (
        <div>
            {user ? <Button onClick={handleLogOut}>Log Out</Button> : <Button onClick={handleSignIn}>Sign In</Button>}
        </div>
    );
}
