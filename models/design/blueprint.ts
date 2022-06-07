import { DesignState } from "./designInfo";

export interface Blueprint {
  frame_image: string;
  position: string;
  placeHolder: {
    width: number;
    height: number;
  };
  designInfos?: DesignState[];
}
