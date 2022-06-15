import { DesignState } from "@/models/design";
import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";
import ImageInfo from "./image-info";
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
  // const [designInfos, setDesignInfos] = React.useState([
  //   ...infoManageData.designInfos,
  // ]);

  // React.useEffect(() => {
  //   let pos = -1;
  //   let updatedDesignInfo: DesignState = {
  //     key: "",
  //     name: "",
  //     types: "image/jpeg",
  //     height: 0,
  //     width: 0,
  //     left: 0,
  //     x: 0,
  //     y: 0,
  //     rotate: 0,
  //     scale: 0,
  //     top: 0,
  //     src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
  //   };

  //   designInfos.forEach((design, index) => {
  //     if (design.key === choosenKey) {
  //       pos = index;
  //       infoManageData.designInfos.forEach((designInfo) => {
  //         if (choosenKey === designInfo.key) {
  //           updatedDesignInfo = designInfo;
  //         }
  //       });
  //     }
  //   });
  //   if (pos !== -1) designInfos[pos] = updatedDesignInfo;
  // }, [infoManageData]);

  const { addNewRect, deleteImage } = props;
  const tmpDeleteImage = React.useCallback((key: string) => {
    const isLast = infoManageData.designInfos.length === 1;
    deleteImage(key, isLast);
  }, []);
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
