import { setControlData } from "@/redux/slices/designControl";
import { nanoid } from "@reduxjs/toolkit";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { UploadImage } from "./upload-image";

export interface info {
  angle: number;
}

export interface IPreviewTableProps {}

export default function PreviewTable(props: IPreviewTableProps) {
  const designControlData = useAppSelector((state) => state.designControl);
  const previews = useAppSelector((state) => state.previews);
  const controlData = designControlData.controlData;
  const dispatch = useAppDispatch();

  const initVal = {
    images: [],
  };
  console.log(previews, "previewwss");
  // const exportToJson = () => {
  // 	infoManageData.designInfos.reduce((pre, cur) => {});
  // };

  return (
    <div>
      <div className="d-flex">
        {previews.map((preview) => (
          <div className="" key={nanoid()}>
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
    </div>
  );
}
