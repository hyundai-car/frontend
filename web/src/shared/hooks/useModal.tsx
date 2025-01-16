import { Modal } from '../ui/modal';
import ReactDOM from 'react-dom/client';
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

    const root = ReactDOM.createRoot(modalRoot); // React 18에서 createRoot 사용

    const closeModal = () => {
        root.unmount(); // React Tree 언마운트
        document.body.removeChild(modalRoot); // DOM에서 제거
    };

    const handleConfirm = () => {
        onConfirm?.(); // 확인 액션 실행
        closeModal(); // 모달 닫기
    };

    const handleCancel = () => {
        closeModal(); // 취소 시 모달 닫기
    };

    root.render(
        <Modal
            title={title}
            subTitle={subTitle}
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
            submitAction={handleConfirm}
            closeAction={handleCancel}
        />
    );
};


//사용법 (button, onConfirm은 오른쪽 확인 버튼임. 왼쪽은 무조건 흰색 취소 버튼)
// const open = () => showModal({
//     title: "모달 제목",
//     subTitle: "모달 부제목",
//     buttonLabel: "확인",
//     buttonColor: "blue",
//     onConfirm: () => {
//       console.log("확인 버튼 클릭");
//     },
//})