/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useUserAuth } from '../../../../../../../../contexts/AuthContext/AuthContext';

export default function LogOutButton() {
    const { logOut } = useUserAuth();

    return <div onClick={logOut}>Выйти</div>;
}
