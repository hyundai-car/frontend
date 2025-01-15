import styled from "styled-components";
export const DrawerContent = styled.div`
  width: 360px;
  padding: 16px;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Title = styled.h1`
  margin-top: 1px;
  font-size: var(--semi-bold--md-small);
  font-weight: 700;
  line-height: 20px;
`;

export const Reset = styled.button`
  border: none;
  background: none;
  color: var(--dark-gray);
  cursor: pointer;
`;
export const ButtonWrap = styled.div`
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
`;

// FilterSections/styles.ts

export const Section = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterButton = styled.button<{ $selected: boolean }>`
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $selected }) => ($selected ? "#2573e5" : "#eee")};
  background-color: ${({ $selected }) => ($selected ? "#2573e5" : "white")};
  color: ${({ $selected }) => ($selected ? "white" : "#666")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "#2573e5" : "#999")};
    color: ${({ $selected }) => ($selected ? "white" : "#333")};
  }
`;

export const SliderContainer = styled.div`
  padding: 0 20px;
`;

export const RangeText = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
  margin-top: 4px;
`;

export const SectionWrap = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
