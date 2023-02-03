import { Box, Button, Modal, SxProps, Theme } from '@mui/material';
import React, {
    createContext,
    useState,
    useContext,
    useMemo,
    useCallback,
    PropsWithChildren,
    useLayoutEffect,
} from 'react';

interface IModalContext {
    isOpen: boolean;
    onModalOpen: () => Promise<unknown>;
    onModalClose: () => void;
}

const ModalContext = createContext<IModalContext>({
    isOpen: false,
    onModalOpen: () => Promise.resolve(true),
    onModalClose: () => {},
});

const modalSx: SxProps<Theme> = {
    width: 200,
    background: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '24px',
};

class ModalPromiseController {
    instance: null;

    resolve: null;

    constructor() {
        this.instance = null;

        this.resolve = null;
    }

    getNewPromise() {
        // @ts-expect-error
        this.instance = new Promise((resolve) => {
            // @ts-expect-error
            this.resolve = (result: boolean) => resolve(result);
        });
    }
}

const modalPromise = new ModalPromiseController();

export function ModalProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);

    const onModalOpen = useCallback(() => {
        setIsOpen(true);

        return modalPromise.instance;
    }, []);

    const onModalClose = useCallback(() => {
        // @ts-expect-error
        modalPromise.resolve(false);

        setIsOpen(false);
    }, []);

    const onAccept = useCallback(() => {
        // @ts-expect-error
        modalPromise.resolve(true);

        setIsOpen(false);
    }, []);

    const contextValue = useMemo(() => ({ isOpen, onModalOpen, onModalClose }), [onModalClose, isOpen, onModalOpen]);

    useLayoutEffect(() => {
        if (!isOpen) {
            modalPromise.getNewPromise();
        }
    }, [isOpen]);

    return (
        // @ts-expect-error
        <ModalContext.Provider value={contextValue}>
            {children}
            <Modal open={isOpen} onClose={onModalClose}>
                <Box sx={modalSx}>
                    <h2>Установка метки</h2>
                    <p>Подтвердите установку метки</p>
                    <Button onClick={onModalClose}>Close</Button>
                    <Button onClick={onAccept}>Accept</Button>
                </Box>
            </Modal>
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
