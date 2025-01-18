import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "public/icons/arrowDown.svg";

// 각 옵션의 타입 정의
interface Option {
  value: number; // 옵션의 실제 값
  label: string; // 화면에 표시될 텍스트
}

interface SelectProps {
  options: Option[]; // 선택 가능한 옵션들
  value?: number; // 현재 선택된 값
  onChange?: (value: number) => void; // 값 변경 시 호출될 콜백 함수
  placeholder?: string; // 선택되지 않았을 때 표시될 텍스트
}

export const SelectBox = ({
  options,
  value,
  onChange,
  placeholder = "선택",
}: SelectProps) => {
  // 드롭다운의 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 현재 선택된 옵션 상태 관리 (초기값은 props로 받은 value에 해당하는 옵션)
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    options.find((opt) => opt.value === value)
  );

  // 컴포넌트 외부 클릭 감지를 위한 ref
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지를 위한 이벤트 리스너 설정
  useEffect(() => {
    // 클릭된 요소가 SelectBox 외부일 경우 드롭다운 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // 이벤트 리스너 등록 및 클린업
    document.addEventListener("mousedown", handleClickOutside); // mousedown : 마우스 버튼을 누르는 순간 발생하는 이벤트
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // props로 받은 value가 변경될 때 선택된 옵션 업데이트
  useEffect(() => {
    const option = options.find((opt) => opt.value === value);
    setSelectedOption(option);
  }, [value, options]);

  // 옵션 선택 시 처리하는 함수
  const handleSelect = (option: Option) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    setIsOpen(false); // 드롭다운 닫기
    onChange?.(option.value); // 부모 컴포넌트에 변경 알림
  };

  return (
    <SelectContainer ref={selectRef}>
      {/* 선택 버튼 */}
      <SelectButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
      >
        <SelectText $isPlaceholder={!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </SelectText>
        <DropdownIcon $isOpen={isOpen} />
      </SelectButton>

      {/* 드롭다운 옵션 리스트 */}
      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option)}
              $isSelected={selectedOption?.value === option.value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 150px;
`;

// 선택 버튼
const SelectButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 8px 16px;
  height: 31px;

  background: white;
  border: 1px solid var(--navy);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  text-align: center;

  align-items: center;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

// 선택된 텍스트 (placeholder 여부에 따라 색상 변경)
const SelectText = styled.span<{ $isPlaceholder: boolean }>`
  flex: 1;
  padding-left: 10px;
  color: ${({ $isPlaceholder }) => ($isPlaceholder ? "#9ca3af" : "#111827")};

  display: -webkit-box; /* Flexbox와 비슷한 박스 모델 */
  -webkit-line-clamp: 1; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임표 추가 */
  word-break: break-word; /* 단어를 줄 바꿈 */
`;

// 드롭다운 화살표 아이콘 (열림/닫힘 상태에 따라 회전)
const DropdownIcon = styled(Arrow)<{ $isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

// 옵션 리스트 컨테이너
const OptionsList = styled.ul`
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: 4px;
  padding: 4px 0;
  background: white;
  border: 1px solid var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 240px;
  overflow-y: auto;
  line-height: 1.2;

  // 스크롤바 커스터마이징
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

// 개별 옵션 아이템 (선택 여부에 따라 배경색 변경)
const OptionItem = styled.li<{ $isSelected: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  background: ${({ $isSelected }) =>
    $isSelected ? "var(--gray-blue)" : "transparent"};
`;
