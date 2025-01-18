/**
 * 원 단위 가격을 만 단위로 변환합니다.
 * @param price - 원 단위 가격 (예: 35000000)
 * @returns 만 단위 가격 (예: 3500)
 */
export const convertToManWon = (price: number): number => {
  return Math.floor(price / 10000);
};

/**
 * 만 단위 가격을 원 단위로 변환합니다.
 * @param manWon - 만 단위 가격 (예: 3500)
 * @returns 원 단위 가격 (예: 35000000)
 */
export const convertToWon = (manWon: number): number => {
  return manWon * 10000;
};

/**
 * 만 단위 가격을 포맷팅된 문자열로 변환합니다.
 * @param manWon - 만 단위 가격 (예: 3500)
 * @returns 포맷팅된 가격 문자열 (예: "3,500만원")
 */
export const formatManWon = (manWon: number): string => {
  return `${manWon.toLocaleString()}`;
};

// 사용 예시:
// const price = 35000000;
// const inManWon = convertToManWon(price); // 3500
// const formatted = formatManWon(inManWon); // "3,500만원"
// const backToWon = convertToWon(inManWon); // 35000000