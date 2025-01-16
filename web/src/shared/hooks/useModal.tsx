import { Modal } from '../ui/modal';
import ReactDOM from 'react-dom';
import { DefaultTheme } from 'styled-components';

interface ShowModalProps {
    title: string;
    subTitle: string;
    buttonLabel?: string;
    buttonColor?: keyof DefaultTheme["colors"];
    onConfirm?: () => void;
}

export const showModal = ({
    title,
    subTitle,
    buttonLabel,
    buttonColor,
    onConfirm,
}: ShowModalProps) => {
    const modalRoot = document.createElement('div');
    document.body.appendChild(modalRoot);

    const handleConfirm = () => {
        onConfirm?.();
        document.body.removeChild(modalRoot);
    };

    const handleCancel = () => {
        document.body.removeChild(modalRoot);
    };

    ReactDOM.render(
        <Modal
            title={title}
            subTitle={subTitle}
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
            submitAction={handleConfirm}
            closeAction={handleCancel}
        />,
        modalRoot
    );
};