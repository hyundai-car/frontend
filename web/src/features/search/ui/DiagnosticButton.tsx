import { BasicButton } from "@/shared/ui/button";

export const DiagnosticButton = () => {
  const handleDiagnostic = () => {
    console.log("clicked");
    // 진단 로직, 경로에 simple-search 경로 추가
  };

  return (
    <BasicButton color="navy" onClick={handleDiagnostic} disabled={false}>
      차알못을 위한 간편 진단
    </BasicButton>
  );
};
