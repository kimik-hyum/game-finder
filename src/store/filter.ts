import { atom } from "recoil";

export const showFilterState = atom({
  key: "filter",
  default: false,
});
