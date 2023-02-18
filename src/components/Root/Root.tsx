import React from 'react';
import Map from '../Map/Map';

import './Root.css';
import Sidebar from '../Map/comonents/Sidebar/Sidebar';

function Root() {
    return (
        <main>
            <Map className="map" />
            <Sidebar />
        </main>
    );
}

export default Root;
