import { useForm } from "react-hook-form";
import { FilterDrawerProps, FilterState } from "../model/types";
import { INITIAL_FILTERS, FUEL_TYPES, BODY_TYPES } from "../model/constants";
import * as S from "./styles";
import { SelectSection } from "./FilterDrawer/SelectSection";
import { Icon } from "@/shared/ui/Icon/Icon";
import { Drawer } from "@mui/material";
import { RangeSection } from "./FilterDrawer/RangeSection";
import { BasicButton } from "@/shared/ui/button";
import { useSearchStore } from "../model/store";

export const FilterDrawer = ({ isOpen, onClose }: FilterDrawerProps) => {
  const { filters, setFilters, printSearchConditions } = useSearchStore();
  const { control, handleSubmit, reset } = useForm<FilterState>({
    defaultValues: filters,
  });

  // 폼 제출 처리, 나중에 API 호출로 변경될 부분
  const onSubmit = (data: FilterState) => {
    setFilters(data);
    printSearchConditions();
    onClose();
  };

  // 필터 초기화 처리
  const handleReset = () => {
    reset(INITIAL_FILTERS);
    // onFilterChange(INITIAL_FILTERS);
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose} keepMounted={false}>
      <S.DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Header>
            <S.HeaderLeft>
              <Icon type="close" size={16} onClick={onClose} />
              <S.Title>필터</S.Title>
            </S.HeaderLeft>
            <S.Reset type="button" onClick={handleReset}>
              초기화
            </S.Reset>
          </S.Header>

          <S.SectionWrap>
            <SelectSection
              control={control}
              title="연료"
              name="fuel"
              options={FUEL_TYPES}
            />

            <SelectSection
              control={control}
              title="차종"
              name="bodyType"
              options={BODY_TYPES}
            />

            <RangeSection control={control} title="예산" name="priceRange" />
            <RangeSection
              control={control}
              title="주행거리"
              name="mileageRange"
            />
            <RangeSection control={control} title="연식" name="yearRange" />
          </S.SectionWrap>
          <S.ButtonWrap>
            <BasicButton color="navy" onClick={handleSubmit(onSubmit)}>
              검색 결과 보기
            </BasicButton>
          </S.ButtonWrap>
        </form>
      </S.DrawerContent>
      <div style={{ height: "80px" }} />
    </Drawer>
  );
};
