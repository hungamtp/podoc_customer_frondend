import { DesignState } from "@/models/design";
import Image from "next/image";
import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import SingleInputMemo from "./single-input";

export interface IImageInfoProps {
  addNewRect: (imgSrc: string, tmpSrc: string) => void;
  deleteImage: (key: string) => void;
  chooseDesign: (key: string) => void;
  cloneDesign: (key: string) => void;
  align: (position: string) => void;
  placeHolder?: fabric.Rect;
  setDesignLocation: (
    designKey: string,
    posInfo: {
      pos: "top" | "left" | "scale" | "angle" | "width" | "height";
      value: number;
    }
  ) => void;
  designInfo: DesignState;
}
const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};

const ImageInfo = (props: IImageInfoProps) => {
  const choosenKey = useAppSelector((state) => state.choosenKey);

  let designPosInitVal: {
    top: number;
    left: number;
    scale: number;
    rotate: number;
  } = { top: 0, left: 0, scale: 0, rotate: 0 };
  const {
    addNewRect,
    deleteImage,
    chooseDesign,
    cloneDesign,
    align,
    placeHolder,
    setDesignLocation,
    designInfo,
  } = props;
  const handleChangeWidth = (data: string) => {};
  const handleChangeHeight = (data: any) => {};

  const handleChangeRotate = (data: any) => {};
  const handleChangeScale = (data: any) => {
    setDesignLocation(choosenKey, { pos: "scale", value: Number(data) });
  };
  const handleChangeLeft = (data: any) => {};
  const handleChangeTop = (data: any) => {};

  if (!designInfo) return <></>;
  return (
    <div>
      {designInfo.key === choosenKey && (
        <div
          key={designInfo.key}
          className="mb-6 bg-white border  cursor-pointer mt-4"
          onClick={() => {
            if (chooseDesign) chooseDesign(designInfo.key);
          }}
        >
          <div className="border-bottom p-3 d-flex justify-content-between ">
            <div className="w-25">
              <Image
                src={designInfo.src}
                className="img-fluid "
                width={50}
                height={50}
                objectFit="cover"
                alt="productImage"
              />
            </div>

            <div className="w-75">
              <p
                className="h6 m-0 text-truncate ps-3 "
                style={{ maxWidth: 200 }}
              >
                {designInfo.name}
              </p>
              {(designInfo.DPI || 300) > 300 &&
                ((designInfo?.DPI || 300) * designInfo.height) / 2.54 <
                  15000 && (
                  <small className="text-success m-0 te ps-3">
                    Mật độ điểm in cao ({get2Decimal(designInfo?.DPI || 100)})
                  </small>
                )}
              {(designInfo.DPI || 200) < 300 &&
                (designInfo.DPI || 200) > 200 && (
                  <small className="text-warning m-0 te ps-3 ">
                    Mật độ điểm in vừa ({get2Decimal(designInfo.DPI || 0)})
                  </small>
                )}
              {(designInfo.DPI || 100) < 200 && (
                <small className="text-danger m-0 te ps-3">
                  Mật độ điểm in thấp ({get2Decimal(designInfo.DPI || 0)})
                </small>
              )}
              {((designInfo?.DPI || 300) * designInfo.height) / 2.54 >=
                15000 && (
                <small className="text-danger m-0 te ps-3">
                  Độ phân giải quá cao (
                  {get2Decimal(
                    ((designInfo?.DPI || 300) * designInfo.height) / 2.54
                  )}
                  )
                </small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-link text-dark px-2"
                onClick={() => {
                  cloneDesign(designInfo.key);
                }}
              >
                <i className="bi bi-file-earmark h4 "></i>
              </button>
              <button
                className="btn btn-link text-dark px-2 "
                onClick={() => {
                  deleteImage(designInfo.key);
                }}
              >
                <i className="bi bi-file-earmark-x h4 "></i>
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="row">
              <div className="d-flex w-100">
                <div className="w-50 me-4">Chiều rộng</div>
                <div className="w-50">Chiều dài</div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex w-100">
                <div className="w-50 me-4">
                  <div className="d-flex ">
                    <SingleInputMemo
                      type="number"
                      handleChange={handleChangeWidth}
                      defaultVal={get2Decimal(designInfo.width) + ""}
                    />
                    <span className="custom-input-tag">cm</span>
                  </div>
                </div>
                <div className="w-50">
                  <div className="d-flex ">
                    <SingleInputMemo
                      type="number"
                      handleChange={handleChangeHeight}
                      defaultVal={get2Decimal(designInfo.height) + ""}
                    />
                    <span className="custom-input-tag">cm</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="d-flex w-100">
                <div className="w-50 me-4">Độ xoay</div>
                <div className="w-50">Tỉ lệ</div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex w-100">
                <div className="w-50 me-4">
                  <div className="d-flex ">
                    <SingleInputMemo
                      type="number"
                      handleChange={handleChangeRotate}
                      defaultVal={get2Decimal(designInfo.rotate) + ""}
                    />
                    <span className="custom-input-tag">độ</span>
                  </div>
                </div>
                <div className="w-50">
                  {" "}
                  <div className="d-flex ">
                    <SingleInputMemo
                      type="number"
                      handleChange={handleChangeScale}
                      defaultVal={get2Decimal(designInfo.scales) + ""}
                    />
                    <span className="custom-input-tag">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="d-flex w-100">
                <div className="w-50 me-4">Cách trái</div>
                <div className="w-50">Cách trên</div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex w-100">
                <div className="w-50 me-4">
                  <div className="d-flex ">
                    <SingleInputMemo
                      type="number"
                      handleChange={handleChangeLeft}
                      defaultVal={get2Decimal(designInfo.leftPosition) + ""}
                    />
                    <span className="custom-input-tag">%</span>
                  </div>
                </div>
                <div className="w-50">
                  <div className="d-flex ">
                    <SingleInputMemo
                      type="number"
                      handleChange={handleChangeTop}
                      defaultVal={get2Decimal(designInfo.topPosition) + ""}
                    />
                    <span className="custom-input-tag">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="d-flex w-100">
                <div className="me-4">
                  <div
                    className="btn-group btn-group-sm "
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        align("left");
                      }}
                    >
                      <i className="bi bi-align-start"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        align("center");
                      }}
                    >
                      <i className="bi bi-align-center"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        align("right");
                      }}
                    >
                      <i className="bi bi-align-end"></i>
                    </button>
                  </div>
                </div>
                <div className="">
                  <div
                    className="btn-group btn-group-sm"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        align("top");
                      }}
                    >
                      <i className="bi bi-align-top"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        align("middle");
                      }}
                    >
                      <i className="bi bi-align-middle"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        align("bottom");
                      }}
                    >
                      <i className="bi bi-align-bottom"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {designInfo.key !== choosenKey && (
        <div>
          <div
            className="d-flex border p-3 justify-content-between cursor-pointer mt-4"
            onClick={() => {
              if (chooseDesign) chooseDesign(designInfo.key);
            }}
          >
            <div className="w-25">
              <Image
                src={designInfo.src}
                className="img-fluid "
                width={50}
                height={50}
                objectFit="cover"
                alt="productImage"
              />
            </div>

            <div className="w-75 ">
              <p
                className="h6 m-0 text-truncate ps-3 mt-1"
                style={{ maxWidth: 200 }}
              >
                {designInfo.name}
              </p>
              {(designInfo.DPI || 300) >= 300 && (
                <small className="text-success m-0 te ps-3">
                  Mật độ điểm in cao ({get2Decimal(designInfo.DPI || 0)})
                </small>
              )}
              {(designInfo.DPI || 101) < 300 &&
                (designInfo.DPI || 101) > 100 && (
                  <small className="text-warning m-0 te ps-3 ">
                    Mật độ điểm in vừa ({get2Decimal(designInfo.DPI || 0)})
                  </small>
                )}
              {(designInfo.DPI || 100) <= 100 && (
                <small className="text-danger m-0 te ps-3">
                  Mật độ điểm in thấp ({get2Decimal(designInfo.DPI || 0)})
                </small>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-link text-dark px-2"
                onClick={() => {
                  cloneDesign(designInfo.key);
                }}
              >
                <i className="bi bi-file-earmark h4 "></i>
              </button>
              <button
                className="btn btn-link text-dark px-2 "
                onClick={() => {
                  deleteImage(designInfo.key);
                }}
              >
                <i className="bi bi-file-earmark-x h4 "></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const ImageInfoMemo = React.memo(ImageInfo);

export default ImageInfoMemo;
