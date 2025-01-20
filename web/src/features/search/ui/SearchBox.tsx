import styled from "styled-components";
import { Icon } from "@/shared/ui/Icon/Icon";
import { useSearchStore } from "../model/store";

type Props = {
  onFilterClick: () => void;
};
export const SearchBox = ({ onFilterClick }: Props) => {
  const { keyword, setKeyword } = useSearchStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(e.currentTarget.value);
      // e.currentTarget.value = ""; // 입력 내용을 초기화
    }
  };
  return (
    <Container>
      <Icon type="search" color="deepDarkGray" size={16} />
      <SearchInput
        placeholder="차량을 검색하세요"
        onKeyDown={handleKeyDown}
        defaultValue={keyword}
      />
      <Icon type="filter" size={16} onClick={onFilterClick} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  gap: 8px;
  padding: 17px 20px;
  background-color: var(--light-gray);
  border-radius: 8px;
  border: 0.5px solid #dfdfdf;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  font-size: 14px;
  outline: none;
  background-color: transparent;
`;
