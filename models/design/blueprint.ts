import { DesignState } from "./designInfo";

export interface Blueprint {
  frameImage: string;
  tmpFrameImage: string;
  position: string;
  placeholder: {
    width: number;
    height: number;
  };
  designInfos?: DesignState[];
}
