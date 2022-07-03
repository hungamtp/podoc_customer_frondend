import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import useGetColorsByFactoryAndProductId from "@/hooks/api/design/use-get-colors-by-factoryId-productId";
import { Blueprint, DesignState } from "@/models/design";
import { setIsEdit } from "@/redux/slices/isEdit";
import { addPreview, clearAllPreview, Preview } from "@/redux/slices/previews";
import { nanoid } from "@reduxjs/toolkit";
import { fabric } from "fabric";
import { useRouter } from "next/router";
import * as React from "react";
import PreviewTable from "./preview-table";
export interface IPreviewCanvasProps {
  colors: {
    id: number;
    name: string;
    image: string;
  }[];
}
const hightRate = 1.2337;
const placeHolderAndOuterRate = 1.5;
const DPI = 300;

const initBlueprint = {
  frameImage:
    "https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117",
  position: "back",
  placeholder: {
    width: 12,
    height: 13.7,
  },
  designInfos: [
    {
      key: "",
      name: "",
      types: "image/jpeg",
      height: 0,
      width: 0,
      leftPosition: 0,
      rotate: 0,
      scales: 0,
      topPosition: 0,
      src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
    },
  ],
} as Blueprint;

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

export default function PreviewCanvas({ colors }: IPreviewCanvasProps) {
  const pageHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const router = useRouter();

  const [isDrawPreview, setIsDrawPreview] = React.useState(false);

  const defaultWidth =
    screen.width >= 922 ? (screen.width / 12) * 9 : screen.width;
  const blueprintsData = useAppSelector((state) => state.blueprintsData);
  const isEdit = useAppSelector((state) => state.isEdit);

  const previews = useAppSelector((state) => state.previews);

  let renderedPreviews: Preview[] = [];
  previews.forEach((preview) => {
    if (preview.color === renderColor) {
      renderedPreviews.push(preview);
    }
  });
  if (renderedPreviews.length === 0 && previews.length !== 0)
    renderedPreviews = [previews[0], previews[1]];

  const [renderedPosition, setRenderedPosition] = React.useState(
    blueprintsData.position
  );

  const [renderCount, setRenderCount] = React.useState(
    blueprintsData.blueprints.length - 1
  );

  const blueprint = blueprintsData.blueprints[renderCount];
  const placeholderWidth = blueprint.placeholder.width * 30;
  const placeholderHeight = blueprint.placeholder.height * 30;
  const dispatch = useAppDispatch();

  const [renderColor, setRenderColor] = React.useState(colors[0].image);

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

  let hasMorePreview = true; //chuyển từ trang design qua trang preview
  if (previews.length > 0 && isEdit === false) {
    previews.forEach((preview) => {
      if (preview.color === renderColor) {
        hasMorePreview = false;
      }
    });
  }

  const setBackgroundFromDataUrl = (
    dataUrl: string,
    outerSize: { outerWidth: number; outerHeight: number },
    isNeedColor: boolean
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
          const colorFilter = new fabric.Image.filters.BlendColor({
            color: renderColor,
            mode: "add",
            alpha: 0.8,
          });
          const sizeObj = resizer(
            { width: outerWidth, height: outerHeight },
            { width: image.width || 100, height: image.height || 150 }
          );
          image.scaleToHeight(sizeObj.height);
          image.set("top", sizeObj.y);
          image.set({ left: sizeObj.x });
          if (isNeedColor) image.filters?.push(colorFilter);
          image.applyFilters();
          canvas.renderAll();
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
          // canvas.clipPath = image;
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  React.useEffect(() => {
    setCanvas(initCanvas(defaultWidth, pageHeight / hightRate, "preview"));
    if (isEdit) {
      dispatch(clearAllPreview());
    }
    return () => {
      dispatch(setIsEdit(false));
      canvas?.clear();
    };
  }, []);

  React.useEffect(() => {
    let hasMorePreview = true;

    if (previews.length > 0) {
      previews.forEach((preview) => {
        if (preview.color === renderColor) {
          hasMorePreview = false;
        }
      });
    }

    if (renderColor) {
      if (hasMorePreview) {
        setRenderCount(blueprintsData.blueprints.length - 1);
      } else {
        canvas?.clear();
        let renderImage = previews[0].imageSrc;
        previews.forEach((preview) => {
          if (
            preview.color === renderColor &&
            preview.position === renderedPosition
          ) {
            renderImage = preview.imageSrc;
          }
        });

        const outerSize = {
          outerWidth: defaultWidth,
          outerHeight: pageHeight - pageHeight / 5.3,
        };

        setBackgroundFromDataUrl(renderImage, outerSize, false);
      }
    }

    setIsDrawPreview(true);
  }, [renderColor]);

  React.useEffect(() => {
    console.log(hasMorePreview, "hasMorePreview");
    if (canvas && previews.length !== 0 && hasMorePreview) {
      canvas.clear();
      const renderedImage = previews.filter(
        (preview) =>
          preview.color === renderColor && preview.position === renderedPosition
      );
      console.log(renderedImage, "renderedImage");
      const outerSize = {
        outerWidth: defaultWidth,
        outerHeight: pageHeight - pageHeight / 5.3,
      };
      setBackgroundFromDataUrl(renderedImage[0].imageSrc, outerSize, false);
    }
  }, [renderedPosition]);

  React.useEffect(() => {
    if (canvas && hasMorePreview) {
      canvas.clear();
      setPlaceHolder(
        initPlaceHolder(
          placeholderWidth,
          placeholderHeight,
          pageHeight / placeHolderAndOuterRate,
          defaultWidth
        )
      );
    }

    if (canvas && !hasMorePreview) {
      canvas?.clear();
      const renderedImage = previews.filter((preview) => {
        return (
          preview.color === renderColor && preview.position === renderedPosition
        );
      });
      const outerSize = {
        outerWidth: defaultWidth,
        outerHeight: pageHeight - pageHeight / 5.3,
      };

      setBackgroundFromDataUrl(renderedImage[0].imageSrc, outerSize, false);
    }

    const rerenderLoop = setInterval(() => {
      if (canvas && imgSrc === "") {
        const canvasObjs = canvas._objects || [];
        if (blueprint.designInfos) {
          if (
            canvasObjs.length == (blueprint.designInfos.length || 0) + 1 &&
            canvasObjs.some((design) => {
              if (blueprint.designInfos && blueprint.designInfos.length > 0)
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
      } else {
        clearInterval(rerenderLoop);
      }
    }, 200);

    return () => {
      clearInterval(rerenderLoop);
    };
  }, [renderCount, canvas]);

  React.useEffect(() => {
    if (canvas && imgSrc !== "" && hasMorePreview) {
      dispatch(
        addPreview({
          position: blueprint.position,
          imageSrc: imgSrc,
          color: renderColor,
        })
      );
      if (renderCount > 0) {
        setRenderCount((count) => count - 1);
      }
      setImgSrc("");
    }
  }, [imgSrc]);

  React.useEffect(() => {
    if (canvas && placeHolder && hasMorePreview) {
      console.log("count");
      canvas.add(placeHolder);
      let renderedBlueprint = initBlueprint;
      blueprintsData.blueprints.forEach((blueprint) => {
        if (blueprint.position === renderedPosition) {
          renderedBlueprint = blueprint;
        }
      });

      const drawBlueprint = isDrawPreview ? blueprint : renderedBlueprint;
      reverseDesigns(drawBlueprint);
    }
  }, [placeHolder]);

  const reverseDesigns = (blueprint: Blueprint) => {
    if (canvas && placeHolder) {
      const outerSize = {
        outerWidth: defaultWidth,
        outerHeight: pageHeight - pageHeight / 5.3,
      };

      const blueprintImageUrl = blueprint.frameImage;
      setBackgroundFromDataUrl(blueprintImageUrl, outerSize, true);

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
          (value / (blueprint.placeholder.width / DPI)) *
          placeHolder.getScaledWidth();
      if (key === "height")
        data =
          (value / (blueprint.placeholder.height / DPI)) *
          placeHolder.getScaledHeight();
      if (key === "scale") data = placeHolder.getScaledWidth() * value;
      return data;
    }
  };
  const addRect = (design: DesignState) => {
    if (canvas && placeHolder) {
      const imageLeft = reverseData("left", design.leftPosition);
      const imageTop = reverseData("top", design.topPosition);
      const imageWidth = reverseData("width", design.width);
      if (design.types === "text") {
        const newText = new fabric.Text(design.src, {
          fontFamily: design.font,
          clipPath: placeHolder,
          name: design.name,
          left: imageLeft,
          top: imageTop,
          angle: design.rotate,
          selectable: false,
          centeredScaling: true,
          transparentCorners: true,
          fill: design.textColor,
        })
          .setControlsVisibility({
            mt: false, // middle top disable
            mb: false, // midle bottom
            ml: false, // middle left
            mr: false, // I think you get it
          })
          .scaleToWidth(150)
          .scaleToHeight(100);
        newText.scaleToWidth(imageWidth || 150);
        canvas.add(newText);
        canvas.renderAll();
      } else {
        fabric.Image.fromURL(
          design.tmpSrc,
          (image: fabric.Image) => {
            image.set("name", design.key);
            image.set("left", imageLeft);
            image.set("top", imageTop);
            image.set("angle", design.rotate);
            image.set("opacity", 100);
            image.set("noScaleCache", true);
            image.scaleToWidth(imageWidth || 150);
            image.set("clipPath", placeHolder);
            image.set("selectable", false);

            canvas.add(image);

            canvas.renderAll();
          },
          { crossOrigin: "anonymous" }
        );
      }
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
        (blueprint.placeholder.width / DPI);
      const newHeight =
        (height / placeHolder.getScaledHeight()) *
        (blueprint.placeholder.height / DPI);
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
    <>
      <div className="row h-81">
        <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
          <div className="outer position-relative">
            <canvas id="preview" className="center-block"></canvas>
          </div>
        </div>

        <div className="col-lg-3 d-md-none d-lg-block border-start px-0 overflow-y-scroll h-full">
          <div className=" d-flex flex-column">
            <div className="p-3 ">
              <PreviewTable
                renderColor={renderColor}
                setRenderColor={setRenderColor}
                setRenderedPosition={setRenderedPosition}
                setIsDrawPreview={setIsDrawPreview}
                colors={colors}
              />
            </div>
          </div>
        </div>
      </div>
      {!colors && (
        <div id="preloader">
          <div id="status">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
