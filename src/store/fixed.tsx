import { atom } from "recoil";

interface FixedContentProps {
  children: {
    src: string;
    currentTime?: number;
    type: "video" | "image";
  };
  from: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  to: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const fixedContentState = atom<undefined | FixedContentProps>({
  key: "fixed",
  default: undefined,
});
