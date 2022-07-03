import EmptyTable from "@/components/design/emptyTable";
import Table from "@/components/design/table";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { Blueprint, DesignState } from "@/models/design";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import {
  addDesignInfo,
  cloneDesignInfo,
  deleteDesignInfo,
  setValue,
  updateTmpSrc,
  updateUniqueData,
} from "@/redux/slices/design";
import { setControlData } from "@/redux/slices/designControl";
import { setIsEdit } from "@/redux/slices/isEdit";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import googleFonts from "google-fonts";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as React from "react";
export interface IDesignCanvasProps {
  // isPreview: boolean;
}
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

const getBase64FromUrl = async (url: string): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result + "" || url;
      resolve(base64data);
    };
  });
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
): { rect: fabric.Rect; border: fabric.Object[] } => {
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
  // `M ${left} ${top} L ${left + newWidth} ${top} L ${left + newWidth} ${top + newHeight} L ${left} ${top + newHeight} z`
  const topLine = new fabric.Line([left, top, left + newWidth, top], {
    absolutePositioned: true,
    selectable: false,
    strokeDashArray: [5, 5],
    strokeWidth: 2,
    stroke: "rgba(255,255,255,1.0)",
  });

  const rightLine = new fabric.Line(
    [left + newWidth, top, left + newWidth, top + newHeight],
    {
      absolutePositioned: true,
      selectable: false,
      strokeDashArray: [5, 5],
      strokeWidth: 2,
      stroke: "rgba(255,255,255,1.0)",
    }
  );
  const bottomLine = new fabric.Line(
    [left + newWidth, top + newHeight, left, top + newHeight],
    {
      absolutePositioned: true,
      selectable: false,
      strokeDashArray: [5, 5],
      strokeWidth: 2,
      stroke: "rgba(255,255,255,1.0)",
    }
  );
  const leftLine = new fabric.Line([left, top + newHeight, left, top], {
    absolutePositioned: true,
    selectable: false,
    strokeDashArray: [5, 5],
    strokeWidth: 2,
    stroke: "rgba(255,255,255,1.0)",
  });
  const border = [topLine, rightLine, bottomLine, leftLine];

  return { rect: rect, border };
};

