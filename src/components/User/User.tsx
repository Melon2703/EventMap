import React from 'react';
import UserAvatar from './components/Avatar/UserAvatar';
import UserAction from './components/UserAction/UserAction';
import './User.css';

export default function User() {
    return (
        <div className="user-display vertical-flex">
            <UserAvatar />
            <UserAction />
        </div>
    );
}
