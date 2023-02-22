import { Modal } from '@mui/material';
import React, { useMemo, useCallback, PropsWithChildren, useLayoutEffect, useReducer } from 'react';
import EditEventModal from './components/EditEventModal';
import ListOfMarkers from './components/ListOfMarkers';

import SetPoint from './components/SetMarker/SetMarker';
import { ModalContext } from './context';
import { modalPromise } from './modalPromise';
import reducer from './reducer';
import { ActionTypes, ModalData, ModalProps, ModalState, ModalTypes } from './types';

const modalMapper: Record<ModalTypes, React.FC<ModalProps>> = {
    [ModalTypes.SET_POINT]: SetPoint,
    [ModalTypes.SHOW_LIST_OF_POINT]: ListOfMarkers,
    [ModalTypes.SHOW_EDIT_EVENT]: ({ data }: any) => <EditEventModal defaultValues={data} />,
};

const initialState: ModalState = {
    isOpen: false,
    data: null,
};

export function ModalProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isOpen, type } = state;

    const onModalOpen = useCallback((modalType: ModalTypes, callback?: () => void, data?: ModalData) => {
        callback?.();

        dispatch({ type: ActionTypes.OPEN_MODAL, payload: { isOpen: true, type: modalType, data } });
    }, []);

    const onModalClose = useCallback(() => {
        dispatch({ type: ActionTypes.CHANGE_VISIBILITY, payload: false });
    }, []);

    const contextValue = useMemo(() => ({ isOpen, onModalOpen, onModalClose }), [onModalClose, isOpen, onModalOpen]);

    useLayoutEffect(() => {
        if (!isOpen) {
            modalPromise.getNewPromise();
        }
    }, [isOpen]);

    const ModalComponent = useMemo(() => (type ? modalMapper[type] : () => null), [type]);

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
            <Modal
                sx={{
                    backdropFilter: 'blur(10px)',
                }}
                open={isOpen}
                onClose={onModalClose}
            >
                <div>
                    <ModalComponent data={state.data} />
                </div>
            </Modal>
        </ModalContext.Provider>
    );
}
