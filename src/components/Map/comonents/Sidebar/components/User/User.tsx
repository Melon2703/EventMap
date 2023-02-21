import React from 'react';
import UserAvatar from './components/Avatar/UserAvatar';
import './User.css';

export default function User() {
    return (
        <div className="user-display">
            <UserAvatar />
        </div>
    );
}
