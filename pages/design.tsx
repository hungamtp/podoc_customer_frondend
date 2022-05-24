import { useRouter } from "next/router";
import * as React from "react";
import { fabric } from "fabric";
import Table from "@/components/design/table";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { setValue, addDesignInfo } from "@/redux/slices/design";
import { nanoid } from "nanoid";
import Script from "next/script";
import $ from "jquery";
import EmptyTable from "@/components/design/emptyTable";
import DesignHeaderLeft from "@/components/design/design-header-left";
import DesignFooterLeft from "@/components/design/design-footer-left";
import DesignHeaderRight from "@/components/design/design-header-right";
import DesignFooterRight from "@/components/design/design-footer-right";
import { setControlData } from "@/redux/slices/designControl";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

export interface info {
  angle: number;
}

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
    backgroundColor: "white",
    width: newWidth,
    height: newHeight,
  });

  return tmpplaceHolder;
};
export default function AboutPage(props: AboutPageProps) {
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
  React.useEffect(() => {
    setPlaceHolder(
      initplaceHolder(236.2, 289.4, pageHeight / outerAndPageRatio)
    );
  }, []);
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
      placeHolder.on("object:moving", function (options) {
        const obj = options.target;
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
        }
      });
      const outerplaceHolderContainer = $(".outer")[0];
      outerplaceHolderContainer.style.paddingLeft =
        (defaultWidth - placeHolder.getWidth()) / 2 + "px";
      outerplaceHolderContainer.style.paddingTop =
        (outerplaceHolderContainer.clientHeight - placeHolder.getHeight()) /
          paddingRate +
        "px";
    }
  }, [placeHolder]);

  const addRect = (imgUrl: string) => {
    if (placeHolder) {
      const newName = nanoid();
      fabric.Image.fromURL(imgUrl, (image: fabric.Image) => {
        image.set("name", newName);
        image.set("left", 100);
        image.set("top", 100);
        image.set("angle", 0);
        image.set("opacity", 100);
        image.transparentCorners = false;
        image.centeredScaling = true;
        image.scaleToWidth(170);
        image.scaleToHeight(200);
        placeHolder.add(image);

        const designInfo = {
          key: newName,
          rotate: 0,
          width: 150,
          height: 120,
          scale: 0.3,
          left: 150,
          top: 200,
        };
        dispatch(addDesignInfo({ ...designInfo }));
        dispatch(setControlData({ isSetImage: false, isChooseImage: true }));
        placeHolder.renderAll();
      });
    }
  };

  const alignLeft = () => {};

  return (
    <div className="container-fluid ">
      <div className="row align-items-center">
        <div className="col-lg-9 col-12 px-0 h-screen d-flex flex-column ">
          <DesignHeaderLeft />
          <div
            className=" outer position-relative"
            style={{
              backgroundImage: `url("https://www.xfanzexpo.com/wp-content/uploads/2019/11/t-shirt-template-design-t-shirt-template-this-is-great-with-blank-t-shirt-outline-template.jpg")`,
            }}
          >
            <canvas id="placeHolder" className="center-block"></canvas>
          </div>
          <DesignFooterLeft />
        </div>
        <div className="col-lg-3 d-md-none d-lg-block border-start h-screen px-0">
          <div className=" d-flex flex-column h-full">
            <DesignHeaderRight />
            <div className="designTable p-3">
              {controlData.isSetImage || infoManageData.choosenKey === "" ? (
                <EmptyTable addRect={addRect} />
              ) : (
                <Table addRect={addRect} />
              )}
            </div>
            <DesignFooterRight />
          </div>
        </div>
      </div>
    </div>
  );
}
