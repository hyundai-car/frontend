// import { BasicInfo, CarData } from "@/shared/model/car.types";

// export const FormatBasicInfo = (data: CarData) => {
//   //   const bastInfo = {data.cars.mmScore, data,}
//   //   필요한 key
//   const requiredKeys: (keyof BasicInfo)[] = [
//     "mmScore",
//     "accidentCount",
//     "initialRegistrationDate",
//     "fuelEfficiency",
//     "mileage",
//     "carNumber",
//     "exteriorColor",
//     "fuelType",
//     "seating",
//   ];

//   const basicData = requiredKeys.reduce<Partial<BasicInfo>>((acc, key) => {
//     if (key in data.cars) {
//       acc[key] = data.cars[key];
//     }
//     return acc;
//   }, {});
// };
