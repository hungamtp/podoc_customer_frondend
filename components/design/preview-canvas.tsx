import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { Blueprint, DesignState } from "@/models/design";
import { addPreview, clearAllPreview } from "@/redux/slices/previews";
import { fabric } from "fabric";
import * as React from "react";
import PreviewTable from "./preview-table";
export interface IPreviewCanvasProps {}
const hightRate = 1.2337;
const placeHolderAndOuterRate = 1.5;
const DPI = 300;

const resizer = (
  canvasSize: { width: number; height: number },
  imageSize: { width: number; height: number }
) => {
  const imageAspectRatio = imageSize.width / imageSize.height;
  let canvasAspectRatio = canvasSize.width / canvasSize.height;
  let renderableHeight, renderableWidth, xStart, yStart;

  // If image's aspect ratio is less than canvasSize's we fit on height
  // and place the image centrally along width
  if (imageAspectRatio < canvasAspectRatio) {
    renderableHeight = canvasSize.height;
    renderableWidth = imageSize.width * (renderableHeight / imageSize.height);
    xStart = (canvasSize.width - renderableWidth) / 2;
    yStart = 0;
  }

  // If image's aspect ratio is greater than canvas's we fit on width
  // and place the image centrally along height
  else if (imageAspectRatio > canvasAspectRatio) {
    renderableWidth = canvasSize.width;
    renderableHeight = imageSize.height * (renderableWidth / imageSize.width);
    xStart = 0;
    yStart = (canvasSize.height - renderableHeight) / 2;
  }

  // Happy path - keep aspect ratio
  else {
    renderableHeight = canvasSize.height;
    renderableWidth = canvasSize.width;
    xStart = 0;
    yStart = 0;
  }
  return {
    x: xStart,
    y: yStart,
    width: renderableWidth,
    height: renderableHeight,
  };
};

const initCanvas = (
  defaultWidth: number,
  defaultHeight: number,
  id: string
): fabric.Canvas => {
  const tmpCanvas = new fabric.Canvas(id, {
    height: defaultHeight,
    width: defaultWidth,
  });
  return tmpCanvas;
};
const initPlaceHolder = (
  placeHolderWidth: number,
  placeHolderHeight: number,
  containerHeight: number,
  containerWidth: number
): fabric.Rect => {
  const aspectRatio = placeHolderHeight / placeHolderWidth;
  const newHeight = containerHeight / 2.5;
  const newWidth = newHeight / aspectRatio;
  const left = (containerWidth - newWidth) / 2;
  const top = (containerHeight - newHeight) / 2;

  const rect = new fabric.Rect({
    width: newWidth,
    name: "placeHolder",
    height: newHeight,
    left: left,
    top: top,
    absolutePositioned: true,
    selectable: false,
    opacity: 0.000001,
  });

  return rect;
};

