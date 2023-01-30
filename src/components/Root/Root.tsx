import React from 'react';
import { Button } from '@mui/material';
import Map from '../Map/Map';
import './Root.css';

function Root() {
  return (
    <div className="app-container">
      <Map className="map" />
      <aside>
        <Button variant="text">Menu</Button>
      </aside>
    </div>
  );
}

export default Root;
