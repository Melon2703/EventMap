import { createContext, useContext } from 'react';
import { ModalData, ModalTypes } from './types';

interface IModalContext {
    isOpen: boolean;
    onModalOpen: (modalType: ModalTypes, callback?: () => void, data?: ModalData) => void;
    onModalClose: () => void;
}

export const ModalContext = createContext<IModalContext>({
    isOpen: false,
    onModalOpen: () => {},
    onModalClose: () => {},
});

export const useModal = () => useContext(ModalContext);
