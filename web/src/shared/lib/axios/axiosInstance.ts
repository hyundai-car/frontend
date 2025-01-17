import { getCookie } from "@/shared/util/cookie";
import axios from "axios";

// 인증 필요 없는 경우
export const nonAuthenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

// 인증 필요한 경우
export const authenticated = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

/**
 * @description 요청 인터셉터 : 헤더에 access token 추가
 * */
authenticated.interceptors.request.use((config) => {
  const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
  // const ACCESS_TOKEN =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzMyMDMzMDg2LCJleHAiOjE3MzIwMzQ4ODZ9.g_xZ1ZaY9SOi3WoFyxABB5lGiaZE5I9ejm7-408X4RLTDj24pZizpcAeg8VWfu79SiwGV8rwhQjmrHxP6OthfQ'

  if (ACCESS_TOKEN) {
    config.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
  } else {
    // 로그인 페이지로 이동
    // window.location.href = "";
  }
  return config;
});

/**
 * @description 응답 인터셉터
 * */
authenticated.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        throw new Error("서버 에러가 발생했습니다.");
      }
    }

    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
);
