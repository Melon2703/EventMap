import React from 'react';
import UserAvatar from './components/Avatar/UserAvatar';
import UserAction from './components/UserAction/UserAction';
import './User.css';

export default function User() {
    return (
        // TODO: сделать popup с menu
        <div className="user-display">
            <UserAvatar />
            <UserAction />
        </div>
    );
}
