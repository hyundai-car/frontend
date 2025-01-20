// // import { getCookie } from "@/shared/util/cookie";
// import axios from "axios";

// // 인증 필요 없는 경우
// export const nonAuthenticated = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
// });

// // 인증 필요한 경우
// export const authenticated = axios.create({
//   baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
// });

// const TOKEN_KEY: string = "ACCESS_TOKEN";

// /**
//  * @description 웹뷰에서 refresh하여 새로운 accesstoken 발급
//  * */
// function fetchNewAccessToken() {
//   try {
//     // Android 인터페이스 메서드 호출
//     const token: string = window.AndroidBridge.refreshToken();
//     if (token) {
//       // 예: 토큰을 로컬 스토리지에 저장
//       localStorage.setItem(TOKEN_KEY, token);
//       return token;
//     } else {
//       console.error("토큰이 없습니다.");
//     }
//   } catch (error) {
//     console.error("WebView와 통신 중 오류 발생:", error);
//   }
// }

// /**
//  * @description 요청 인터셉터 : 헤더에 access token 추가
//  * */
// authenticated.interceptors.request.use(async (config) => {
//   // let ACCESS_TOKEN: string = localStorage.getItem(TOKEN_KEY) ?? "";
//   let ACCESS_TOKEN =
//     "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3MzczMzUyNzUsImlhdCI6MTczNzE2MjQ3NywiYXV0aF90aW1lIjoxNzM3MTYyNDc1LCJqdGkiOiIwZGUxOWNjMC1lMGU0LTQ4NmEtOTkxZC1jMGVmYzRlYjAzOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGQxNTg5OTctMWFjNi00NjBkLTljNjctM2I5MTBmY2UzM2IwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiI4Y2NlNzM1MC1lNDI0LTQxNDEtODQ1ZC1jNmYwMDZhZjgyNGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwLTU1MTktODYwMyIsInByZWZlcnJlZF91c2VybmFtZSI6InNlamluODYwM0BuYXZlci5jb20iLCJnaXZlbl9uYW1lIjoi7KCV7IS47KeEIiwiZW1haWwiOiJzZWppbjg2MDNAbmF2ZXIuY29tIn0.oAkgOg4_qF3DRYQ7W_69NckmCEc28-VdFJfxy14r6QzZ8HCZ28GhzpI_-UuW45JWu03IbvWQjIUR-a-fX3ZJlLYV7zCR8IKPHVniIDEWfrPPsX3Dp9I-MAuqLxQ7SLu8VaIwDhEKSTs7hCeucUDpNFysST7vZYFVoXWb18OsCEQNIwQsZArbJ47fO8GMYvWj25zDudIcAz1wMkWddam-zg-bEAI_xqSbAq1Q77oYQ3kMSWTGMKx8EtjhGtosaI0NbrL-Hjfcju9z5pI_2z41FSmaMPDjNlXAnYWUuD-lYRMtGST3c66keAH7uRyXMbReLKm_z7d5tMzeq-X4weYCgQ";

//   if (!ACCESS_TOKEN) {
//     try {
//       ACCESS_TOKEN = (await fetchAccessToken()) ?? "";
//     } catch (error) {
//       console.error("토큰 가져오기 실패:", error);
//       // 필요 시 로그인 페이지로 이동
//       // window.location.href = "/login";
//       throw error;
//     }
//   }
//   // const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
//   // const ACCESS_TOKEN =
//   //   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3MzczMzUyNzUsImlhdCI6MTczNzE2MjQ3NywiYXV0aF90aW1lIjoxNzM3MTYyNDc1LCJqdGkiOiIwZGUxOWNjMC1lMGU0LTQ4NmEtOTkxZC1jMGVmYzRlYjAzOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGQxNTg5OTctMWFjNi00NjBkLTljNjctM2I5MTBmY2UzM2IwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiI4Y2NlNzM1MC1lNDI0LTQxNDEtODQ1ZC1jNmYwMDZhZjgyNGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwLTU1MTktODYwMyIsInByZWZlcnJlZF91c2VybmFtZSI6InNlamluODYwM0BuYXZlci5jb20iLCJnaXZlbl9uYW1lIjoi7KCV7IS47KeEIiwiZW1haWwiOiJzZWppbjg2MDNAbmF2ZXIuY29tIn0.oAkgOg4_qF3DRYQ7W_69NckmCEc28-VdFJfxy14r6QzZ8HCZ28GhzpI_-UuW45JWu03IbvWQjIUR-a-fX3ZJlLYV7zCR8IKPHVniIDEWfrPPsX3Dp9I-MAuqLxQ7SLu8VaIwDhEKSTs7hCeucUDpNFysST7vZYFVoXWb18OsCEQNIwQsZArbJ47fO8GMYvWj25zDudIcAz1wMkWddam-zg-bEAI_xqSbAq1Q77oYQ3kMSWTGMKx8EtjhGtosaI0NbrL-Hjfcju9z5pI_2z41FSmaMPDjNlXAnYWUuD-lYRMtGST3c66keAH7uRyXMbReLKm_z7d5tMzeq-X4weYCgQ";

