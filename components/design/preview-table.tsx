import { setControlData } from "@/redux/slices/designControl";
import { Preview } from "@/redux/slices/previews";
import { Card, CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { nanoid } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect } from "react";
import LoadingPrompt from "../common/loadingPrompt";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface info {
  angle: number;
}

export interface IPreviewTableProps {
  colors: {
    id: string;
    name: string;
    image: string;
  }[];
  renderColor: string;
  setRenderColor: (color: string) => void;
  setRenderedPosition: (position: string) => void;
  setIsDrawPreview: (isDraw: boolean) => void;
}

export default function PreviewTable(props: IPreviewTableProps) {
  const {
    colors,
    renderColor,
    setRenderColor,
    setRenderedPosition,
    setIsDrawPreview,
  } = props;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const dispatch = useAppDispatch();
  const designControl = useAppSelector((state) => state.designControl);
  const controlData = designControl.controlData;
  const previews = useAppSelector((state) => state.previews);
  let renderedPreviews: Preview[] = [];
  previews.forEach((preview) => {
    if (preview.color === renderColor) {
      renderedPreviews.push(preview);
    }
  });

  let front = renderedPreviews[0];
  renderedPreviews.forEach((preview) => {
    if (preview.position === "front") {
      front = preview;
    }
  });

  let back = renderedPreviews[0];
  renderedPreviews.forEach((preview) => {
    if (preview.position === "back") {
      back = preview;
    }
  });

  renderedPreviews = [front, back];

  return (
    <div>
      <div className="loadingPreviewImage">
        {renderedPreviews[1] ? (
          <div className="d-flex">
            {renderedPreviews.map((preview) => (
              <div
                className=""
                key={nanoid()}
                onClick={() => {
                  setRenderedPosition(preview.position);
                  setIsDrawPreview(false);
                }}
              >
                <Image
                  src={preview.imageSrc}
                  className="img-fluid"
                  width={1000}
                  height={1000}
                  objectFit="cover"
                  alt="productImage"
                />
                <p className="text-center">
                  {preview.position === "front" ? "Trước" : "Sau"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="d-flex justify-content-center loadingPreviewImage"
            key={nanoid()}
          >
            <svg
              className={` 
                normalSpinner`}
              viewBox="0 0 50 50"
            >
              <circle
                className="path"
                cx={25}
                cy={25}
                r={20}
                fill="none"
                strokeWidth={5}
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-2">
        <label className="h4">Màu áo</label>
        {colors?.map((color) => (
          <div
            key={color.id}
            className={`cursor-pointer p-2 pt-3 d-flex set-hover ${
              color.image === renderColor && "highligh-bg"
            }`}
            style={{ border: "none" }}
            onClick={() => {
              if (renderColor !== color.image) {
                setRenderColor(color.image);
                // const tmpControlData = {
                //   ...controlData,
                //   isLoadingImage: true,
                // };
                // dispatch(setControlData(tmpControlData));
              }
            }}
          >
            <Image
              key={color.id}
              width={40}
              height={30}
              className="rounded-circle border"
              src={"/asset/images/image_default/color-base.png"}
              style={{ backgroundColor: color.image, opacity: "0.8" }}
              alt={color.image}
            />
            <p className="ms-3">{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
