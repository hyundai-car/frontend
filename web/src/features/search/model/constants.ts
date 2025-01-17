export const FUEL_TYPES = [
  "가솔린",
  "디젤",
  "LPG",
  "하이브리드",
  "전기",
  "CNG",
  "수소",
] as const;

export const BODY_TYPES = [
  "경차",
  "소형",
  "준중형",
  "중형",
  "준대형",
  "대형",
  "SUV",
] as const;

export const RANGE_CONSTRAINTS = {
  priceRange: {
    min: 0,
    max: 10000,
    step: 100,
    format: (value: number) => `${value.toLocaleString()}만원`,
  },
  mileageRange: {
    min: 0,
    max: 200000,
    step: 5000,
    format: (value: number) => `${value.toLocaleString()}km`,
  },
  yearRange: {
    min: 2010,
    max: 2024,
    step: 1,
    format: (value: number) => `${value}년`,
  },
} as const;

export const INITIAL_FILTERS = {
  fuel: [] as (typeof FUEL_TYPES)[number][],
  bodyType: [] as (typeof BODY_TYPES)[number][],
  priceRange: [
    RANGE_CONSTRAINTS.priceRange.min,
    RANGE_CONSTRAINTS.priceRange.max,
  ] as [number, number],
  mileageRange: [
    RANGE_CONSTRAINTS.mileageRange.min,
    RANGE_CONSTRAINTS.mileageRange.max,
  ] as [number, number],
  yearRange: [
    RANGE_CONSTRAINTS.yearRange.min,
    RANGE_CONSTRAINTS.yearRange.max,
  ] as [number, number],
} as const;
