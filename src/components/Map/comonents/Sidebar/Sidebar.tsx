import React from 'react';

import './Sidebar.css';
import User from './components/User/User';
import ShowMarkersListButton from './components/ShowMarkersListButton';
import { MapLink } from './components/MapLink';

function Sidebar() {
    return (
        <aside>
            <MapLink />
            <ShowMarkersListButton />
            <User />
        </aside>
    );
}

export default React.memo(Sidebar);
