import { DesignState } from "@/models/design";
import * as React from "react";
import AutoCompleteSelect from "../common/auto-complete-select";
import { useAppSelector } from "../hooks/reduxHook";
import SingleInput from "./single-input";

export interface ITextInfoProps {
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

const colorsList = [
  "White",
  "Light gray",
  "Gray",
  "Dark gray",
  "Black",
  "Red",
  "Dark red",
  "Brown",
  "Light brown",
  "Crusta",
  "Orange",
  "Yellow",
  "Green",
  "Dark green",
  "Turquoise",
  "Light blue",
  "Dark blue",
  "Light purple",
  "Light purple",
  "Purple",
  "Light pink",
  "Pink",
].map((color) => ({ label: color, value: color }));

const get2Decimal = (num: number): number => {
  return Number(Number(num).toFixed(2));
};
export default function TextInfo(props: ITextInfoProps) {
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
        designInfo.type === "text" && (
          <div
            key={designInfo.key}
            className="mb-6 bg-white border border-dark cursor-pointer"
            onClick={() => {
              if (chooseDesign) chooseDesign(designInfo.key);
            }}
          >
            <div className="border-bottom p-3 d-flex justify-content-between">
              <div className="d-flex">
                <i className="bi bi-fonts h3"></i>

                <div className="ms-4">
                  <p className="h6 m-0">Văn bản á</p>
                  <p className="text-warning m-0">Văn bản</p>
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
            <div className="p-3 border-bottom">
              <table className="w-full p-5 text-gray-700 ">
                <tbody>
                  <tr className="">
                    <td>Text</td>
                  </tr>
                  <tr className="">
                    <td className=" pe-4">
                      <SingleInput
                        type="text"
                        handleChange={handleChangeText}
                        defaultVal="hello!!"
                      />
                    </td>
                  </tr>
                  <tr className="">
                    <td>Font</td>
                  </tr>
                  <tr>
                    <td className=" pe-4">
                      <div className="input-group">
                        <AutoCompleteSelect
                          handleChange={handleChangeFont}
                          list={fontsList}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td>Color</td>
                  </tr>
                  <tr>
                    <td className=" pe-4">
                      <div className="input-group">
                        <AutoCompleteSelect
                          handleChange={handleChangeColor}
                          list={colorsList}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3">
              <table className="w-full p-5 text-gray-700">
                <tbody>
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
                    <td className=" pe-4">
                      <SingleInput
                        type="number"
                        handleChange={handleChangeRotate}
                        unit="deg"
                        defaultVal={get2Decimal(designInfo.rotate) + ""}
                      />
                    </td>
                    <td className=" pe-4">
                      <SingleInput
                        type="number"
                        handleChange={handleChangeScale}
                        unit="%"
                        defaultVal={get2Decimal(designInfo.scale) + ""}
                      />
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
                    <td className=" pe-4">Positioning</td>
                    <td className=" pe-4">
                      <SingleInput
                        type="number"
                        handleChange={handleChangeLeft}
                        unit="in"
                        defaultVal={get2Decimal(designInfo.left) + ""}
                      />
                    </td>
                    <td className=" pe-4">
                      <SingleInput
                        type="number"
                        handleChange={handleChangeTop}
                        unit="in"
                        defaultVal={get2Decimal(designInfo.top) + ""}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="pt-4">Algin</td>
                    <td className=" pe-4 pt-4">
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
                    <td className=" pe-4 pt-4">
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
}
