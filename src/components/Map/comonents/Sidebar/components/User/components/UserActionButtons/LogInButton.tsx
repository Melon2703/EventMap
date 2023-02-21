import React from 'react';
import Button from '@mui/material/Button';
import { useUserAuth } from '../../../../../../../../contexts/AuthContext/AuthContext';

export default function LogInButton() {
    const { googleSignIn } = useUserAuth();

    return <Button onClick={googleSignIn}>Войти</Button>;
}