export default function DesignCanvas(props: IDesignCanvasProps) {
  const pageHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const defaultWidth =
    screen.width >= 922 ? (screen.width / 12) * 9 : screen.width;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const designControlData = useAppSelector((state) => state.designControl);
  const blueprintsData = useAppSelector((state) => state.blueprintsData);
  const [renderPosition, setRenderPosition] = React.useState<string>(
    blueprintsData.position
  );
  const controlData = designControlData.controlData;
  const blueprint = blueprintsData.blueprints.filter(
    (blueprint) => blueprint.position === blueprintsData.position
  )[0];

  const placeholderWidth = blueprint.placeholder.width * 30;
  const placeholderHeight = blueprint.placeholder.height * 30;

  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [placeHolder, setPlaceHolder] = React.useState<{
    rect: fabric.Rect;
    border: fabric.Object[];
  }>();
  const [JSONdata, setJSONdata] = React.useState<string>();
  const [aspectRatio, setAspectRatio] = React.useState<number>(1);
  React.useEffect(() => {
    setCanvas(initCanvas(defaultWidth, pageHeight / hightRate, "canvas"));
  }, []);

  React.useEffect(() => {
    if (renderPosition !== blueprintsData.position) {
      setRenderPosition(blueprintsData.position);
    }
  }, [blueprintsData]);
  React.useEffect(() => {
    if (canvas) {
      canvas.clear();
    }

    setPlaceHolder(
      initPlaceHolder(
        placeholderWidth,
        placeholderHeight,
        pageHeight / placeHolderAndOuterRate,
        defaultWidth
      )
    );
    setAspectRatio(placeholderWidth / placeholderHeight);
  }, [renderPosition]);

  const reverseDesigns = (blueprint: Blueprint) => {
    if (canvas && placeHolder) {
      const designInfos = blueprint.designInfos;
      if (designInfos) {
        designInfos.forEach((design) => {
          addRect(design);
        });
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
        ((left - (placeHolder.rect.left || 0)) /
          placeHolder.rect.getScaledWidth()) *
        100;
      const newTop =
        ((top - (placeHolder.rect.top || 0)) /
          placeHolder.rect.getScaledHeight()) *
        100;
      const newWidth =
        (width / placeHolder.rect.getScaledWidth()) *
        (blueprint.placeholder.width / DPI);
      const newHeight =
        (height / placeHolder.rect.getScaledHeight()) *
        (blueprint.placeholder.height / DPI);
      const scale = width / placeHolder.rect.getScaledWidth();
      return {
        left: newLeft,
        top: newTop,
        width: newWidth,
        height: newHeight,
        scale: scale,
      };
    }
  };

  const reverseData = (key: string, value: number) => {
    let data = 0;
    if (placeHolder) {
      if (key === "top")
        data =
          (value / 100) * placeHolder.rect.getScaledHeight() +
          (placeHolder.rect.top || 0);
      if (key === "left")
        data =
          (value / 100) * placeHolder.rect.getScaledWidth() +
          (placeHolder.rect.left || 0);
      if (key === "width")
        data =
          (value / (blueprint.placeholder.width / DPI)) *
          placeHolder.rect.getScaledWidth();
      if (key === "height")
        data =
          (value / (blueprint.placeholder.height / DPI)) *
          placeHolder.rect.getScaledHeight();
      if (key === "scale") data = placeHolder.rect.getScaledWidth() * value;
      return data;
    }
  };

  const setDesignLocation = React.useCallback(
    (
      designKey: string,
      posInfo: {
        pos: string;
        value: number;
      }
    ) => {
      if (canvas) {
        const object = _.find(canvas._objects, function (o) {
          return o.name === designKey;
        });
        if (object && canvas) {
          if (posInfo.pos === "width") {
            object.scaleToWidth(reverseData("width", posInfo.value) || 0);
          } else if (posInfo.pos === "height") {
            object.scaleToHeight(reverseData("height", posInfo.value) || 0);
          } else if (posInfo.pos === "scale") {
            object.scaleToWidth(reverseData("scale", posInfo.value) || 0);
          } else if (posInfo.pos === "top") {
            object.set("top", reverseData("top", posInfo.value) || 0);
          } else if (posInfo.pos === "left") {
            object.set("left", reverseData("left", posInfo.value) || 0);
          }
          const tmpDesignData = calculatePoint(
            object.left || 200,
            object.top || 200,
            object.getScaledWidth(),
            object.getScaledHeight()
          );

          const designInfo = {
            choosenKey: object.name,
            rotate: object.angle,
            width: tmpDesignData?.width,
            height: tmpDesignData?.height,
            scales: tmpDesignData?.scale,
            leftPosition: tmpDesignData?.left,
            topPosition: tmpDesignData?.top,
          };

          dispatch(setValue({ ...designInfo }));
          dispatch(setChoosenKey(object.name));
          canvas.renderAll();
        }
      }
    },
    [placeHolder]
  );

  const align = React.useCallback(
    (position: string) => {
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
    },
    [placeHolder]
  );

  const process_align = (position: string, activeObj: fabric.Object) => {
    if (placeHolder && activeObj) {
      dispatch(setIsEdit(true));
      if (position === "left") {
        activeObj.set({
          left: 0,
        });
      } else if (position === "right") {
        activeObj.set({
          left: (placeHolder.rect.width || 0) - activeObj.getScaledWidth(),
        });
      } else if (position === "top") {
        activeObj.set({
          top: 0,
        });
      } else if (position === "bottom") {
        activeObj.set({
          top: (placeHolder.rect.height || 1) - activeObj.getScaledHeight(),
        });
      } else if (position === "middle") {
        activeObj.set({
          top:
            (placeHolder.rect.height || 1) / 2 -
            activeObj.getScaledHeight() / 2,
        });
      } else if (position === "center") {
        activeObj.set({
          left:
            (placeHolder.rect.width || 1) / 2 - activeObj.getScaledWidth() / 2,
        });
      }
    }
  };

  const deleteImage = (key: string, isLast: boolean) => {
    if (canvas) {
      dispatch(setIsEdit(true));
      const image = _.find(canvas._objects, function (o) {
        return o.name === key;
      });
      dispatch(deleteDesignInfo({ key: key }));
      dispatch(
        setControlData(
          isLast
            ? { ...controlData, isChooseImage: false, isEmpty: true }
            : { ...controlData, isChooseImage: false }
        )
      );
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
          scales: tmpDesignData?.scale,
          leftPosition: tmpDesignData?.left,
          topPosition: tmpDesignData?.top,
        };

        dispatch(setValue({ ...designInfo }));
        dispatch(setChoosenKey(obj.name));
        canvas.setActiveObject(obj);
        canvas.renderAll();
      }
    }
  };

  const cloneDesign = (key: string) => {
    dispatch(setIsEdit(true));
    if (canvas && placeHolder) {
      const obj = _.find(canvas._objects, function (o) {
        return o.name === key;
      });
      if (obj) {
        obj.clone((cloned: fabric.Object) => {
          const newName = nanoid();
          cloned.set("name", newName);
          cloned.set("left", obj.left || 100 + 10);
          cloned.set("top", obj.top || 100 + 10);
          cloned.set("clipPath", placeHolder?.rect);
          dispatch(setChoosenKey(newName));
          canvas.add(cloned);
          dispatch(cloneDesignInfo({ oldKey: key, newKey: newName }));
        });
      }
    }
  };

  const changeText = React.useCallback(
    (key: string, text: string) => {
      dispatch(setIsEdit(true));
      console.log(text, "texxtt");
      if (canvas) {
        const obj = _.find(canvas._objects, function (o) {
          return o.name === key;
        }) as fabric.Text;

        if (obj) {
          obj.set("text", text);
          canvas.requestRenderAll();
        }
        dispatch(
          updateUniqueData({ choosenKey: key, dataKey: "src", data: text })
        );
      }
    },
    [placeHolder]
  );

  const changeFont = React.useCallback(
    (key: string, fontName: string) => {
      dispatch(setIsEdit(true));
      if (canvas) {
        const obj = _.find(canvas._objects, function (o) {
          return o.name === key;
        }) as fabric.Text;

        if (obj) {
          if (fontName === "Roboto") {
            obj.set("fontFamily", "Roboto");
            canvas.requestRenderAll();
          } else {
            googleFonts.add({ [fontName]: true });
            const myFont = new FontFaceObserver(fontName);
            myFont
              .load()
              .then(function () {
                // when font is loaded, use it.
                obj.set("fontFamily", fontName);
                canvas.requestRenderAll();
              })
              .catch(function (e) {
                console.log(e);
                alert("font loading failed " + fontName);
              });
          }
        }
        dispatch(
          updateUniqueData({ choosenKey: key, dataKey: "font", data: fontName })
        );
      }
    },
    [placeHolder]
  );

  const changeTextColor = React.useCallback(
    (key: string, color: string) => {
      dispatch(setIsEdit(true));
      if (canvas) {
        const obj = _.find(canvas._objects, function (o) {
          return o.name === key;
        }) as fabric.Text;

        if (obj) {
          obj.set("fill", color);
          canvas.requestRenderAll();
        }
        dispatch(
          updateUniqueData({
            choosenKey: key,
            dataKey: "textColor",
            data: color,
          })
        );
      }
    },
    [placeHolder]
  );

  const addNewText = React.useCallback(
    (text: string) => {
      if (canvas && placeHolder) {
        dispatch(setIsEdit(true));
        const imageLeft = (canvas.getWidth() - 150) / 2;
        const imageTop = (canvas.getHeight() - 100) / 2;
        const newName = nanoid();
        const newText = new fabric.Text(text, {
          fontFamily: "Roboto",
          clipPath: placeHolder.rect,
          name: newName,
          left: imageLeft,
          top: imageTop,
          centeredScaling: true,
          transparentCorners: true,
          fill: "white",
        })
          .setControlsVisibility({
            mt: false, // middle top disable
            mb: false, // midle bottom
            ml: false, // middle left
            mr: false, // I think you get it
          })
          .scaleToWidth(150)
          .scaleToHeight(100);
        canvas.add(newText);
        const tmpDesignData = calculatePoint(
          newText.left || 200,
          newText.top || 200,
          newText.getScaledWidth(),
          newText.getScaledHeight()
        );
        const designInfo = {
          key: newName,
          name: newName,
          types: "text",
          rotate: 0,
          width: tmpDesignData?.width,
          height: tmpDesignData?.height,
          scales: tmpDesignData?.scale,
          leftPosition: tmpDesignData?.left,
          topPosition: tmpDesignData?.top,
          src: text,
          font: "Roboto",
          textColor: "white",
        };

        dispatch(addDesignInfo({ ...designInfo }));
        dispatch(
          setControlData({
            isSetImage: false,
            isChooseImage: true,
            isEmpty: false,
          })
        );
        dispatch(setChoosenKey(newName));
        canvas.renderAll();
      }
    },
    [placeHolder]
  );

  const addNewRect = React.useCallback(
    (imgUrl: string, tmpSrc: string) => {
      dispatch(setIsEdit(true));
      if (canvas && placeHolder) {
        const newName = nanoid();
        fabric.Image.fromURL(
          imgUrl,
          (image: fabric.Image) => {
            const imageLeft = (canvas.getWidth() - 150) / 2;
            const imageTop = (canvas.getHeight() - 100) / 2;
            console.log(image, "imageee");

            image.set("name", newName);

            image.set("left", imageLeft);
            image.set("top", imageTop);
            image.set("angle", 0);
            image.set("opacity", 1000);
            image.set("noScaleCache", true);
            image.transparentCorners = true;
            image.centeredScaling = true;
            image.scaleToWidth(150);
            image.scaleToHeight(100);
            image.set("clipPath", placeHolder.rect);

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
            const imageNameFromUrl = imgUrl.split("%2F")[1].split("?")[0];
            const designInfo = {
              key: newName,
              name: imageNameFromUrl,
              types: "image/png",
              rotate: 0,
              width: tmpDesignData?.width,
              height: tmpDesignData?.height,
              scales: tmpDesignData?.scale,
              leftPosition: tmpDesignData?.left,
              topPosition: tmpDesignData?.top,
              tmpSrc: tmpSrc,
              src: imgUrl,
            };

            dispatch(addDesignInfo({ ...designInfo }));
            dispatch(
              setControlData({
                isSetImage: false,
                isChooseImage: true,
                isEmpty: false,
                isLoadingImage: false,
              })
            );
            dispatch(setChoosenKey(newName));
          },
          { crossOrigin: "anonymous" }
        );
      }
    },
    [placeHolder]
  );

  const addRect = React.useCallback(
    (design: DesignState) => {
      if (canvas && placeHolder) {
        const imageLeft = reverseData("left", design.leftPosition);
        const imageTop = reverseData("top", design.topPosition);
        const imageWidth = reverseData("width", design.width);
        if (design.types === "text") {
          const newText = new fabric.Text(design.src, {
            fontFamily: design.font,
            clipPath: placeHolder.rect,
            name: design.key,
            left: imageLeft,
            top: imageTop,
            angle: design.rotate,
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
          if (!design.tmpSrc) {
            getBase64FromUrl(design.src).then((tmpSrc) => {
              fabric.Image.fromURL(
                tmpSrc,
                (image: fabric.Image) => {
                  image.set("name", design.key);
                  image.set("left", imageLeft);
                  image.set("top", imageTop);
                  image.set("angle", design.rotate);
                  image.set("opacity", 100);
                  image.set("noScaleCache", true);
                  image.transparentCorners = false;
                  image.centeredScaling = true;
                  image.scaleToWidth(imageWidth || 150);
                  image.set("clipPath", placeHolder.rect);
                  image.setControlsVisibility({
                    mt: false, // middle top disable
                    mb: false, // midle bottom
                    ml: false, // middle left
                    mr: false, // I think you get it
                  });
                  canvas.add(image);
                  canvas.renderAll();
                  dispatch(updateTmpSrc({ key: design.key, tmpSrc: tmpSrc }));
                },
                { crossOrigin: "anonymous" }
              );
            });
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
                image.transparentCorners = false;
                image.centeredScaling = true;
                image.scaleToWidth(imageWidth || 150);
                image.set("clipPath", placeHolder.rect);
                image.setControlsVisibility({
                  mt: false, // middle top disable
                  mb: false, // midle bottom
                  ml: false, // middle left
                  mr: false, // I think you get it
                });
                canvas.add(image);
                canvas.renderAll();
              },
              { crossOrigin: "anonymous" }
            );
          }
        }
      }
    },
    [placeHolder]
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
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  React.useEffect(() => {
    if (canvas && placeHolder) {
      canvas.add(placeHolder.rect);
      placeHolder.border.forEach((line) => {
        canvas.add(line);
      });

      canvas.on("object:moving", function (options) {
        const obj = options.target;
        if (obj) {
          if (
            obj.height &&
            obj.width &&
            obj.left &&
            obj.top &&
            placeHolder.rect.top &&
            placeHolder.rect.height &&
            placeHolder.rect.left &&
            placeHolder.rect.width
          ) {
            const top = obj.top;
            const bottom = top + obj.getScaledHeight();
            const left = obj.left;
            const right = left + obj.getScaledWidth();
            const topBound = placeHolder.rect.top - obj.getScaledHeight();
            const bottomBound =
              placeHolder.rect.top +
              placeHolder.rect.height +
              obj.getScaledHeight();
            const leftBound = placeHolder.rect.left - obj.getScaledWidth();
            const rightBound =
              placeHolder.rect.left +
              placeHolder.rect.width +
              obj.getScaledWidth();

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
            scales: tmpDesignData?.scale,
            leftPosition: tmpDesignData?.left,
            topPosition: tmpDesignData?.top,
          };
          dispatch(setValue({ ...designInfo }));
          dispatch(setChoosenKey(obj.name));
          dispatch(setIsEdit(true));
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
            scales: tmpDesignData?.scale,
            leftPosition: tmpDesignData?.left,
            topPosition: tmpDesignData?.top,
          };
          dispatch(setValue({ ...designInfo }));
          dispatch(setChoosenKey(obj.name));
          dispatch(setIsEdit(true));
        }
      });

      canvas.on("mouse:down", function (options) {
        const obj = options.target;
        if (obj) {
          obj.lockMovementX = false;
          obj.lockMovementY = false;
          dispatch(setChoosenKey(obj.name));
          canvas.renderAll();
        }
      });

      const outerSize = {
        outerWidth: defaultWidth,
        outerHeight: pageHeight - pageHeight / 5.3,
      };
      // const blueprintImageUrl =
      //   "https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117";
      const blueprintImageUrl = blueprint.frameImage;
      // "https://firebasestorage.googleapis.com/v0/b/store-image-b8b45.appspot.com/o/images%2F8ts20a003-sr133-s.jpg?alt=media&token=007b9995-2db9-45d6-b116-8b49d0e55f38";
      setBackgroundFromDataUrl(blueprintImageUrl, outerSize);

      if (
        blueprint.designInfos &&
        blueprint.designInfos.length !== 0 &&
        blueprint.designInfos[0].key !== ""
      )
        reverseDesigns(blueprint);
    }
  }, [placeHolder]);

  return (
    <div className="row h-81">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
        <div className="outer position-relative">
          <canvas id="canvas" className="center-block"></canvas>
        </div>
      </div>

      <div className="col-lg-3 d-md-none d-lg-block border-start px-0 overflow-y-scroll h-full">
        <div className=" d-flex flex-column">
          <div className="p-3 ">
            {controlData.isSetImage ||
            controlData.isEmpty ||
            controlData.isLoadingImage ? (
              <EmptyTable addNewRect={addNewRect} addNewText={addNewText} />
            ) : (
              <Table
                addNewRect={addNewRect}
                deleteImage={deleteImage}
                chooseDesign={chooseDesign}
                cloneDesign={cloneDesign}
                align={align}
                setDesignLocation={setDesignLocation}
                changeFont={changeFont}
                changeTextColor={changeTextColor}
                changeText={changeText}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
