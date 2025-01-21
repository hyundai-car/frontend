import { getCookie, removeCookie, setCookie } from "@/shared/util/cookie";
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
 * @description 웹뷰에서 refresh하여 새로운 accesstoken 발급
 * */
declare global {
  interface Window {
    AndroidBridge: {
      getAccessToken: () => string;  // 토큰을 반환하는 함수
      getRefreshToken: () => string; // 토큰을 갱신하는 함수
      getUserInfo: () => string;
      moveToMy: () => void;
      getUserName: () => string,
      getUserEmail: () => string,
      getUserPhoneNumber: () => string,
    };
  }
}

function fetchNewAccessToken() {
  try {
    // Android 인터페이스 메서드 호출
    const token: string = window.AndroidBridge.getRefreshToken();
    if (token) {
      setCookie("TOKEN_KEY", token, 30);
      return token;
    } else {
      console.error("토큰이 없습니다.");
    }
  } catch (error) {
    console.error("WebView와 통신 중 오류 발생:", error);
  }
}

/**
 * @description 웹뷰에서 accesstoken 가져오는 함수
 * */
function fetchAccessToken() {
  try {
    // Android 인터페이스 메서드 호출
    const token: string = window.AndroidBridge.getAccessToken();
    if (token) {
      setCookie("ACCESS_TOKEN", token, 30);
      return token;
    } else {
      console.error("토큰이 없습니다.");
    }
  } catch (error) {
    console.error("WebView와 통신 중 오류 발생:", error);
  }
}

/**
 * @description 요청 인터셉터 : 헤더에 access token 추가
 * */

authenticated.interceptors.request.use((config) => {
  let ACCESS_TOKEN: string = getCookie("ACCESS_TOKEN") ?? "";
  let userName = localStorage.getItem("userName");
  console.error("사용자 존재!", userName);
  if (userName == null) {
    userName = window.AndroidBridge.getUserName();
    let userEmail = window.AndroidBridge.getUserEmail();
    let userNumber = window.AndroidBridge.getUserPhoneNumber();
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userNumber");
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userNumber", userNumber);
    console.error("사용자 가져옴!!!", userName, userNumber);
  }

  try {
    ACCESS_TOKEN = (fetchAccessToken()) ?? "";
  } catch (error) {
    console.error("토큰 가져오기 실패:", error);
    throw error;
  }

  if (ACCESS_TOKEN) {
    config.headers["Authorization"] = `${ACCESS_TOKEN}`;
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
      console.error(
        "API 에러 발생:",
        error.response?.status,
        error.response?.data
      );
      throw error.response?.data || error;
    } else {
      console.error("알 수 없는 에러:", error.message);
    }
    if (error.response?.status === 401) {
      // 필요 시 토큰 삭제 및 재로그인 처리
      removeCookie("ACCESS_TOKEN")
      let newToken: string = "";
      try {
        newToken = fetchNewAccessToken() ?? "";
        setCookie("ACCESS_TOKEN", newToken, 30);
      } catch (error) {
        console.error("토큰 가져오기 실패:", error);
        throw error;
      }
      throw error.response?.data || error;
    } else {
      console.error("알 수 없는 에러:", error.message);
      throw error;
    }
  }
);
