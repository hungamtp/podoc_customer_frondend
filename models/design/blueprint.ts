import { DesignState } from "./designInfo";

export interface Blueprint {
  frameImage: string;
  tmpFrameImage: string;
  position: string;
  placeholder: {
    width: number;
    height: number;
    top: number;
    widthRate: number;
    heightRate: number;
  };
  designInfos?: DesignState[];
}
