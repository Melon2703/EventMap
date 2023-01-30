import React from 'react';
import Map from '../Map/Map';

import './Root.css';
import { MarksContextProvider } from './MarksContextProvider';
import Sidebar from '../Map/comonents/Sidebar/Sidebar';

function Root() {
    return (
        <MarksContextProvider>
            <div className="app-container">
                <Map className="map" />
                <Sidebar />
            </div>
        </MarksContextProvider>
    );
}

export default Root;
