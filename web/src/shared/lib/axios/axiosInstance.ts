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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2UmlCVjRXMUhCekFWX25uVFZ5QkNiWDdXQ0VLcndrWjI1SU5SRVljU2NRIn0.eyJleHAiOjE3MzczMzUyNzUsImlhdCI6MTczNzE2MjQ3NywiYXV0aF90aW1lIjoxNzM3MTYyNDc1LCJqdGkiOiIwZGUxOWNjMC1lMGU0LTQ4NmEtOTkxZC1jMGVmYzRlYjAzOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXljYXJmMHIubWUvcmVhbG1zL015Q2FyRm9yTWUiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGQxNTg5OTctMWFjNi00NjBkLTljNjctM2I5MTBmY2UzM2IwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibXljYXJmb3JtZS1jbGllbnQiLCJzaWQiOiI4Y2NlNzM1MC1lNDI0LTQxNDEtODQ1ZC1jNmYwMDZhZjgyNGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJtZW1iZXIiLCJkZWZhdWx0LXJvbGVzLW15Y2FyZm9ybWUiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfbnVtYmVyIjoiMDEwLTU1MTktODYwMyIsInByZWZlcnJlZF91c2VybmFtZSI6InNlamluODYwM0BuYXZlci5jb20iLCJnaXZlbl9uYW1lIjoi7KCV7IS47KeEIiwiZW1haWwiOiJzZWppbjg2MDNAbmF2ZXIuY29tIn0.oAkgOg4_qF3DRYQ7W_69NckmCEc28-VdFJfxy14r6QzZ8HCZ28GhzpI_-UuW45JWu03IbvWQjIUR-a-fX3ZJlLYV7zCR8IKPHVniIDEWfrPPsX3Dp9I-MAuqLxQ7SLu8VaIwDhEKSTs7hCeucUDpNFysST7vZYFVoXWb18OsCEQNIwQsZArbJ47fO8GMYvWj25zDudIcAz1wMkWddam-zg-bEAI_xqSbAq1Q77oYQ3kMSWTGMKx8EtjhGtosaI0NbrL-Hjfcju9z5pI_2z41FSmaMPDjNlXAnYWUuD-lYRMtGST3c66keAH7uRyXMbReLKm_z7d5tMzeq-X4weYCgQ";

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
