export interface DesignState {
  key: string;
  name?: string;
  type: "image/png" | "image/jpg" | "image/jpeg" | "text";
  height: number;
  width: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  left: number;
  top: number;
  src: string;
}
