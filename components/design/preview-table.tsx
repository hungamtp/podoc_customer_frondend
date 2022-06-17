import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface info {
  angle: number;
}

const colors = ["white", "black", "red", "yellow"];
export interface IPreviewTableProps {
  renderColor: string;
  setRenderColor: (color: string) => void;
  setRenderedPosition: (position: string) => void;
  setIsDrawPreview: (isDraw: boolean) => void;
}

export default function PreviewTable(props: IPreviewTableProps) {
  const { renderColor, setRenderColor, setRenderedPosition, setIsDrawPreview } =
    props;
  const designControlData = useAppSelector((state) => state.designControl);
  const previews = useAppSelector((state) => state.previews);

  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="d-flex">
        {previews.map((preview) => (
          <div
            className=""
            key={nanoid()}
            onClick={() => {
              setRenderedPosition(preview.position);
              setIsDrawPreview(false);
            }}
          >
            <img
              src={preview.imageSrc}
              alt="preview"
              width={220}
              height={120}
            />
            <p className="text-center">{preview.position}</p>
          </div>
        ))}
      </div>

      <div className="p-2">
        <label className="h4">Màu áo</label>
        {colors.map((color) => (
          <div
            key={color}
            className={`cursor-pointer p-2 pt-3 d-flex set-hover ${
              color === renderColor && "highligh-bg"
            }`}
            style={{ border: "none" }}
            onClick={() => {
              setRenderColor(color);
            }}
          >
            <img
              key={color}
              width={25}
              height={25}
              className="rounded-circle border"
              src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
              style={{ backgroundColor: color, opacity: "0.8" }}
              alt={color}
            />
            <p className="ms-3">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
