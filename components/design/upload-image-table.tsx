import { setControlData } from "@/redux/slices/designControl";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface UploadImageTableProps {}

export function UploadImageTable(props: UploadImageTableProps) {
  const designControlData = useAppSelector((state) => state.designControl);
  const blueprintData = useAppSelector((state) => state.blueprintsData);
  let renderBlueprint = blueprintData.blueprints[0];
  blueprintData.blueprints.forEach((blueprint) => {
    if (blueprint.position === blueprintData.position) {
      renderBlueprint = blueprint;
    }
  });
  const placeHolder = renderBlueprint.placeholder;
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className="add-design-button d-flex"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Hình ảnh nên đạt độ phân giải này"
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
        <i className="bi bi-plus h3 m-1 mt-3"></i>
        <div className="px-4">
          <p className="h6 mb-0 text-start">Thêm thiết kế</p>
          <p className="mb-0">
            Kích thước vùng in{" "}
            <u>
              {((placeHolder.width * 300) / 2.54).toFixed(0)}×
              {((placeHolder.height * 300) / 2.54).toFixed(0)} px
            </u>{" "}
            (300DPI)
          </p>
        </div>
      </div>
    </>
  );
}
