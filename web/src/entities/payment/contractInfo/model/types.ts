export interface CustomerInfo {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface CarInfo {
  carId: number;
  modelName: string;
  year: string;
  mileage: number;
  price: number;
}

export interface PaymentInfo {
  carPrice: number;
}

export interface ContractInfoData {
  customer: CustomerInfo;
  car: CarInfo;
  paymentInfo: PaymentInfo;
}
