import { useLoading, Audio } from "@agney/react-loading";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { setControlData } from "@/redux/slices/designControl";
export interface IDesignHeaderRightProps {}

export default function DesignHeaderRight(props: IDesignHeaderRightProps) {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const designControl = useAppSelector((state) => state.designControl);
  const controlData = designControl.controlData;
  console.log(controlData, "control data");
  const dispatch = useAppDispatch();
  return (
    <div>
      {controlData.isSetImage ? (
        <div className="d-flex justify-content-around border-bottom border-dark px-0 py-2point5">
          <p className="h5 pt-3 me-5">Thông tin chi tiết</p>
          <div
            className="btn h3 m-0 "
            onClick={() => {
              const tmpControlData =
                infoManageData.choosenKey === ""
                  ? { isSetImage: false, isChooseImage: false }
                  : { ...controlData, isSetImage: false };
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
  );
}
