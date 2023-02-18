import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserAuth } from '../../../../contexts/AuthContext/AuthContext';
import './UserAvatar.css';

export default function UserAvatar() {
    const { user } = UserAuth();

    const avatarUrl = user?.photoURL;

    return (
        <div className="avatar">
            {avatarUrl ? (
                <img src={avatarUrl} alt="user" referrerPolicy="no-referrer" />
            ) : (
                <AccountCircleIcon fontSize="large" />
            )}
        </div>
    );
}
