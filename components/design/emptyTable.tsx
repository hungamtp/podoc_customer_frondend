import Image from "next/image";
import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { UploadImage } from "./upload-image";

export interface info {
  angle: number;
}

export interface IEmptyTableProps {
  addRect: (imgElement: string) => void;
}

export default function EmptyTable(props: IEmptyTableProps) {
  const infoManageData = useAppSelector((state) => state.infoManageData);
  console.log(infoManageData, "ìnoooo");
  const initVal = {
    images: [],
  };
  // const exportToJson = () => {
  // 	infoManageData.designInfos.reduce((pre, cur) => {});
  // };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="w-half d-flex flex-column justify-content-center">
          <img
            src="https://printify.com/assets/gen_images/add-layer.svg"
            alt="Picture of the author"
          />
          <p className="h4 text-center">No artwork is added</p>
          <p className="text-center">Only JPG / PNG files supported</p>
          <button type="button" className="btn btn-success">
            Add your design
          </button>
        </div>
      </div>
      <div className="mt-5 bg-gray p-3">
        <span className="h6">Thông tin yêu cầu</span>
        <ul>
          <li>Hỗ trợ JPG và PNG</li>
          <li>JPG and PNG file types supported</li>
          <li>Kích cỡ file tối đa 50MB</li>
          <li>Vùng in 2362 × 2894 px (300 DPI)</li>
          <li>Độ phân giải tối đa 23000 x 23000 px</li>
        </ul>
      </div>
    </>
  );
}
