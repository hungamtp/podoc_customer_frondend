import { DesignState } from "@/models/design/designInfo";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { setValue, updateDesignInfos } from "@/redux/slices/design";
import { setControlData } from "@/redux/slices/designControl";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import CreateDesignedProductForm from "./designed-product-info";
import EditDesignForm from "./edit-design";
export interface IDesignFooterLeftProps {}

export default function DesignFooterLeft(props: IDesignFooterLeftProps) {
  const blueprintData = useAppSelector((state) => state.blueprintsData);
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const save = () => {};

  const changePos = (position: string) => {
    if (blueprintData.position === position) return;
    console.log("change poss");
    let pos = -1;
    let isEmpty = false;
    let tmpDesignInfos: DesignState[] = [
      {
        key: "",
        name: "",
        types: "image/jpeg",
        height: 0,
        width: 0,
        leftPosition: 0,
        rotate: 0,
        scales: 0,
        topPosition: 0,
        src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
        tmpSrc: "",
      },
    ];
    const tmpBlueprints = [...blueprintData.blueprints];
    tmpBlueprints.forEach((blueprint, index) => {
      if (blueprint.position === blueprintData.position) {
        pos = index; //Lấy blurprint hiện tại
      }
      if (blueprint.position === position) {
        console.log(blueprint.designInfos, "infoo");
        //lấy design info để load lên
        if (blueprint.designInfos && blueprint.designInfos.length > 0) {
          tmpDesignInfos = blueprint.designInfos;
        }
        if (tmpDesignInfos[0].key === "") isEmpty = true;
      }
    });
    if (pos !== -1) {
      {
        tmpBlueprints[pos] = {
          ...tmpBlueprints[pos],
          designInfos: infoManageData.designInfos,
        };
      }
    }

    dispatch(
      updateBlueprint({ position: position, blueprints: tmpBlueprints })
    );
    //Lưu design list hiện tại vào trong blueprint

    dispatch(
      updateDesignInfos({
        isEmpty: isEmpty,
        designInfos: tmpDesignInfos,
      })
    );
    //hiển thị design của trang đang muốn load lên

    if (isEmpty) {
      dispatch(
        setControlData({
          isSetImage: false,
          isChooseImage: false,
          isEmpty: true,
        })
      );
    } else {
      dispatch(
        setControlData({
          isSetImage: false,
          isChooseImage: true,
          isEmpty: false,
        })
      );
    }
  };
  const positionList = [
    { position: "Trước", value: "front" },
    { position: "Sau", value: "back" },
  ];
  const positionArr = positionList.map((posData) => (
    <button
      className={`btn  w-half ${
        posData.value === blueprintData.position && "btn-success"
      }`}
      key={posData.value}
      onClick={() => changePos(posData.value)}
    >
      {posData.position}
    </button>
  ));
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="col-lg-9 col-12 px-0 d-flex flex-column">
        <div className="d-flex justify-content-center  border-top  py-4">
          <div className="d-flex w-quater align-items-center px-4 btn-group group">
            {positionArr}
          </div>
        </div>
      </div>
    </>
  );
}
