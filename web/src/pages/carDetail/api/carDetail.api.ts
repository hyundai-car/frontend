import { MOCK_CarDetail } from "@/pages/carDetail/model/mock";

export const getCarDetailApi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_CarDetail;
};
