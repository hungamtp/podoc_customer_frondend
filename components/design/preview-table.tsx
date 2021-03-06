import { Preview } from "@/redux/slices/previews";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/reduxHook";

export interface info {
  angle: number;
}

export interface IPreviewTableProps {
  colors: {
    id: string;
    name: string;
    image: string;
  }[];
  renderColor: string;
  setRenderColor: (color: string) => void;
  setRenderedPosition: (position: string) => void;
  setIsDrawPreview: (isDraw: boolean) => void;
}

export default function PreviewTable(props: IPreviewTableProps) {
  const {
    colors,
    renderColor,
    setRenderColor,
    setRenderedPosition,
    setIsDrawPreview,
  } = props;

  const previews = useAppSelector((state) => state.previews);
  let renderedPreviews: Preview[] = [];
  previews.forEach((preview) => {
    if (preview.color === renderColor) {
      renderedPreviews.push(preview);
    }
  });
  if (renderedPreviews.length === 0 && previews.length !== 0)
    renderedPreviews = [previews[0], previews[1]];

  return (
    <div>
      <div className="d-flex">
        {renderedPreviews[1] ? (
          renderedPreviews.map((preview) => (
            <div
              className=""
              key={nanoid()}
              onClick={() => {
                setRenderedPosition(preview.position);
                setIsDrawPreview(false);
              }}
            >
              <img
                src={preview.imageSrc}
                alt="preview"
                width="200rem"
                height="120rem"
              />
              <p className="text-center">{preview.position}</p>
            </div>
          ))
        ) : (
          <div className="" key={nanoid()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{
                marginLeft: "8rem",
                background: "none",
                display: "block",
                shapeRendering: "auto",
              }}
              width="10rem"
              height="10rem"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                fill="#b3c430"
                stroke="none"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="1s"
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  values="0 50 51;360 50 51"
                />
              </path>
            </svg>
          </div>
        )}
      </div>

      <div className="p-2">
        <label className="h4">M??u ??o</label>
        {colors?.map((color) => (
          <div
            key={color.id}
            className={`cursor-pointer p-2 pt-3 d-flex set-hover ${
              color.image === renderColor && "highligh-bg"
            }`}
            style={{ border: "none" }}
            onClick={() => {
              setRenderColor(color.image);
            }}
          >
            <img
              key={color.id}
              width={25}
              height={25}
              className="rounded-circle border"
              src={"https://images.printify.com/5853fec7ce46f30f8328200a"}
              style={{ backgroundColor: color.image, opacity: "0.8" }}
              alt={color.image}
            />
            <p className="ms-3">{color.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
