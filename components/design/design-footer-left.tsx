import { Blueprint } from "@/models/blueprint";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setBlueprint } from "@/redux/slices/designControl";
export interface IDesignHeaderLeftProps {
  blueprintList: Blueprint[];
}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  const { blueprintList } = props;

  const designControlData = useAppSelector((state) => state.designControl);
  const controlData = designControlData.controlData;
  const positionArr = blueprintList.map((blueprint) => (
    <button
      className="btn btn-light w-half"
      key={blueprint.position}
      onClick={() => {
        dispatch(
          setBlueprint({
            renderedBlueprint: {
              ...controlData.renderedBlueprint,
              position: blueprint.position,
            },
          })
        );
      }}
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
