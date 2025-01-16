import {
  ContractOrderInfo,
  ContractPaymentInfo,
  ContractVehicleInfo,
} from "@/entities/payment";
import { DebugWrapper } from "@/widgets/DebugToggle";

export function ContractInfo() {
  return (
    <DebugWrapper layerName="widgets/payment/contractInfo">
      <DebugWrapper layerName="entities/payment/contractInfo">
        <ContractOrderInfo />
        <ContractVehicleInfo />
        <ContractPaymentInfo />
      </DebugWrapper>
    </DebugWrapper>
  );
}
