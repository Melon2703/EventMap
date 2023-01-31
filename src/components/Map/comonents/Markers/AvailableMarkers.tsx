import React from 'react';
import CustomMarker from './CustomMarker/CustomMarker';

const pointsIds = ['firstPoint', 'secondPoint', 'thirdPoint'];

function AvailableMarkers() {
    return (
        <>
            {pointsIds.map((id, i) => (
                <CustomMarker order={i} key={id} />
            ))}
        </>
    );
}

export default React.memo(AvailableMarkers);
