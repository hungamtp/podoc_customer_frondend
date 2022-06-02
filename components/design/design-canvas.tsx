import EmptyTable from "@/components/design/emptyTable";
import Table from "@/components/design/table";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import {
  addDesignInfo,
  cloneDesignInfo,
  deleteDesignInfo,
  setValue,
} from "@/redux/slices/design";
import { setControlData } from "@/redux/slices/designControl";
import { fabric } from "fabric";
import $ from "jquery";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as React from "react";
import { Blueprint } from "@/models/blueprint";
export interface IDesignCanvasProps {}
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
    height: newHeight,
    left: left,
    top: top,
    absolutePositioned: true,
    selectable: false,
    strokeDashArray: [5, 5],
    stroke: "white",
    strokeWidth: 2,
  });
  return rect;
};

const exportJSON = (canvas: fabric.Canvas) => {
  return canvas.toJSON();
};

const importJSON = (canvas: fabric.Canvas, json: string) => {
  canvas.loadFromJSON(json, (obj: fabric.Object) => {
    canvas.renderAll();
  });
};

export default function DesignCanvas(props: IDesignCanvasProps) {
  const body = document.body,
    html = document.documentElement;
  const pageHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const defaultWidth =
    screen.width >= 922 ? (screen.width / 12) * 9 : screen.width;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const designControlData = useAppSelector((state) => state.designControl);
  const controlData = designControlData.controlData;
  const blueprint = controlData.renderedBlueprint;
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [placeHolder, setPlaceHolder] = React.useState<fabric.Rect>();
  const [JSONdata, setJSONdata] = React.useState<string>();
  const [aspectRatio, setAspectRatio] = React.useState<number>(1);
  React.useEffect(() => {
    setCanvas(initCanvas(defaultWidth, pageHeight / hightRate, "canvas"));
    setPlaceHolder(
      initPlaceHolder(
        236.2,
        289.4,
        pageHeight / placeHolderAndOuterRate,
        defaultWidth
      )
    );
    setAspectRatio(236.2 / 289.4);
  }, []);

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

  const reverseDate = (key: string, value: number) => {
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
      if (key === "scale")
        data =
          (value / (blueprint.placeHolder.height / DPI)) *
          placeHolder.getScaledHeight();
      return data;
    }
  };

  const setDesignLocation = (
    designKey: string,
    pos: {
      key: "top" | "left" | "width" | "height" | "scale" | "rotate";
      value: number;
    }
  ) => {
    if (canvas) {
      const object = _.find(canvas._objects, function (o) {
        return o.name === designKey;
      });
      if (object && canvas) {
        console.log(pos.key, pos.value);
        if (pos.key === "height") {
          const newWidth = pos.value * aspectRatio;
          object.set(pos.key, reverseDate(pos.key, pos.value));
          object.set("width", reverseDate("width", newWidth));
        } else if (pos.key === "width") {
          const newHeight = pos.value / aspectRatio;
          object.set(pos.key, reverseDate(pos.key, pos.value));
          object.set("height", reverseDate("height", newHeight));
        } else {
          object.set(pos.key, reverseDate(pos.key, pos.value));
        }
        canvas.renderAll();
      }
    }
  };

  const align = (position: string) => {
    if (canvas) {
      const activeObj = canvas.getActiveObject() || canvas.getActiveObjects();
      if (position != "" && activeObj) {
        process_align(position, activeObj);
        activeObj.setCoords();
        canvas.renderAll();
      } else {
        alert("Please select a item");
        return false;
      }
    }
  };

  const process_align = (position: string, activeObj: fabric.Object) => {
    if (placeHolder && activeObj) {
      if (position === "left") {
        activeObj.set({
          left: 0,
        });
      } else if (position === "right") {
        activeObj.set({
          left: (placeHolder.width || 0) - activeObj.getScaledWidth(),
        });
      } else if (position === "top") {
        activeObj.set({
          top: 0,
        });
      } else if (position === "bottom") {
        activeObj.set({
          top: (placeHolder.height || 1) - activeObj.getScaledHeight(),
        });
      } else if (position === "middle") {
        activeObj.set({
          top: (placeHolder.height || 1) / 2 - activeObj.getScaledHeight() / 2,
        });
      } else if (position === "center") {
        activeObj.set({
          left: (placeHolder.width || 1) / 2 - activeObj.getScaledWidth() / 2,
        });
      }
    }
  };

  const deleteImage = (key: string) => {
    if (canvas) {
      const image = _.find(canvas._objects, function (o) {
        return o.name === key;
      });
      dispatch(deleteDesignInfo({ key: key }));
      dispatch(setControlData({ ...controlData, isChooseImage: false }));
      if (image) canvas.remove(image);
    }
  };

  const chooseDesign = (key: string) => {
    if (canvas) {
      const obj = _.find(canvas._objects, function (o) {
        return o.name === key;
      });

      if (obj) {
        const tmpDesignData = calculatePoint(
          obj.left || 200,
          obj.top || 200,
          obj.getScaledWidth(),
          obj.getScaledHeight()
        );

        const designInfo = {
          choosenKey: obj.name,
          rotate: obj.angle,
          width: tmpDesignData?.width,
          height: tmpDesignData?.height,
          scale: tmpDesignData?.scale,
          left: tmpDesignData?.left,
          top: tmpDesignData?.top,
        };

        dispatch(setValue({ ...designInfo }));
        canvas.setActiveObject(obj);
        canvas.renderAll();
      }
    }
  };

  const cloneDesign = (key: string) => {
    if (canvas) {
      const obj = _.find(canvas._objects, function (o) {
        return o.name === key;
      });
      if (obj) {
        obj.clone((cloned: fabric.Object) => {
          const newName = nanoid();
          cloned.set("name", newName);
          cloned.set("left", 10);
          cloned.set("top", 10);
          canvas.add(cloned);
          dispatch(cloneDesignInfo({ oldKey: key, newKey: newName }));
        });
      }
    }
  };
  const addRect = (imgUrl: string) => {
    if (canvas && placeHolder) {
      const newName = nanoid();
      fabric.Image.fromURL(imgUrl, (image: fabric.Image) => {
        const imageLeft = (canvas.getWidth() - 150) / 2;
        const imageTop = (canvas.getHeight() - 100) / 2;

        image.set("name", newName);
        image.set("left", imageLeft);
        image.set("top", imageTop);
        image.set("angle", 0);
        image.set("opacity", 100);
        image.transparentCorners = false;
        image.centeredScaling = true;
        image.scaleToWidth(150);
        image.scaleToHeight(100);
        image.set("clipPath", placeHolder);
        image.setControlsVisibility({
          mt: false, // middle top disable
          mb: false, // midle bottom
          ml: false, // middle left
          mr: false, // I think you get it
        });

        canvas.add(image);
        const tmpDesignData = calculatePoint(
          image.left || 200,
          image.top || 200,
          image.getScaledWidth(),
          image.getScaledHeight()
        );
        const designInfo = {
          key: newName,
          rotate: 0,
          width: tmpDesignData?.width,
          height: tmpDesignData?.height,
          scale: tmpDesignData?.scale,
          left: tmpDesignData?.left,
          top: tmpDesignData?.top,
          src: imgUrl,
        };
        dispatch(addDesignInfo({ ...designInfo }));
        dispatch(setControlData({ isSetImage: false, isChooseImage: true }));
        canvas.renderAll();
      });
    }
  };

  const setBackgroundFromDataUrl = (
    dataUrl: string,
    outerSize: { outerWidth: number; outerHeight: number }
  ) => {
    if (!dataUrl && !outerSize) {
      return true;
    }
    const { outerWidth, outerHeight } = outerSize;

    if (canvas && placeHolder) {
      fabric.Image.fromURL(dataUrl, (image: fabric.Image) => {
        canvas.setWidth(outerWidth);
        canvas.setHeight(outerHeight);
        canvas.add(placeHolder);
        canvas.renderAll();
        const sizeObj = resizer(
          { width: outerWidth, height: outerHeight },
          { width: image.width || 100, height: image.height || 150 }
        );
        image.scaleToHeight(sizeObj.height);
        image.set("top", sizeObj.y);
        image.set({ left: sizeObj.x });
        canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
      });
    }
  };

  React.useEffect(() => {
    if (canvas && placeHolder) {
      canvas.on("object:moving", function (options) {
        const obj = options.target;
        if (obj) {
          if (
            obj.height &&
            obj.width &&
            obj.left &&
            obj.top &&
            placeHolder.top &&
            placeHolder.height &&
            placeHolder.left &&
            placeHolder.width
          ) {
            const top = obj.top;
            const bottom = top + obj.getScaledHeight();
            const left = obj.left;
            const right = left + obj.getScaledWidth();
            const topBound = placeHolder.top - obj.getScaledHeight();
            const bottomBound =
              placeHolder.top + placeHolder.height + obj.getScaledHeight();
            const leftBound = placeHolder.left - obj.getScaledWidth();
            const rightBound =
              placeHolder.left + placeHolder.width + obj.getScaledWidth();

            if (top <= topBound) {
              obj.lockMovementY = true;
              obj.set("top", top + 5);
              canvas.renderAll();
            }
            if (bottom >= bottomBound) {
              obj.lockMovementY = true;
              obj.set("top", top - 5);
              canvas.renderAll();
            }
            if (left <= leftBound) {
              obj.lockMovementX = true;
              obj.set("left", left + 5);
              canvas.renderAll();
            }
            if (right >= rightBound) {
              obj.lockMovementX = true;
              obj.set("left", left - 5);
              canvas.renderAll();
            }
          }
          const tmpDesignData = calculatePoint(
            obj.left || 200,
            obj.top || 200,
            obj.getScaledWidth(),
            obj.getScaledHeight()
          );
          const designInfo = {
            choosenKey: obj.name,
            rotate: obj.angle,
            width: tmpDesignData?.width,
            height: tmpDesignData?.height,
            scale: tmpDesignData?.scale,
            left: tmpDesignData?.left,
            top: tmpDesignData?.top,
          };
          dispatch(setValue({ ...designInfo }));
        }
      });

      canvas.on("object:modified", function (options) {
        const obj = options.target;
        if (obj) {
          const tmpDesignData = calculatePoint(
            obj.left || 200,
            obj.top || 200,
            obj.getScaledWidth(),
            obj.getScaledHeight()
          );
          const designInfo = {
            choosenKey: obj.name,
            rotate: obj.angle,
            width: tmpDesignData?.width,
            height: tmpDesignData?.height,
            scale: tmpDesignData?.scale,
            left: tmpDesignData?.left,
            top: tmpDesignData?.top,
          };
          dispatch(setValue({ ...designInfo }));
        }
      });

      canvas.on("mouse:down", function (options) {
        const obj = options.target;
        if (obj) {
          obj.lockMovementX = false;
          obj.lockMovementY = false;
          canvas.renderAll();
        }
      });

      const outerSize = {
        outerWidth: defaultWidth,
        outerHeight: pageHeight - pageHeight / 5.3,
      };
      const blueprintImageUrl =
        "https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117";
      setBackgroundFromDataUrl(blueprintImageUrl, outerSize);
    }
  }, [canvas]);

  return (
    <div className="row h-80">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
        <div
          className="outer position-relative"
          style={{
            backgroundImage: `url("https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117")`,
          }}
        >
          <canvas id="canvas" className="center-block"></canvas>
        </div>
      </div>

      <div className="col-lg-3 d-md-none d-lg-block border-start px-0 overflow-y-scroll h-full">
        <div className=" d-flex flex-column">
          <button
            onClick={() => {
              if (canvas) {
                const JSON = exportJSON(canvas);
                setJSONdata(JSON);
              }
            }}
          >
            Export JSON
          </button>
          <button
            onClick={() => {
              if (canvas && JSONdata) {
                importJSON(canvas, JSONdata);
              }
            }}
          >
            Import JSON
          </button>
          <div className="p-3 ">
            {controlData.isSetImage || infoManageData.choosenKey === "" ? (
              <EmptyTable addRect={addRect} />
            ) : (
              <Table
                addRect={addRect}
                deleteImage={deleteImage}
                chooseDesign={chooseDesign}
                cloneDesign={cloneDesign}
                align={align}
                setDesignLocation={setDesignLocation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
