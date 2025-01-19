export interface ImgList {
  detailImageId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface CarDetailImgResponse {
  contents: ImgList[];
}
