import { DesignState } from "@/models/design";
import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import AutoCompleteSelect from "./auto-complete-select";
import ColorPicker from "./color-picker";
import SingleInputMemo from "./single-input";
import SingleInput from "./single-input";

export interface ITextInfoProps {
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
  changeFont?: (key: string, fontName: string) => void;
  changeTextColor?: (key: string, color: string) => void;
  changeText?: (key: string, text: string) => void;
}

const fontsList = [
  "Roboto",
  "Acme",
  "Black Ops One",
  "Boogaloo",
  "Caveat Brush",
  "Cinzel",
  "Coiny",
  "Dancing Script",
  "Fjalla One",
  "Graduate",
  "Josefin Slab",
  "Lobster",
  "Mali",
  "Pacifico",
  "Permanent Marker",
  "Princess Sofia",
  "Shadows Into Light",
  "Special Elite",
].map((font) => ({ label: font, value: font }));

const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};
const TextInfo = (props: ITextInfoProps) => {
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
    changeFont,
    changeText,
    changeTextColor,
  } = props;
  const handleChangeText = (data: string) => {
    if (changeText) changeText(choosenKey, data);
  };
  const handleChangeFont = (fontName: any) => {
    if (changeFont) changeFont(choosenKey, fontName);
  };
  const handleChangeColor = (color: any) => {
    if (changeTextColor) changeTextColor(choosenKey, color);
  };
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
            <div className="w-25 py-2">
              <i className="bi bi-fonts h2"></i>
            </div>

            <div className="w-75 mt-2">
              <p
                className="h6 m-0 text-truncate ps-3 "
                style={{ maxWidth: 200 }}
              >
                {designInfo.src}
              </p>
              <small className="text-secondary m-0 te ps-3">Văn bản</small>
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

          <div className="p-3 border-bottom">
            <table className="w-full p-5 text-gray-700 ">
              <tbody>
                <tr className="">
                  <td>
                    <p className="mt-2 mb-0">Nội dung</p>
                  </td>
                </tr>
                <tr className="">
                  <td className="">
                    <SingleInput
                      type="text"
                      handleChange={handleChangeText}
                      defaultVal={designInfo.src}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td>
                    <p className="mt-3 mb-0">Phông chữ</p>
                  </td>
                </tr>
                <tr>
                  <td className="w-full">
                    <AutoCompleteSelect
                      handleChange={handleChangeFont}
                      list={fontsList}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td>
                    <p className="mt-3 mb-0">Màu</p>
                  </td>
                </tr>
                <tr>
                  <td className="w-full">
                    <ColorPicker handleChange={handleChangeColor} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3">
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
            className="d-flex border p-3 my-4 justify-content-between cursor-pointer mt-4"
            onClick={() => {
              if (chooseDesign) chooseDesign(designInfo.key);
            }}
          >
            <div className="w-25 py-2">
              <i className="bi bi-fonts h2"></i>
            </div>

            <div className="w-75 mt-2">
              <p
                className="h6 m-0 text-truncate ps-3 "
                style={{ maxWidth: 200 }}
              >
                {designInfo.src}
              </p>
              <small className="text-secondary m-0 te ps-3">Văn bản</small>
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

const TextInfoMemo = React.memo(TextInfo);
export default TextInfoMemo;
