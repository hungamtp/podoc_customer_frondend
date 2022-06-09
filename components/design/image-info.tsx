import { DesignState } from "@/models/design";
import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";

export interface IImageInfoProps {
  addNewRect: (imgSrc: string) => void;
  deleteImage: (key: string, isLast: boolean) => void;
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
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const choosenKey = infoManageData.choosenKey;
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
  console.log("rerenderrr");
  const handleChangeText = (data: string) => {
    console.log(data, "handle change text");
  };
  const handleChangeFont = (data: any) => {
    console.log(data.target.innerText, "submit data");
  };
  const handleChangeColor = (data: any) => {
    console.log(data.target.innerText, "submit data");
  };
  const handleChangeRotate = (data: any) => {
    console.log(data, "handle change text");
  };
  const handleChangeScale = (data: any) => {
    setDesignLocation(choosenKey, { pos: "scale", value: Number(data) });
  };
  const handleChangeLeft = (data: any) => {
    console.log(data.target.innerText, "submit data");
  };
  const handleChangeTop = (data: any) => {
    console.log(data.target.innerText, "submit data");
  };
  return (
    <div>
      {designInfo.key === infoManageData.choosenKey &&
        designInfo.type?.includes("image") && (
          <div
            key={designInfo.key}
            className="mb-6 bg-white border border-dark cursor-pointer"
            onClick={() => {
              if (chooseDesign) chooseDesign(designInfo.key);
            }}
          >
            <div className="border-bottom p-3 d-flex justify-content-between">
              <div className="d-flex">
                <img src={designInfo.src} width="50px" height="50px"></img>

                <div className="ms-4">
                  <p className="h6 m-0">Tên hình</p>
                  <p className="text-warning m-0">Độ phân giải</p>
                </div>
              </div>
              <div>
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
                    const isLast = infoManageData.designInfos.length === 1;
                    deleteImage(designInfo.key, isLast);
                  }}
                >
                  <i className="bi bi-file-earmark-x h4 "></i>
                </button>
              </div>
            </div>
            <div className="p-3">
              <table className="w-full p-5 text-gray-700">
                <tbody>
                  <tr className="">
                    <td></td>
                    <td>Width</td>
                    <td>Height</td>
                  </tr>
                  <tr className="">
                    <td className="w-quater">Size</td>
                    <td className="w-30p pe-4">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          aria-label="Inches (with dot and two decimal places)"
                          value={get2Decimal(designInfo.width)}
                        />
                        <span className="input-group-text">in</span>
                      </div>
                    </td>
                    <td className="w-30p pe-4">
                      <div className="input-group ">
                        <input
                          type="number"
                          className="form-control"
                          aria-label="Inches (with dot and two decimal places)"
                          value={get2Decimal(designInfo.height)}
                        />
                        <span className="input-group-text">in</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td></td>
                    <td>
                      <div className="mt-3">Rotate</div>
                    </td>
                    <td>
                      <div className="mt-3">Scale</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Transform</td>
                    <td className="w-30p pe-4">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          aria-label="Inches (with dot and two decimal places)"
                          value={get2Decimal(designInfo.rotate)}
                        />
                        <span className="input-group-text">deg</span>
                      </div>
                    </td>
                    <td className="w-30p pe-4">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          aria-label="Inches (with dot and two decimal places)"
                          value={get2Decimal(designInfo.scale)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td></td>
                    <td>
                      <div className="mt-3">Left</div>
                    </td>
                    <td>
                      {" "}
                      <div className="mt-3">Top</div>
                    </td>
                  </tr>
                  <tr>
                    <td>Positioning</td>
                    <td className="w-30p pe-4">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          aria-label="Inches (with dot and two decimal places)"
                          value={get2Decimal(designInfo.left)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </td>
                    <td className="w-30p pe-4">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          aria-label="Inches (with dot and two decimal places)"
                          value={get2Decimal(designInfo.top)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="pt-4">Algin</td>
                    <td className="w-30p pe-4 pt-4">
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
                    </td>
                    <td className="w-30p pe-4 pt-4">
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      {designInfo.key !== infoManageData.choosenKey && (
        <div>
          <div
            className="d-flex border p-3 my-4 justify-content-between cursor-pointer"
            onClick={() => {
              if (chooseDesign) chooseDesign(designInfo.key);
            }}
          >
            <div className="d-flex">
              <img src={designInfo.src} width="50px" height="50px"></img>

              <div className="ms-4">
                <p className="h6 m-0">Tên hình</p>
                <p className="text-warning m-0">Độ phân giải</p>
              </div>
            </div>
            <div>
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
                  const isLast = infoManageData.designInfos.length === 1;
                  deleteImage(designInfo.key, isLast);
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
