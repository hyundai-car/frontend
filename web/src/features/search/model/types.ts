
// 연료 타입
export type FuelType = '가솔린' | '디젤' | 'LPG' | '하이브리드' | '전기' | 'CNG' | '수소';

// 차종 타입
export type BodyType = '경차' | '소형' | '준중형' | '중형' | '준대형' | '대형' | 'SUV';

// 범위 타입 (예산, 주행거리, 연식)
export type Range = [number, number];

// 필터 상태 타입
export type FilterState = {
  fuel: FuelType[];
  bodyType: BodyType[];
  priceRange: Range;   // 단위: 만원
  mileageRange: Range; // 단위: km
  yearRange: Range;    // 단위: 년도
};

// 필터 드로어 props 타입
export type FilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
};

// 검색박스 props 타입
export type SearchBoxProps = {
  onFilterClick: () => void;
};