import { DesignState } from "./designInfo";

export interface Blueprint {
  frameImage: string;
  position: string;
  placeHolder: {
    width: number;
    height: number;
  };
  designInfos?: DesignState[];
}
