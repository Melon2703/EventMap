import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from '../Map/Map';

import './Root.css';
import Sidebar from '../Map/comonents/Sidebar/Sidebar';
import { UserProfile } from '../../contexts/ModalContext/components/UserProfile';

function Root() {
    return (
        <BrowserRouter>
            <div className="app">
                <main>
                    <Routes>
                        <Route path="/" element={<Map />} />
                        <Route path="/user-settings" element={<UserProfile />} />
                    </Routes>
                </main>
                <Sidebar />
            </div>
        </BrowserRouter>
    );
}

export default Root;
