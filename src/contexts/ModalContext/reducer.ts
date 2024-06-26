import { ModalState, Action, ActionTypes } from './types';

const reducer = (state: ModalState, action: Action): ModalState => {
    switch (action.type) {
        case ActionTypes.CHANGE_VISIBILITY:
            return {
                ...state,
                isOpen: action.payload,
            };
        case ActionTypes.SET_TYPE:
            return {
                ...state,
                type: action.payload,
            };
        case ActionTypes.OPEN_MODAL:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
