/**
 * @file config.ts (설정값)
 * @description 애플리케이션의 라우터 경로를 정의합니다.
 *
 * @exmaple
 * 차량 상세 페이지 경로 생성
 * const path = pathKeys.cars.carsDetail({ carNo: "123" });
 * 결과: '/cars/carsDetail?carNo=123'
 */

import { CarsDetailParams, SearchQueryParams } from "@/shared/lib/react-router/router.types";

export const pathKeys = {
  root: "/",
  page404: () => pathKeys.root.concat("404/"),
  login: () => pathKeys.root.concat("login/"),
  register: () => pathKeys.root.concat("register/"),
  home: () => pathKeys.root,
  // recommendation: () => pathKeys.root.concat("recommendation/"),
  recommendation: {
    root: () => pathKeys.root.concat("recommendation/"),
    candidates: () => pathKeys.recommendation.root().concat("candidates/"),
    result: () => pathKeys.recommendation.root().concat("result/"),
  },

  // cars/carsDetail?carNo=123123
  cars: {
    root: () => pathKeys.root.concat("cars/"),
    carsDetail: ({ carNo }: CarsDetailParams) =>
      pathKeys.cars.root().concat("carsDetail?carNo=", carNo),
  },
  search: () => pathKeys.root.concat("search"),
  searchResult: (params: SearchQueryParams) => {
    const searchParams = new URLSearchParams();
    
    if (params.query) searchParams.append('query', params.query);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.size) searchParams.append('size', params.size.toString());
    
    const queryString = searchParams.toString();
    return pathKeys.search().concat(
      "/result",
      queryString ? `?${queryString}` : ''
    );
  },
};