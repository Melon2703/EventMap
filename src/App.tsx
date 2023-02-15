import React from 'react';
import { MarkersContextProvider } from './components/Map/comonents/Markers/MarksContextProvider';
import Root from './components/Root/Root';
import { ModalProvider } from './contexts/ModalContext/ModalContext';

function App() {
    return (
        <MarkersContextProvider>
            <ModalProvider>
                <Root />
            </ModalProvider>
        </MarkersContextProvider>
    );
}

export default App;
