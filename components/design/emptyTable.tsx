import Image from "next/image";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { UploadImage } from "./upload-image";
import { useLoading, Audio } from "@agney/react-loading";
import { setControlData } from "@/redux/slices/designControl";
import { DesignState } from "@/models/design";

export interface info {
  angle: number;
}

export interface IEmptyTableProps {
  addNewRect: (imageSrc: string) => void;
}

export default function EmptyTable(props: IEmptyTableProps) {
  const { addNewRect } = props;
  const designControlData = useAppSelector((state) => state.designControl);
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const controlData = designControlData.controlData;
  const dispatch = useAppDispatch();

  console.log(controlData, "ìnoooo");
  const initVal = {
    images: [],
  };
  // const exportToJson = () => {
  // 	infoManageData.designInfos.reduce((pre, cur) => {});
  // };
  return (
    <>
      {controlData.isChooseImage || infoManageData.choosenKey !== "" ? (
        <>
          <div className="d-flex justify-content-start border-bottom  btn-group ">
            <button className="p-2 btn btn-outline-success borderless">
              Thiết kế mới
            </button>
            <button className="p-2 btn btn-outline-success">Từ thư viện</button>
          </div>
          <p className="fw-bolder py-2">Thêm từ</p>
          <ul className="list-group">
            <UploadImage addNewRect={addNewRect} />
            <li className="list-group-item px-4 py-3 mb-2 border h6 btn btn-light d-flex justify-content-start align-items-center">
              <i className="bi bi-fonts me-4 h4 pt-1"></i>Văn bản
            </li>
            <li className="list-group-item px-4 py-3 mb-2 border h6 btn btn-light d-flex justify-content-start align-items-center">
              <i className="bi bi-google me-4 h4 pt-1"></i>Google Drive
            </li>
          </ul>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <div className="w-half d-flex flex-column justify-content-center">
              <img
                src="https://printify.com/assets/gen_images/add-layer.svg"
                alt="Picture of the author"
              />
              <p className="h5 text-center pt-4">Chưa có thiết kế nào</p>
              <p className="text-center">Chỉ hỗ trợ file PNG hoặc JPG</p>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  dispatch(
                    setControlData({ isSetImage: true, isChooseImage: true })
                  );
                }}
              >
                Thêm thiết kế
              </button>
            </div>
          </div>
        </>
      )}
      <div className="mt-5 bg-gray p-3">
        <span className="h6">Thông tin in ấn</span>
        <ul>
          <li>Hỗ trợ JPG và PNG</li>
          <li>Kích cỡ file tối đa 50MB</li>
          <li>Vùng in 2362 × 2894 px (300 DPI)</li>
          <li>Độ phân giải tối đa 23000 x 23000 px</li>
        </ul>
      </div>
    </>
  );
}