//   if (ACCESS_TOKEN) {
//     config.headers["Authorization"] = `${ACCESS_TOKEN}`;
//   }
//   return config;
// });

// /**
//  * @description 응답 인터셉터
//  * */
// authenticated.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         "API 에러 발생:",
//         error.response?.status,
//         error.response?.data
//       );

//       if (error.response?.status === 401) {
//         // 필요 시 토큰 삭제 및 재로그인 처리
//         localStorage.removeItem(TOKEN_KEY);
//         let newToken: string = "";
//         try {
//           newToken = fetchNewAccessToken() ?? "";
//         } catch (error) {
//           console.error("토큰 가져오기 실패:", error);
//           throw error;
//         }
//         localStorage.setItem(TOKEN_KEY, newToken);
//       }

//       throw error.response?.data || error;
//     } else {
//       console.error("알 수 없는 에러:", error.message);
//       throw error;
//     }

//     throw error;
//   }
// );

import { getCookie, setCookie } from "@/shared/util/cookie";
// import { getCookie } from "@/shared/util/cookie";
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
 * @description 웹뷰에서 accesstoken 가져오는 함수
 * */
function fetchAccessToken() {
  try {
    // Android 인터페이스 메서드 호출
    const token: string = window.AndroidBridge.getAccessToken();
    if (token) {
      // 예: 토큰을 로컬 스토리지에 저장
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
// authenticated.interceptors.request.use(async (config) => {
//   let ACCESS_TOKEN: string = getCookie("ACCESS_TOKEN") ?? "";
//   try {
//     ACCESS_TOKEN = (await fetchAccessToken()) ?? "";
//   } catch (error) {
//     console.error("토큰 가져오기 실패:", error);
//     throw error;
//   }

  // const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
  // const ACCESS_TOKEN =
  //   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3MzcyOTQ2MDMsImlhdCI6MTczNzEyMTgwOCwiYXV0aF90aW1lIjoxNzM3MTIxODAzLCJqdGkiOiI3NTE5ZDg3Ni03Y2Q2LTQ4MzYtOGU1Ni0yNDYyODhjNDVhYzciLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGQxNTg5OTctMWFjNi00NjBkLTljNjctM2I5MTBmY2UzM2IwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiIxZWZmZjYzOC0yMTg1LTQ0NTgtYWNhOC1jNDBhZDc3MTE5MzIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwLTU1MTktODYwMyIsInByZWZlcnJlZF91c2VybmFtZSI6InNlamluODYwM0BuYXZlci5jb20iLCJnaXZlbl9uYW1lIjoi7KCV7IS47KeEIiwiZW1haWwiOiJzZWppbjg2MDNAbmF2ZXIuY29tIn0.p0wvEYUgndFMeEIddbvjh9ZVOwkCXVNuRSLvl6PCyeqT4rnlNs29L-JLaxqYu4LQO7wwsdY8EGCmTM-plotAHi4tug2iAway_Mm3x5n04dAcVIs5rVc57o4t3AVwOkgWjbmPuGk-QkWPaiyoM-NbF3nwAeWc4NOMlNbEHXS5reot0n4Lg9YBP3M2fM0By1mrlx9ybtGaUvqDeaEAph9v4lRw8Y08h5iHVmPdOSg3YoOPkFDPsqATRYMV0GCDVIcJ-HJw64IiEBf17DV7VMUQGbphrVtb8Pe_vllxsiTLGtknUnZMvvjRmXCWNMaL0kZWu9PDbZ-lUJAf3ZjwALmpLg";

authenticated.interceptors.request.use((config) => {
  // const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
  const ACCESS_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3Mzc1MDUyNjEsImlhdCI6MTczNzMzMjQ2OCwiYXV0aF90aW1lIjoxNzM3MzMyNDYxLCJqdGkiOiI5NzE3N2FiMi1lZjMxLTRkMzctOGIxMi1lMmQ0ODMxZWRjZDAiLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmI5M2NhM2MtNzBiNy00N2YxLWFlOTAtYjBmZGRiMWZlZDJmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiJkZjczNmZjZS05MjBlLTQ0ZWQtOTk0NC1jYzhmMjZkYmY5MGYiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwMTIzNDEyMzQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ2cGRybmxzNTY2QGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJLd2FrIGJ5ZSBqZW9uZyIsImVtYWlsIjoidnBkcm5sczU2NkBnbWFpbC5jb20ifQ.poF5OsaFU560ewroHq9x3plF8r2zXp1O-3CPzKBQBlzs2qNxtcYFHS11YxLNAGxhygAshAmOvVgO6-LG3UQLpxLCXkknokPSGPzudp95kDIFZ6xMRTgR4gJ1LPJDavtWParmzFazj-GGDsUmdO4iVtNGhB-HOAhilAj7wrtAqn9eA2_HDP18rdlKcQTZZtofhR44Ak0ZgWdY7W7PUSdBfry1fIQPksGFa2-QAKEueg_EZkEKp6PNTY_zGYzjv7SAsjdVFtc3jXzB3CIuNvbaTxtTBcLlhJOmi0DypXB0Fe4BxUpAHWGzULvkxYFyARJbwRTDpc0btOH2-JAQdfw50Q";


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

    throw error;
  }
);
