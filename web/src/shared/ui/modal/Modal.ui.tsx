import styled, { DefaultTheme } from "styled-components";
import { theme } from "@app/styles/theme.ts";

interface ModalProps {
    title: string;
    subTitle: string;
    buttonLabel?: string;
    buttonColor?: keyof DefaultTheme["colors"];
    submitAction: () => void;
    closeAction: () => void;
}

export const Modal = ({
    title,
    subTitle,
    buttonLabel = "확인",
    buttonColor = "blue",
    submitAction,
    closeAction,
}: ModalProps) => {

    return (
        <Background>
            <Container>
                <ModalContent>
                    <Title>
                        {title}
                    </Title>
                    <SubTitle>
                        {subTitle}
                    </SubTitle>
                </ModalContent>
                <Footer>
                    <ActionButton onClick={closeAction} $color={"white"} $cancel={false}>
                        취소
                    </ActionButton>
                    <ActionButton onClick={submitAction} $color={buttonColor} $cancel={true}>
                        {buttonLabel}
                    </ActionButton>
                </Footer>
            </Container>
        </Background>
    )

}

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--black-background);
    z-index: 999;
    
`

const Container = styled.div`
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: var(--white);
    width: 100%;
    margin-right: 50px;
    margin-left: 50px;
    min-height: 100px;
    display:flex;
    flex-direction: column;
    flex:1;
`
const ModalContent = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    padding: 30px;
`


const Title = styled.div`
    font-size : var(--lg-small);
    font-weight: 800;
`

const SubTitle = styled.div`
    margin-top: 4px;
    font-size : var(--regular--sm);
`

const Footer = styled.div`
  display: flex;
  border-top: 1px solid #e0e0e0; /* 상단 경계선 */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
`;

const ActionButton = styled.button<{
    $color: keyof DefaultTheme["colors"];
    $cancel: boolean;
}>`
  flex: 1; 
  padding: 10px 0;
  background-color: ${(props) => theme.colors[props.$color]};
  color: ${(props) => (props.$cancel ? theme.colors["white"] : theme.colors["black"])};
  border: none;
  border-radius: 0;
  font-size: var(--regular--md-small);
  margin-top: auto;
`;