import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { UploadImage } from "./upload-image";
import { UploadImageTable } from "./upload-image-table";
import {
  setValue,
  addDesignInfo,
  deleteDesignInfo,
} from "@/redux/slices/design";
import { useForm } from "react-hook-form";
export interface ITableProps {
  addRect: (imgElement: string) => void;
  deleteImage: (key: string) => void;
  chooseDesign: (key: string) => void;
  cloneDesign: (key: string) => void;
  align: (position: string) => void;
  placeHolder?: fabric.Rect;
  setDesignLocation: (
    designKey: string,
    pos: {
      key: "top" | "left" | "width" | "height" | "scale" | "rotate";
      value: number;
    }
  ) => void;
}

const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};

export default function Table(props: ITableProps) {
  const infoManageData = useAppSelector((state) => state.infoManageData);
  let designPosInitVal: {
    width: number;
    height: number;
    top: number;
    left: number;
    scale: number;
    rotate: number;
  } = { width: 0, height: 0, top: 0, left: 0, scale: 0, rotate: 0 };
  infoManageData.designInfos.forEach((design) => {
    if (design.key === infoManageData.choosenKey)
      designPosInitVal = { ...design };
  });
  const { handleSubmit, register } = useForm({
    defaultValues: {
      ...designPosInitVal,
    },
  });
  const [designPos, setDesignPos] = React.useState<{
    width: number;
    height: number;
    top: number;
    left: number;
    scale: number;
  }>(designPosInitVal);
  const dispatch = useAppDispatch();

  const initVal = {
    images: [],
  };
  // const exportToJson = () => {
  // 	infoManageData.designInfos.reduce((pre, cur) => {});
  // };
  if (infoManageData.choosenKey === "") return <></>;
  const {
    addRect,
    deleteImage,
    chooseDesign,
    cloneDesign,
    align,
    placeHolder,
    setDesignLocation,
  } = props;
  return (
    <div>
      <div className="">
        {infoManageData.designInfos.map((designInfo) => (
          <>
            {designInfo.key === infoManageData.choosenKey && (
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
                        deleteImage(designInfo.key);
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
                              {...register("width")}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setDesignLocation(designInfo.key, {
                                    key: "width",
                                    value: designPos.width,
                                  });
                                }, 200);
                                setDesignPos({
                                  ...designPos,
                                  width: Number(e.target.value),
                                });
                              }}
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
                              {...register("height")}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setDesignLocation(designInfo.key, {
                                    key: "height",
                                    value: Number(e.target.value),
                                  });
                                }, 200);
                              }}
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
                              {...register("rotate")}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setDesignLocation(designInfo.key, {
                                    key: "rotate",
                                    value: Number(e.target.value),
                                  });
                                }, 200);
                              }}
                            />
                            <span className="input-group-text">deg</span>
                          </div>
                        </td>
                        <td className="w-30p pe-4">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              aria-label="Inches (with dot and two decimal places)"
                              value={get2Decimal(designInfo.scale)}
                              {...register("scale")}
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
                              type="text"
                              className="form-control"
                              aria-label="Inches (with dot and two decimal places)"
                              {...register("left")}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setDesignLocation(designInfo.key, {
                                    key: "left",
                                    value: Number(e.target.value),
                                  });
                                }, 200);
                              }}
                            />
                            <span className="input-group-text">%</span>
                          </div>
                        </td>
                        <td className="w-30p pe-4">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              aria-label="Inches (with dot and two decimal places)"
                              {...register("top")}
                              onChange={(e) => {
                                setTimeout(() => {
                                  setDesignLocation(designInfo.key, {
                                    key: "top",
                                    value: Number(e.target.value),
                                  });
                                }, 200);
                              }}
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
                        deleteImage(designInfo.key);
                      }}
                    >
                      <i className="bi bi-file-earmark-x h4 "></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
        <div>
          <p className="">
            <UploadImageTable addRect={addRect} />
          </p>
          {/* <button onClick={} className="py-2">
						Save
					</button> */}
        </div>
      </div>
    </div>
  );
}
