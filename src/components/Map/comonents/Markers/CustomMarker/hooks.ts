import { useCallback } from 'react';
import { useModal } from '../../../../../contexts/ModalContext/context';
import { ModalTypes } from '../../../../../contexts/ModalContext/types';
import { EventInfo } from '../../../../../contexts/ModalContext/components/SetMarker/types';

export const useMarkerOpener = () => {
    const { onModalOpen } = useModal();

    return useCallback(
        (eventInfo: EventInfo) => {
            onModalOpen(ModalTypes.SHOW_EDIT_EVENT, undefined, eventInfo);
        },
        [onModalOpen],
    );
};
