import React from 'react';

import './Sidebar.css';
import User from './components/User/User';
import ShowMarkersListButton from './components/ShowMarkersListButton';

function Sidebar() {
    return (
        <aside>
            <ShowMarkersListButton />
            <User />
        </aside>
    );
}

export default React.memo(Sidebar);
