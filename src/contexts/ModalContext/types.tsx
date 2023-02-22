export enum ActionTypes {
    CHANGE_VISIBILITY = 'ChangeVisibility',
    SET_TYPE = 'SetType',
    OPEN_MODAL = 'OpenModal',
}

type ChangeModalVisibilityAction = {
    payload: boolean;
    type: ActionTypes.CHANGE_VISIBILITY;
};

type SetModalTypeAction = {
    payload: ModalTypes;
    type: ActionTypes.SET_TYPE;
};

type OpenModalAction = {
    payload: ModalState;
    type: ActionTypes.OPEN_MODAL;
};

export type Action = ChangeModalVisibilityAction | SetModalTypeAction | OpenModalAction;

export type ModalData = any;

export interface ModalProps {
    dispatch?: React.Dispatch<Action>;
    data?: ModalData;
}

export enum ModalTypes {
    SET_POINT = 'set-point',
    SHOW_LIST_OF_POINT = 'show-list-of-point',
    SHOW_EDIT_EVENT = 'show-edit-event',
}

export interface ModalState {
    isOpen: boolean;
    data?: ModalData;
    type?: ModalTypes;
}
