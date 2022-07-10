import { DesignState } from "@/models/design/designInfo";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { updateDesignInfos } from "@/redux/slices/design";
import { setControlData } from "@/redux/slices/designControl";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
export interface IPreviewFooterProps {
  setRenderedPosition: (position: string) => void;
  renderedPosition: string;
}

export default function PreviewFooter({
  setRenderedPosition,
  renderedPosition,
}: IPreviewFooterProps) {
  const blueprintData = useAppSelector((state) => state.blueprintsData);

  const changePos = (position: string) => {
    setRenderedPosition(position);
  };
  const positionArr = blueprintData.blueprints.map((blueprint) => (
    <button
      className={`btn  w-half ${
        blueprint.position === renderedPosition && "btn-success"
      }`}
      key={blueprint.position}
      onClick={() => changePos(blueprint.position)}
    >
      {blueprint.position}
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
