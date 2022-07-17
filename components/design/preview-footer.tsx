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
  const positionList = [
    { position: "Trước", value: "front" },
    { position: "Sau", value: "back" },
  ];
  const positionArr = positionList.map((posData) => (
    <button
      className={`btn  w-half ${
        posData.value === renderedPosition && "btn-success"
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
