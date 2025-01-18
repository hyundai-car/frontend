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
 * @description 요청 인터셉터 : 헤더에 access token 추가
 * */
authenticated.interceptors.request.use((config) => {
  const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
  // const ACCESS_TOKEN =
  //   "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3MzcyOTQ2MDMsImlhdCI6MTczNzEyMTgwOCwiYXV0aF90aW1lIjoxNzM3MTIxODAzLCJqdGkiOiI3NTE5ZDg3Ni03Y2Q2LTQ4MzYtOGU1Ni0yNDYyODhjNDVhYzciLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGQxNTg5OTctMWFjNi00NjBkLTljNjctM2I5MTBmY2UzM2IwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiIxZWZmZjYzOC0yMTg1LTQ0NTgtYWNhOC1jNDBhZDc3MTE5MzIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwLTU1MTktODYwMyIsInByZWZlcnJlZF91c2VybmFtZSI6InNlamluODYwM0BuYXZlci5jb20iLCJnaXZlbl9uYW1lIjoi7KCV7IS47KeEIiwiZW1haWwiOiJzZWppbjg2MDNAbmF2ZXIuY29tIn0.p0wvEYUgndFMeEIddbvjh9ZVOwkCXVNuRSLvl6PCyeqT4rnlNs29L-JLaxqYu4LQO7wwsdY8EGCmTM-plotAHi4tug2iAway_Mm3x5n04dAcVIs5rVc57o4t3AVwOkgWjbmPuGk-QkWPaiyoM-NbF3nwAeWc4NOMlNbEHXS5reot0n4Lg9YBP3M2fM0By1mrlx9ybtGaUvqDeaEAph9v4lRw8Y08h5iHVmPdOSg3YoOPkFDPsqATRYMV0GCDVIcJ-HJw64IiEBf17DV7VMUQGbphrVtb8Pe_vllxsiTLGtknUnZMvvjRmXCWNMaL0kZWu9PDbZ-lUJAf3ZjwALmpLg";

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
      console.error(
        "API 에러 발생:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("알 수 없는 에러:", error.message);
    }
  }
);
