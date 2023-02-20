import React, { useMemo } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserAuth } from '../../../../../../../../contexts/AuthContext/AuthContext';
import './UserAvatar.css';

export default function UserAvatar() {
    const { user } = useUserAuth();

    const avatarUrl = user.iconUrl;

    const userIcon = useMemo(
        () =>
            avatarUrl ? (
                <img src={avatarUrl} alt="user" referrerPolicy="no-referrer" />
            ) : (
                <AccountCircleIcon fontSize="large" />
            ),
        [avatarUrl],
    );

    return <div className="avatar">{userIcon}</div>;
}
