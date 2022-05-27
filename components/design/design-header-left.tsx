import * as React from "react";
import { useAppSelector } from "../hooks/reduxHook";

export interface IDesignHeaderLeftProps {
  closePreview: () => void;
  openPreview: () => void;
}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  const { closePreview, openPreview } = props;
  const infoManageData = useAppSelector((state) => state.infoManageData);

  return (
    <div>
      <div className="d-flex justify-content-between border-bottom border-dark py-0 px-0">
        <div className="d-flex">
          <p className="h6 px-4 m-auto">{`<--`} Trở về trang sản phẩm</p>
          <div className="d-flex flex-column justify-content-center">
            <p className="h5 pt-2">Áo thun name</p>
            <p className="text-secondary">Cung cấp bởi nhà in H2PD</p>
          </div>
        </div>
        <div className="d-flex justify-content-center w-quater align-items-center px-4 btn-group">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              defaultChecked
              onClick={() => {
                closePreview();
              }}
            />
            <label className="btn btn-outline-success" htmlFor="btnradio1">
              Thiết kế
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              onClick={() => {
                openPreview();
              }}
            />
            <label className="btn btn-outline-success" htmlFor="btnradio2">
              Bản thử
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
