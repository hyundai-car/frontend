// export interface
export interface LikeItem {
  carId: number;
  carName: string;
  initialRegistration: string;
  mileage: number;
  sellingPrice: number;
  mainImage: string;
  createdAt: string;
  updatedAt: string;
}
export interface LikeListResponse {
  contents: LikeItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}
