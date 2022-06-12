import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useLoading, Audio } from "@agney/react-loading";
import { setControlData } from "@/redux/slices/designControl";

export interface IDesignHeaderLeftProps {
  closePreview: () => void;
  openPreview: () => void;
}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  const { closePreview, openPreview } = props;
  const choosenKey = useAppSelector((state) => state.choosenKey);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });
  const getpreview = (setPreview: () => void) => {
    setPreview();
  };
  const designControl = useAppSelector((state) => state.designControl);
  const controlData = designControl.controlData;
  const dispatch = useAppDispatch();

  return (
    <div className="row h-10">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column">
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

      <div className=" col-lg-3 d-md-none d-lg-block border-start px-0">
        {controlData.isSetImage ? (
          <div className="d-flex justify-content-around border-bottom border-dark px-0 py-2point5">
            <p className="h5 pt-3 me-5">Thông tin chi tiết</p>
            <div
              className="btn h3 m-0 "
              onClick={() => {
                const tmpControlData = {
                  ...controlData,
                  isSetImage: false,
                  isChooseImage: false,
                };
                dispatch(setControlData(tmpControlData));
              }}
            >
              x
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-around border-bottom  border-dark  py-3point5 px-0">
            <p className="h5 pt-2">Thêm thiết kế</p>
            <button className="m-0 pt-2 btn btn-link text-success text-decoration-underline">
              Giá và thông số thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
