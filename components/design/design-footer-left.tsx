import { Blueprint } from "@/models/design/blueprint";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { updateBlueprint, setPosition } from "@/redux/slices/blueprints";
import { DesignState } from "@/models/design/designInfo";
export interface IDesignHeaderLeftProps {}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  const blueprintData = useAppSelector((state) => state.blueprintsData);
  const infoManageData = useAppSelector((state) => state.infoManageData);

  const changePos = (position: string) => {
    const newBlueprintData: DesignState[] = infoManageData.designInfos;
    console.log(newBlueprintData, "newBlueprintData");
    dispatch(
      updateBlueprint({
        position: blueprintData.position,
        designInfos: newBlueprintData,
      })
    );
    dispatch(setPosition(position));
  };
  const positionArr = blueprintData.blueprints.map((blueprint) => (
    <button
      className="btn btn-light w-half"
      key={blueprint.position}
      onClick={() => changePos(blueprint.position)}
    >
      {blueprint.position}
    </button>
  ));
  const dispatch = useAppDispatch();
  return (
    <div className="row h-10">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column">
        <div className="d-flex justify-content-between border-top border-dark  py-4">
          <div className="d-flex justify-content-start w-quater align-items-center px-4">
            {positionArr}
          </div>
        </div>
      </div>
      <div className="col-lg-3 d-md-none d-lg-block border-start px-0">
        <div className="d-flex justify-content-center border-top border-dark  py-4">
          <div className="d-flex  w-full align-items-center px-4">
            <button className="btn btn-secondary w-full">Lưu lại</button>
          </div>
        </div>
      </div>
    </div>
  );
}
