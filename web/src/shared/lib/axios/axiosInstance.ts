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
  // const ACCESS_TOKEN = getCookie("ACCESS_TOKEN");
  const ACCESS_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3Mzc1MDUyNjEsImlhdCI6MTczNzMzMjQ2OCwiYXV0aF90aW1lIjoxNzM3MzMyNDYxLCJqdGkiOiI5NzE3N2FiMi1lZjMxLTRkMzctOGIxMi1lMmQ0ODMxZWRjZDAiLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmI5M2NhM2MtNzBiNy00N2YxLWFlOTAtYjBmZGRiMWZlZDJmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiJkZjczNmZjZS05MjBlLTQ0ZWQtOTk0NC1jYzhmMjZkYmY5MGYiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwMTIzNDEyMzQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ2cGRybmxzNTY2QGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJLd2FrIGJ5ZSBqZW9uZyIsImVtYWlsIjoidnBkcm5sczU2NkBnbWFpbC5jb20ifQ.poF5OsaFU560ewroHq9x3plF8r2zXp1O-3CPzKBQBlzs2qNxtcYFHS11YxLNAGxhygAshAmOvVgO6-LG3UQLpxLCXkknokPSGPzudp95kDIFZ6xMRTgR4gJ1LPJDavtWParmzFazj-GGDsUmdO4iVtNGhB-HOAhilAj7wrtAqn9eA2_HDP18rdlKcQTZZtofhR44Ak0ZgWdY7W7PUSdBfry1fIQPksGFa2-QAKEueg_EZkEKp6PNTY_zGYzjv7SAsjdVFtc3jXzB3CIuNvbaTxtTBcLlhJOmi0DypXB0Fe4BxUpAHWGzULvkxYFyARJbwRTDpc0btOH2-JAQdfw50Q";

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
      throw error.response?.data || error;
    } else {
      console.error("알 수 없는 에러:", error.message);
    }

    throw error;
  }
);
