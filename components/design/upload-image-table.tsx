import { setControlData } from "@/redux/slices/designControl";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface UploadImageTableProps {}

export function UploadImageTable(props: UploadImageTableProps) {
  const designControlData = useAppSelector((state) => state.designControl);
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className="add-design-button d-flex"
        onClick={() =>
          dispatch(
            setControlData({
              ...designControlData,
              isChooseImage: true,
              isSetImage: true,
            })
          )
        }
      >
        <i className="bi bi-plus h3 m-1"></i>
        <div className="px-4">
          <p className="h6 mb-0 text-start">Thêm thiết kế</p>
          <p className="mb-0">Kích thước vùng in 4500x5100 px (300DPI)</p>
        </div>
      </div>
    </>
  );
}
