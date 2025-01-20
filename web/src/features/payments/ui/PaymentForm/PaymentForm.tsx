import { Icon } from "@/shared/ui/Icon/Icon";
import { IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CARD_COMPANIES } from "../../model/constants";
import { usePaymentFormStore } from "../../model/store";
import { formatCardNumber, formatExpiryDate } from "../../lib/lib";
import { getLocalStorageValue } from "@/shared/util/localStorage";

export function PaymentForm() {
  const userInfo = JSON.parse(getLocalStorageValue("userInfo") || "{}");
  const name = userInfo.name || "디폴트";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);
  const {
    cardCompany,
    cardNumber,
    expiryDate,
    setCardNumber,
    setExpiryDate,
    setIsValid,
  } = usePaymentFormStore();

  const scrollToInput = () => {
    console.log("Current scroll before:", window.pageYOffset);
    window.scrollTo({ top: 300, behavior: "smooth" });
    console.log("Current scroll after:", window.pageYOffset);
  };

  const scrollToOriginal = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 폼 유효성 검사
  useEffect(() => {
    const isFormValid = !!(
      cardCompany &&
      cardNumber.replace(/\s/g, "").length === 16 &&
      expiryDate.length === 5
    );

    setIsValid(isFormValid);
  }, [cardCompany, cardNumber, expiryDate, setIsValid]);

  const handleCardSelect = (card: {
    id: number;
    name: string;
    image: string;
  }) => {
    setSelectedCard(card);
    setIsOpen(false);
  };

  return (
    <FullContainer>
      <NameWrap>
        <Name>성명</Name>
        <NameDesc>{name}</NameDesc>
      </NameWrap>
      <Container>
        <FormContainer>
          {/* 카드사 선택 */}
          <SelectCardContainer>
            <SelectCardButton onClick={() => setIsOpen(!isOpen)}>
              <SelectCardText>
                {selectedCard ? selectedCard.name : "카드사를 선택해 주세요"}
              </SelectCardText>
              <IconButton size="small">
                {isOpen ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
              </IconButton>
            </SelectCardButton>

            {/* 카드사 선택 드롭다운 */}
            {isOpen && (
              <DropdownContainer>
                <CardGrid>
                  {CARD_COMPANIES.map((card) => (
                    <CardItem
                      key={card.id}
                      onClick={() => handleCardSelect(card)}
                    >
                      <CardImage src={card.image} alt={card.name} />
                      <CardName>{card.name}</CardName>
                    </CardItem>
                  ))}
                </CardGrid>
              </DropdownContainer>
            )}
          </SelectCardContainer>

          {/* 카드 번호 입력 */}
          <InputContainer>
            <StyledTextField
              fullWidth
              label="카드번호"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              inputProps={{ maxLength: 19 }}
              variant="outlined"
              onFocus={scrollToInput}
              onBlur={scrollToOriginal}
            />
          </InputContainer>

          {/* 유효기간 입력 */}
          <InputContainer>
            <StyledTextField
              fullWidth
              label="유효기간"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              placeholder="MM/YY"
              inputProps={{ maxLength: 5 }}
              variant="outlined"
              onFocus={scrollToInput}
              onBlur={scrollToOriginal}
            />
          </InputContainer>
        </FormContainer>
        <div style={{ height: "500px" }} />
      </Container>
    </FullContainer>
  );
}
const FullContainer = styled.div`
  /* height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0 20px; */
`;
const NameWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;
const Name = styled.div`
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #a2a2a2;
`;
const NameDesc = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #a2a2a2;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 17px 0;
  background-color: #fff;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 20px 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SelectCardContainer = styled.div`
  position: relative;
`;

const SelectCardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const SelectCardText = styled.span`
  color: #333;
`;

const DropdownContainer = styled.div`
  padding: 16px 0;
  border-radius: 8px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CardImage = styled.img`
  width: 70px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const CardName = styled.span`
  font-size: 14px;
  color: #333;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;
