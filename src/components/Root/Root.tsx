import React from 'react';
import Map from '../Map/Map';

import './Root.css';
import Sidebar from '../Map/comonents/Sidebar/Sidebar';
import User from '../User/User';

function Root() {
    return (
        <main>
            <Map className="map" />
            <Sidebar />
            <User />
        </main>
    );
}

export default Root;
