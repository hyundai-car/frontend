import styled from "styled-components";

export const DrawerContent = styled.div`
  width: 360px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
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
  gap: 8px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const Reset = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #333;
  }
`;

export const ButtonWrap = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 16px 0;
  margin-top: 24px;
  border-top: 1px solid #eee;
`;

// FilterSections/styles.ts

export const Section = styled.section`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 12px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterButton = styled.button<{ $selected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${({ $selected }) => ($selected ? "#2573e5" : "#ddd")};
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
  padding: 0 12px;
`;

export const RangeText = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;
