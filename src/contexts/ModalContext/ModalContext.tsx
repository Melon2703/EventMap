import { Modal } from '@mui/material';
import React, {
    createContext,
    useContext,
    useMemo,
    useCallback,
    PropsWithChildren,
    useLayoutEffect,
    useReducer,
} from 'react';
import ListOfMarkers from './components/ListOfMarkers';
// eslint-disable-next-line import/no-cycle
import SetPoint from './components/SetMarker/SetMarker';
import EventInfo from './components/SetMarker/types';
import reducer from './reducer';
import { ActionTypes, ModalProps, ModalState, ModalTypes } from './types';

interface IModalContext {
    isOpen: boolean;
    onModalOpen: (modalType: ModalTypes, callback?: () => void) => void;
    onModalClose: () => void;
}

const ModalContext = createContext<IModalContext>({
    isOpen: false,
    onModalOpen: () => {},
    onModalClose: () => {},
});

const modalMapper: Record<ModalTypes, React.FC<ModalProps>> = {
    [ModalTypes.SET_POINT]: SetPoint,
    [ModalTypes.SHOW_LIST_OF_POINT]: ListOfMarkers,
};

interface IModalPromiseController {
    instance: Promise<unknown> | null;
    resolve: ((result: EventInfo) => void) | null;
    getNewPromise: () => void;
}

// TODO: унести
class ModalPromiseController implements IModalPromiseController {
    instance: Promise<EventInfo> | null;

    resolve: ((result: EventInfo) => void) | null;

    constructor() {
        this.instance = null;

        this.resolve = null;
    }

    getNewPromise() {
        this.instance = new Promise((resolve) => {
            this.resolve = (result: EventInfo) => resolve(result);
        });
    }
}

export const modalPromise = new ModalPromiseController();

const initialState: ModalState = {
    isOpen: false,
};

export function ModalProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { isOpen, type } = state;

    const onModalOpen = useCallback((modalType: ModalTypes, callback?: () => void) => {
        callback?.();

        dispatch({ type: ActionTypes.OPEN_MODAL, payload: { isOpen: true, type: modalType } });
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
                <ModalComponent dispatch={dispatch} />
            </Modal>
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
