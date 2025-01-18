import { BasicButton } from "@/shared/ui/button";
import { useNavigate, useParams } from "react-router-dom";

export function TestPage() {
  const navigate = useNavigate();
  const { carId } = useParams();

  return (
    <>
      <div>Test Page</div>
      <BasicButton
        onClick={() => {
          navigate(`/payments/${carId}/balance/process`);
        }}
      >
        잔금결제이동
      </BasicButton>
    </>
  );
}
