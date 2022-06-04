import * as React from "react";
import { useRouter } from "next/router";
import { fabric } from "fabric";
import Table from "@/components/design/table";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import {
  setValue,
  addDesignInfo,
  deleteDesignInfo,
  cloneDesignInfo,
} from "@/redux/slices/design";
import { nanoid } from "nanoid";
import Script from "next/script";
import $ from "jquery";
import EmptyTable from "@/components/design/emptyTable";
import DesignHeaderLeft from "@/components/design/design-header-left";
import DesignFooterLeft from "@/components/design/design-footer-left";
import DesignHeaderRight from "@/components/design/design-header-right";
import DesignFooterRight from "@/components/design/design-footer-right";
import { setControlData } from "@/redux/slices/designControl";
import _ from "lodash";

export interface IDesignCanvasProps {}
const paddingRate = 2.1;
const outerAndPageRatio = 1.237;

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

const initplaceHolder = (
  placeHolderWidth: number,
  placeHolderWidthHeight: number,
  containerHeight: number
): fabric.Canvas => {
  const aspectRatio = placeHolderWidthHeight / placeHolderWidth;
  const newHeight = containerHeight / 2.5;
  const newWidth = newHeight / aspectRatio;
  const tmpplaceHolder = new fabric.Canvas("placeHolder", {
    width: newWidth,
    height: newHeight,
  });

  return tmpplaceHolder;
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

  const [placeHolder, setPlaceHolder] = React.useState<fabric.Canvas>();
  const [isPreview, setIsPreview] = React.useState(false);
  const [canvasList, setCanvasList] = React.useState<fabric.Canvas[]>();
  React.useEffect(() => {
    setPlaceHolder(
      initplaceHolder(236.2, 289.4, pageHeight / outerAndPageRatio)
    );
  }, []);

  const align = (position: string) => {
    if (placeHolder) {
      const activeObj =
        placeHolder.getActiveObject() || placeHolder.getActiveObjects();
      if (position != "" && activeObj) {
        process_align(position, activeObj);
        activeObj.setCoords();
        placeHolder.renderAll();
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
    if (placeHolder) {
      const image = _.find(placeHolder._objects, function (o) {
        return o.name === key;
      });
      dispatch(deleteDesignInfo({ key: key }));
      dispatch(setControlData({ ...controlData, isChooseImage: false }));
      if (image) placeHolder.remove(image);
    }
  };

  const chooseDesign = (key: string) => {
    if (placeHolder) {
      const obj = _.find(placeHolder._objects, function (o) {
        return o.name === key;
      });
      if (obj) {
        const designInfo = {
          choosenKey: obj.name,
          rotate: obj.angle,
          width: obj.getScaledWidth(),
          height: obj.getScaledHeight(),
          scale: obj.scaleX,
          left: obj.left,
          top: obj.top,
        };

        dispatch(setValue({ ...designInfo }));
        placeHolder.setActiveObject(obj);
        placeHolder.renderAll();
      }
    }
  };

  const cloneDesign = (key: string) => {
    if (placeHolder) {
      const obj = _.find(placeHolder._objects, function (o) {
        return o.name === key;
      });
      if (obj) {
        obj.clone((cloned: fabric.Object) => {
          const newName = nanoid();
          cloned.set("name", newName);
          cloned.set("left", 10);
          cloned.set("top", 10);
          placeHolder.add(cloned);
          dispatch(cloneDesignInfo({ oldKey: key, newKey: newName }));
        });
      }
    }
  };
  const addRect = (imgUrl: string) => {
    if (placeHolder) {
      const newName = nanoid();
      fabric.Image.fromURL(imgUrl, (image: fabric.Image) => {
        image.set("name", newName);
        image.set("left", 30);
        image.set("top", 100);
        image.set("angle", 0);
        image.set("opacity", 100);
        image.transparentCorners = false;
        image.centeredScaling = true;
        image.scaleToWidth(150);
        image.scaleToHeight(100);
        placeHolder.add(image);

        const designInfo = {
          key: newName,
          rotate: 0,
          width: image.width,
          height: image.height,
          scale: 0.3,
          left: 100,
          top: 100,
          src: imgUrl,
        };
        dispatch(addDesignInfo({ ...designInfo }));
        dispatch(setControlData({ isSetImage: false, isChooseImage: true }));
        placeHolder.renderAll();
      });
    }
  };
  const resizeplaceHolder = () => {
    if (placeHolder) {
      const outerplaceHolderContainer = $(".outer")[0];
      const containerWidth = outerplaceHolderContainer.clientWidth;
      const containerHeight = outerplaceHolderContainer.clientHeight;
      const ratio = placeHolder.getWidth() / placeHolder.getHeight();
      const newHeight = containerHeight / 2.5;
      const newWidth = newHeight / ratio;
      const paddingTop = (containerHeight - newHeight) / paddingRate;

      console.log(paddingTop, "padding top");
      console.log(placeHolder.getZoom(), "zoom");

      console.log(containerHeight, "height");
      console.log(pageHeight, "phh");

      const scale = 2.5;
      const zoom = placeHolder.getZoom() * scale;
      placeHolder.setDimensions({ width: newWidth, height: newHeight });
      placeHolder.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);

      outerplaceHolderContainer.style.paddingLeft =
        (containerWidth - newWidth) / 2 + "px";
      outerplaceHolderContainer.style.paddingTop = paddingTop + "px";

      placeHolder.renderAll();
    }
  };
  $(window).resize(resizeplaceHolder);

  const [selectedShapeKey, setSelectedShapeKey] = React.useState("");

  React.useEffect(() => {
    if (placeHolder) {
      const outerplaceHolderContainer = $(".outer")[0];
      const placeHolderTop =
        (outerplaceHolderContainer.clientHeight - placeHolder.getHeight()) /
        paddingRate;
      const placeHolderLeft = (defaultWidth - placeHolder.getWidth()) / 2;
      outerplaceHolderContainer.style.paddingLeft = placeHolderLeft + "px";
      outerplaceHolderContainer.style.paddingTop = placeHolderTop + "px";
      console.log(placeHolderTop, "padding top");
      console.log(placeHolderLeft, "padding left");

      placeHolder.on("object:moving", function (options) {
        const obj = options.target;
        if (obj) {
          if (
            obj.height &&
            obj.width &&
            obj.left &&
            obj.top &&
            placeHolder.height &&
            placeHolder.width
          ) {
            const top = obj.top;
            const bottom = top + obj.getScaledHeight();
            const left = obj.left;
            const right = left + obj.getScaledWidth();
            const topBound = -obj.getScaledHeight();
            const bottomBound = placeHolder.height + obj.getScaledHeight();
            const leftBound = -obj.getScaledWidth();
            const rightBound = placeHolder.width + obj.getScaledWidth();
            console.log(topBound, "topBound");
            console.log(leftBound, "leftBound");
            console.log(rightBound, "rightBound");
            console.log(bottomBound, "bottomBound");

            if (top <= topBound) {
              obj.lockMovementY = true;
              obj.set("top", top + 20);
              console.log("cc");
              placeHolder.renderAll();
            }
            if (bottom >= bottomBound) {
              obj.lockMovementY = true;
              obj.set("top", top - 20);
              placeHolder.renderAll();
            }
            if (left <= leftBound) {
              obj.lockMovementX = true;
              obj.set("left", left + 20);
              placeHolder.renderAll();
            }
            if (right >= rightBound) {
              obj.lockMovementX = true;
              obj.set("left", left - 20);
              placeHolder.renderAll();
            }
          }
          const designInfo = {
            choosenKey: obj.name,
            rotate: obj.angle,
            width: obj.getScaledWidth(),
            height: obj.getScaledHeight(),
            scale: obj.scaleX,
            left: obj.left,
            top: obj.top,
          };
          dispatch(setValue({ ...designInfo }));
        }
      });

      placeHolder.on("mouse:down", function (options) {
        const obj = options.target;
        if (obj) {
          obj.lockMovementX = false;
          obj.lockMovementY = false;
          placeHolder.renderAll();
        }
      });
    }
  }, [placeHolder]);
  return (
    <div className="row h-80">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
        <div
          className="outer position-relative"
          style={{
            backgroundImage: `url("https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117")`,
          }}
        >
          <canvas id="placeHolder" className="center-block"></canvas>
        </div>
      </div>

      <div className="col-lg-3 d-md-none d-lg-block border-start px-0 overflow-y-scroll h-full">
        {" "}
        <div className=" d-flex flex-column">
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}