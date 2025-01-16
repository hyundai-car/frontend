import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <h1>페이지를 찾을 수 없습니다</h1>
      <button onClick={() => navigate(-1)}>이전 페이지로</button>
    </div>
  );
};
