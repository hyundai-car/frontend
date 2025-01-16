import {
  ContractOrderInfo,
  ContractPaymentInfo,
  ContractVehicleInfo,
} from "@/entities/payments";
import { DebugWrapper } from "@/widgets/DebugToggle";
import { PaymentHeader } from "../../header/ui/Header";
import { PaymentButton } from "@/features/payments/ui/PaymentButton/PaymentButton";
import { useNavigate, useParams } from "react-router-dom";
export function ContractInfoWidget() {
  const navigate = useNavigate();
  const { carId } = useParams();

  const handleClick = () => {
    navigate(`/payments/${carId}/deposit/process`);
  };

  return (
    <DebugWrapper layerName="widgets/payments/contractInfo">
      <PaymentHeader text="계약" />
      <ContractOrderInfo />
      <ContractVehicleInfo />
      <ContractPaymentInfo />
      <PaymentButton text="계약금 결제하기" onClick={handleClick} />
    </DebugWrapper>
  );
}
