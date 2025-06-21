import { atom } from "recoil";
export type Item = {
  name: string;
  type: string;
  description: string;
  cover: string;
  images: string[];
};

export const itemsState = atom<Item[]>({
  key: "itemsState",
  default: [],
});
