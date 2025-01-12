import { ErrorFallback } from "@/shared/ui/fallback/ErrorFallback";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  children: React.ReactNode;
};

const handleError = (error: Error, info: ErrorInfo) => {
  console.log("에러 발생:", error);
  console.log("컴포넌트 스택:", info.componentStack);
};

export const ErrorBoundaryProvider = ({ children }: Props) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={ErrorFallback}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};