export default function PreviewCanvas(props: IPreviewCanvasProps) {
  const pageHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const defaultWidth =
    screen.width >= 922 ? (screen.width / 12) * 9 : screen.width;
  const blueprintsData = useAppSelector((state) => state.blueprintsData);

  const [renderCount, setRenderCount] = React.useState(0);

  const blueprint = blueprintsData.blueprints[renderCount];
  const placeholderWidth = blueprint.placeHolder.width * 30;
  const placeholderHeight = blueprint.placeHolder.height * 30;
  const dispatch = useAppDispatch();

  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [placeHolder, setPlaceHolder] = React.useState<fabric.Rect>(
    initPlaceHolder(
      placeholderWidth,
      placeholderHeight,
      pageHeight / placeHolderAndOuterRate,
      defaultWidth
    )
  );

  const setBackgroundFromDataUrl = (
    dataUrl: string,
    outerSize: { outerWidth: number; outerHeight: number }
  ) => {
    if (!dataUrl && !outerSize) {
      return true;
    }
    const { outerWidth, outerHeight } = outerSize;

    if (canvas) {
      fabric.Image.fromURL(
        dataUrl,
        (image: fabric.Image) => {
          canvas.setWidth(outerWidth);
          canvas.setHeight(outerHeight);

          canvas.renderAll();
          const sizeObj = resizer(
            { width: outerWidth, height: outerHeight },
            { width: image.width || 100, height: image.height || 150 }
          );
          image.scaleToHeight(sizeObj.height);
          image.set("top", sizeObj.y);
          image.set({ left: sizeObj.x });
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
          // canvas.clipPath = image;
        },
        { crossOrigin: "anonymous" }
      );
    }
  };
  React.useEffect(() => {
    setCanvas(initCanvas(defaultWidth, pageHeight / hightRate, "preview"));
    dispatch(clearAllPreview());
  }, []);

  React.useEffect(() => {
    if (canvas) {
      reverseDesigns(blueprint);
      canvas.clear();
    }
    const rerenderLoop = setInterval(() => {
      if (canvas && imgSrc === "") {
        const canvasObjs = canvas._objects || [];
        if (blueprint.designInfos) {
          if (
            canvasObjs.length == (blueprint.designInfos.length || 0) &&
            canvasObjs.some((design) => {
              if (blueprint.designInfos)
                return design.name === blueprint.designInfos[0].key;
            })
          ) {
            clearInterval(rerenderLoop);
            setImgSrc(canvas.toDataURL());
          }
        } else {
          setImgSrc(canvas.toDataURL());
          clearInterval(rerenderLoop);
        }
      } else clearInterval(rerenderLoop);
    }, 1000);

    return () => {
      clearInterval(rerenderLoop);
    };
  }, [renderCount, canvas]);

  React.useEffect(() => {
    if (canvas && imgSrc !== "") {
      console.log(imgSrc, "hinh nhee");
      dispatch(
        addPreview({
          position: blueprint.position,
          imageSrc: imgSrc,
        })
      );
      if (renderCount < blueprintsData.blueprints.length - 1) {
        setRenderCount((count) => count + 1);
      }
      setImgSrc("");
    }
  }, [imgSrc]);

  const reverseDesigns = (blueprint: Blueprint) => {
    if (canvas && placeHolder) {
      const outerSize = {
        outerWidth: defaultWidth,
        outerHeight: pageHeight - pageHeight / 5.3,
      };

      const blueprintImageUrl = blueprint.frameImage;
      setBackgroundFromDataUrl(blueprintImageUrl, outerSize);

      const designInfos = blueprint.designInfos;
      if (designInfos) {
        designInfos.forEach((design) => {
          addRect(design);
        });
        canvas.requestRenderAll();
      }
    }
  };

  const reverseData = (key: string, value: number) => {
    let data = 0;
    if (placeHolder) {
      if (key === "top")
        data =
          (value / 100) * placeHolder.getScaledHeight() +
          (placeHolder.top || 0);
      if (key === "left")
        data =
          (value / 100) * placeHolder.getScaledWidth() +
          (placeHolder.left || 0);
      if (key === "width")
        data =
          (value / (blueprint.placeHolder.width / DPI)) *
          placeHolder.getScaledWidth();
      if (key === "height")
        data =
          (value / (blueprint.placeHolder.height / DPI)) *
          placeHolder.getScaledHeight();
      if (key === "scale") data = placeHolder.getScaledWidth() * value;
      return data;
    }
  };
  const addRect = (design: DesignState) => {
    if (canvas && placeHolder) {
      fabric.Image.fromURL(design.src, (image: fabric.Image) => {
        const imageLeft = reverseData("left", design.left);
        const imageTop = reverseData("top", design.top);
        const imageWidth = reverseData("width", design.width);

        image.set("name", design.key);
        image.set("left", imageLeft);
        image.set("top", imageTop);
        image.set("angle", design.rotate);
        image.set("opacity", 100);
        image.set("noScaleCache", true);
        image.scaleToWidth(imageWidth || 150);
        image.set("selectable", false);

        canvas.add(image);

        canvas.renderAll();
      });
    }
  };

  const calculatePoint = (
    left: number,
    top: number,
    width: number,
    height: number
  ) => {
    if (placeHolder) {
      const newLeft =
        ((left - (placeHolder.left || 0)) / placeHolder.getScaledWidth()) * 100;
      const newTop =
        ((top - (placeHolder.top || 0)) / placeHolder.getScaledHeight()) * 100;
      const newWidth =
        (width / placeHolder.getScaledWidth()) *
        (blueprint.placeHolder.width / DPI);
      const newHeight =
        (height / placeHolder.getScaledHeight()) *
        (blueprint.placeHolder.height / DPI);
      const scale = width / placeHolder.getScaledWidth();
      return {
        left: newLeft,
        top: newTop,
        width: newWidth,
        height: newHeight,
        scale: scale,
      };
    }
  };

  return (
    <div className="row h-81">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
        <div className="outer position-relative">
          <canvas id="preview" className="center-block"></canvas>
        </div>
      </div>

      <div className="col-lg-3 d-md-none d-lg-block border-start px-0 overflow-y-scroll h-full">
        <div className=" d-flex flex-column">
          <div className="p-3 ">
            <PreviewTable />
          </div>
        </div>
      </div>
    </div>
  );
}
