import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <h1>ErrorFallback</h1>
      <h2>문제가 발생했습니다</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>재시도</button>
    </div>
  );
};
