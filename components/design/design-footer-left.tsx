import { DesignState } from "@/models/design/designInfo";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { updateDesignInfos } from "@/redux/slices/design";
import { setControlData } from "@/redux/slices/designControl";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
export interface IDesignFooterLeftProps {}

export default function DesignFooterLeft(props: IDesignFooterLeftProps) {
  const blueprintData = useAppSelector((state) => state.blueprintsData);
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const controlData = useAppSelector((state) => state.designControl);

  const changePos = (position: string) => {
    if (blueprintData.position === position) return;
    let pos = -1;
    let isEmpty = false;
    let tmpDesignInfos: DesignState[] = [];
    const tmpBlueprints = [...blueprintData.blueprints];
    tmpBlueprints.forEach((blueprint, index) => {
      if (blueprint.position === blueprintData.position) {
        pos = index; //Lấy blurprint hiện tại
      }
      if (blueprint.position === position) {
        //lấy design info để load lên
        if (blueprint.designInfos && blueprint.designInfos.length > 0) {
          tmpDesignInfos = blueprint.designInfos;
        }
        if (tmpDesignInfos.length === 0) isEmpty = true;
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
      disabled={controlData.controlData.isLoadingImage}
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
