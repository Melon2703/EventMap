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

export interface ModalProps {
    dispatch: React.Dispatch<Action>;
}

export enum ModalTypes {
    SET_POINT = 'set-point',
    SHOW_LIST_OF_POINT = 'show-list-of-point',
}

export interface ModalState {
    isOpen: boolean;
    type?: ModalTypes;
}
