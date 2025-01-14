import { Drawer, Slider } from '@mui/material'
import styled from 'styled-components'
import { Icon } from '@/shared/ui/Icon/Icon'
import { FilterDrawerProps, FuelType, BodyType, FilterState } from '../model/types'
import { BasicButton } from '@/shared/ui/button'
import { useForm, Controller } from 'react-hook-form'
const FUEL_TYPES: FuelType[] = ['가솔린', '디젤', 'LPG', '하이브리드', '전기', 'CNG', '수소']
const BODY_TYPES: BodyType[] = ['경차', '소형', '준중형', '중형', '준대형', '대형', 'SUV']

export const INITIAL_FILTERS: FilterState = {
  fuel: [],
  bodyType: [],
  priceRange: [0, 10000],
  mileageRange: [0, 200000],
  yearRange: [2010, 2024]
}

export const FilterDrawer = ({ isOpen, onClose, filters, onFilterChange }: FilterDrawerProps) => {
  // React Hook Form 설정
  // defaultValues로 현재 필터 상태 사용
  const { control, handleSubmit, reset } = useForm<FilterState>({
    defaultValues: filters
  })

  // 폼 제출 처리
  // 나중에 API 호출로 변경될 부분
  const onSubmit = (data: FilterState) => {
    onFilterChange(data)
    onClose()
  }

  // 필터 초기화 처리
  const handleReset = () => {
    reset(INITIAL_FILTERS)
    onFilterChange(INITIAL_FILTERS)
  }

  // 값 포맷팅 함수들
  const formatPrice = (value: number) => `${value.toLocaleString()}만원`
  const formatMileage = (value: number) => `${value.toLocaleString()}km`
  const formatYear = (value: number) => `${value}년`

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
    >
      <DrawerContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header>
            <HeaderLeft>
              <Icon type="close" size={16} onClick={onClose} />
              <Title>필터</Title>
            </HeaderLeft>
            <Reset type="button" onClick={handleReset}>
              초기화
            </Reset>
          </Header>
          {/* 연료 타입 선택 */}
          <Section>
            <SectionTitle>연료</SectionTitle>
            <Controller
              name="fuel"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ButtonGroup>
                  {FUEL_TYPES.map(fuel => (
                    <FilterButton
                      type="button"
                      key={fuel}
                      selected={value.includes(fuel)}
                      onClick={() => {
                        const newValue = value.includes(fuel)
                          ? value.filter(f => f !== fuel)
                          : [...value, fuel]
                        onChange(newValue)
                      }}
                    >
                      {fuel}
                    </FilterButton>
                  ))}
                </ButtonGroup>
              )}
            />
          </Section>

          {/* 차종 선택 */}
          <Section>
            <SectionTitle>차종</SectionTitle>
            <Controller
              name="bodyType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ButtonGroup>
                  {BODY_TYPES.map(type => (
                    <FilterButton
                      type="button"
                      key={type}
                      selected={value.includes(type)}
                      onClick={() => {
                        const newValue = value.includes(type)
                          ? value.filter(t => t !== type)
                          : [...value, type]
                        onChange(newValue)
                      }}
                    >
                      {type}
                    </FilterButton>
                  ))}
                </ButtonGroup>
              )}
            />
                  </Section>
                  
          {/* 예산 범위 슬라이더 */}
          <Section>
            <SectionTitle>예산</SectionTitle>
            <SliderContainer>
              <Controller
                name="priceRange"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <Slider
                      value={value}
                      onChange={(_, newValue) => onChange(newValue as [number, number])}
                      valueLabelDisplay="auto"
                      valueLabelFormat={formatPrice}
                      min={0}
                      max={10000}
                      step={100}
                    />
                    <RangeText>
                      {formatPrice(value[0])} - {formatPrice(value[1])}
                    </RangeText>
                  </>
                )}
              />
            </SliderContainer>
          </Section>

          {/* 주행거리 범위 슬라이더 */}
          <Section>
            <SectionTitle>주행거리</SectionTitle>
            <SliderContainer>
              <Controller
                name="mileageRange"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <Slider
                      value={value}
                      onChange={(_, newValue) => onChange(newValue as [number, number])}
                      valueLabelDisplay="auto"
                      valueLabelFormat={formatMileage}
                      min={0}
                      max={200000}
                      step={5000}
                    />
                    <RangeText>
                      {formatMileage(value[0])} - {formatMileage(value[1])}
                    </RangeText>
                  </>
                )}
              />
            </SliderContainer>
          </Section>

          {/* 연식 범위 슬라이더 */}
          <Section>
            <SectionTitle>연식</SectionTitle>
            <SliderContainer>
              <Controller
                name="yearRange"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <Slider
                      value={value}
                      onChange={(_, newValue) => onChange(newValue as [number, number])}
                      valueLabelDisplay="auto"
                      valueLabelFormat={formatYear}
                      min={2010}
                      max={2024}
                      step={1}
                    />
                    <RangeText>
                      {formatYear(value[0])} - {formatYear(value[1])}
                    </RangeText>
                  </>
                )}
              />
            </SliderContainer>
          </Section>


                  {/* 적용 버튼 type="submit" */}
                  <ButtonWrap>
                      
            <BasicButton onClick={() => { console.log("click") }} color="navy">
            검색 결과 보기
          </BasicButton>
                  </ButtonWrap>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
const DrawerContent = styled.div`
  width: 360px;
  padding: 20px;
  height: 100%;
  position: relative;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Title = styled.div`
margin-top: 1px;
  font-size: var(--semi-bold--md-small);
  font-weight: 700;
  line-height: 20px;
`

const Reset = styled.button`
  border: none;
  background: none;
  color: var(--dark-gray);
  cursor: pointer;
`

const Section = styled.div`
  margin-bottom: 24px;
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
`

const SliderContainer = styled.div`
  padding: 0 12px;
`

const RangeText = styled.div`
  margin-top: 8px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const FilterButton = styled.button<{ selected?: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${p => p.selected ? '#3B82F6' : '#E5E7EB'};
  background: ${p => p.selected ? '#EFF6FF' : 'white'};
  color: ${p => p.selected ? '#3B82F6' : '#374151'};
  cursor: pointer;
`
const ButtonWrap = styled.div`
position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;

    `