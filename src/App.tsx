import React from 'react';
import Root from './components/Root/Root';
import { ModalProvider } from './contexts/ModalContext/ModalContext';

function App() {
    return (
        <ModalProvider>
            <Root />
        </ModalProvider>
    );
}

export default App;
