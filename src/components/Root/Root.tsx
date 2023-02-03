import React from 'react';
import Map from '../Map/Map';

import './Root.css';
import Sidebar from '../Map/comonents/Sidebar/Sidebar';
import { MarksContextProvider } from './MarksContextProvider';

function Root() {
    return (
        <main>
            <MarksContextProvider>
                <Map className="map" />
                <Sidebar />
            </MarksContextProvider>
        </main>
    );
}

export default Root;
