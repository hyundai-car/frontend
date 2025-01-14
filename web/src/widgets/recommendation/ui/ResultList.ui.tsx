import { ResultItem } from "@/entities/recommendation/ui/ResultItem.ui";
import { useBestCar } from "@/pages/recommendation/model/queries";
import styled from "styled-components";
import { ReactComponent as CashIcon } from "public/icons/cash.svg";
import { ReactComponent as DrivingIcon } from "public/icons/driving.svg";

export function ResultList() {
  const { data } = useBestCar();
  const { bestCar, comparisons } = data;

  // comparisions에서의 값과 bestCar에서의 값 비교해서 color 넣어주기
  return (
    <Container>
      <ResultItem itemName="가격" Icon={CashIcon} color="white" />
      {/* <ResultItem itemName="가격" Icon={DrivingIcon} color="white" /> */}
    </Container>
  );
}

const Container = styled.div`
  background-color: blueviolet;
`;
