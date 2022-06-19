import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import ImageInfo from "./image-info";
import SelectColor from "./select-color";
import TextInfo from "./text-info";
import { UploadImageTable } from "./upload-image-table";
export interface ITableProps {
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
  changeFont?: (key: string, fontName: string) => void;
  changeTextColor?: (key: string, color: string) => void;
  changeText?: (key: string, text: string) => void;
}

export default function Table(props: ITableProps) {
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const choosenKey = useAppSelector((state) => state.choosenKey);
  const designInfos = infoManageData.designInfos;

  const { addNewRect, deleteImage } = props;
  const tmpDeleteImage = (key: string) => {
    const isLast = infoManageData.designInfos.length === 1;
    deleteImage(key, isLast);
  };
  const imageInfoProps = { ...props };
  delete imageInfoProps.changeFont;
  delete imageInfoProps.changeTextColor;
  delete imageInfoProps.changeText;
  //note here

  return (
    <div>
      <div className="">
        {designInfos.map((designInfo) => (
          <>
            {/* start image section */}
            {designInfo.types.includes("image") && (
              <ImageInfo
                {...imageInfoProps}
                deleteImage={tmpDeleteImage}
                designInfo={designInfo}
              />
            )}
            {/* start text section */}
            {designInfo.types === "text" && (
              <TextInfo
                {...props}
                designInfo={designInfo}
                deleteImage={tmpDeleteImage}
              />
            )}
          </>
        ))}
        <div>
          <p className="">
            <UploadImageTable addNewRect={addNewRect} />
          </p>
          {/* <button onClick={} className="py-2">
						Save
					</button> */}
        </div>
      </div>
    </div>
  );
}
