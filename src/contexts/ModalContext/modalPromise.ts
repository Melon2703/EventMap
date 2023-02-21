import { EventInfo, EmptyEventInfo } from './components/SetMarker/types';

interface IModalPromiseController {
    instance: Promise<unknown> | null;
    resolve: ((result: EventInfo) => void) | null;
    getNewPromise: () => void;
}

class ModalPromiseController implements IModalPromiseController {
    instance: Promise<EmptyEventInfo> | null;

    resolve: ((result: EmptyEventInfo) => void) | null;

    constructor() {
        this.instance = null;

        this.resolve = null;
    }

    getNewPromise() {
        this.instance = new Promise((resolve) => {
            this.resolve = (result: EmptyEventInfo) => resolve(result);
        });
    }
}

// eslint-disable-next-line import/prefer-default-export
export const modalPromise = new ModalPromiseController();
