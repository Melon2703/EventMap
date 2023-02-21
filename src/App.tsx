import React from 'react';
import { MarkersContextProvider } from './components/Map/comonents/Markers/MarksContextProvider';
import Root from './components/Root/Root';
import { AuthContextProvider } from './contexts/AuthContext/AuthContext';
import { ModalProvider } from './contexts/ModalContext/ModalProvider';

function App() {
    return (
        <AuthContextProvider>
            <MarkersContextProvider>
                <ModalProvider>
                    <Root />
                </ModalProvider>
            </MarkersContextProvider>
        </AuthContextProvider>
    );
}

export default App;
