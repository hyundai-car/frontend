import { BasicButton } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export const DiagnosticButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <BasicButton
        color="navy"
        onClick={() => navigate("simple-search")}
        disabled={false}
      >
        차알못을 위한 간편 진단
      </BasicButton>
      <div style={{ height: 15 }} />
    </>
  );
};
