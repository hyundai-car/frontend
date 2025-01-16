import { useState } from 'react';
import { Modal } from '../ui/modal';
import { DefaultTheme } from 'styled-components';

interface ModalOptions {
    title: string;
    subTitle: string;
    buttonLabel?: string;
    buttonColor?: keyof DefaultTheme["colors"];
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface UseModalReturn {
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
    ModalComponent: () => JSX.Element | null;
}

export const useModal = (): UseModalReturn => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

    const openModal = (options: ModalOptions) => {
        setModalOptions(options);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalOptions(null);
    };

    const handleConfirm = () => {
        modalOptions?.onConfirm?.();
        closeModal();
    };

    const handleCancel = () => {
        modalOptions?.onCancel?.();
        closeModal();
    };

    const ModalComponent = () => {
        if (!isOpen || !modalOptions) return null;

        return (
                <Modal
                    title={modalOptions.title}
            subTitle={modalOptions.subTitle}
            buttonLabel={modalOptions.buttonLabel}
            buttonColor={modalOptions.buttonColor}
            submitAction={handleConfirm}
            closeAction={handleCancel}  // closeAction prop 추가
            />
        );
    };

    return {
        openModal,
        closeModal,
        ModalComponent,
    };
};