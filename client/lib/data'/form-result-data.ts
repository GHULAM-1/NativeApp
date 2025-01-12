import { CareerOption } from "../types/form-result-type";

export const careerOptions: CareerOption[] = [
  {
    id: "1",
    title: "Medicine",
    icon: "medkit-outline",
    note: "Less than 60% is not eligible for any medical field as per HEC criteria.",
  },
  {
    id: "2",
    title: "Architect",
    icon: "construct-outline",
    note: "Less than 50% is not eligible for any BS degree as per HEC criteria. Math is mandatory for BS architecture.",
  },
  {
    id: "3",
    title: "Engineer",
    icon: "build-outline",
    note: "Math and Physics are mandatory for BS engineering programs.",
  },
];
