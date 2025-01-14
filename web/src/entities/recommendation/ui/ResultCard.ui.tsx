import { useBestCar } from "@/pages/recommendation/model/queries";
import { bestCar, Comparison } from "@/widgets/recommendation/model/types";
import { ComponentType, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  // bestCar: bestCar;
  // comparison: Comparison;
  topSlot: ReactNode;
  bottomSlot: ReactNode;
};

export function ResultCard({ topSlot, bottomSlot }: Props) {
  // export function ResultCard({ topSlot }: Props) {
  // const { data, isLoading } = useBestCar();
  // const { bestCar } = data;

  return (
    <Container>
      <HeaderSection></HeaderSection>
      <MainSection>{topSlot}</MainSection>

      <FooterSection>{bottomSlot}</FooterSection>
    </Container>
  );
}

const Container = styled.div``;
const HeaderSection = styled.section``;
const MainSection = styled.section``;
const FooterSection = styled.section``;
