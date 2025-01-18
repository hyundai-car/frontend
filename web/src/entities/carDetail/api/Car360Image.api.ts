import { authenticated } from "@/shared/lib/axios/axiosInstance";

export const getCar360ImagesApi = async (carNo: number) => {
    const response = await authenticated.get(`/cars/${carNo}/360images`);
    const imageUrls: string[] = response.data.contents.map((item: { imageUrl: string; }) => item.imageUrl);
    return imageUrls;
};
