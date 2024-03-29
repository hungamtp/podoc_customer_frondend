import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { Blueprint, DesignState } from "@/models/design";
import { setControlData } from "@/redux/slices/designControl";
import { addPreview, clearAllPreview, Preview } from "@/redux/slices/previews";
import { Dialog, DialogContent } from "@material-ui/core";
import { fabric } from "fabric";
import { useRouter } from "next/router";
import * as React from "react";
import CreateDesignedProductForm from "./designed-product-info";
import EditDesignForm from "./edit-design";
import PreviewFooter from "./preview-footer";
import PreviewTable from "./preview-table";
export interface IPreviewCanvasProps {
  colors: {
    id: string;
    name: string;
    image: string;
  }[];
  isEditPage: boolean;
  setIsEdit: (isEdit: boolean) => void;
  isEdit: boolean;
}

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
    selection: false,
  });
  return tmpCanvas;
};
const initPlaceHolder = (
  placeHolderWidth: number,
  placeHolderHeight: number,
  placeHolderTop: number,
  containerHeight: number,
  containerWidth: number
): fabric.Rect => {
  const newHeight = placeHolderHeight;
  const newWidth = placeHolderWidth;
  const left = (containerWidth - newWidth) / 2;
  const top = placeHolderTop;

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

export default function PreviewCanvas({
  colors,
  isEditPage,
  setIsEdit,
  isEdit,
}: IPreviewCanvasProps) {
  const router = useRouter();
  const controlData = useAppSelector((state) => state.designControl);

  const [isDrawPreview, setIsDrawPreview] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const auth = useAppSelector((state) => state.auth);

  const blueprintsData = useAppSelector((state) => state.blueprintsData);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    if (!(auth.roleName === "USER")) router.push("/login");
    else setIsOpen(true);
  };

  const selectedColors = useAppSelector((state) => state.selectedColors);

  const previews = useAppSelector((state) => state.previews);

  let renderedPreviews: Preview[] = [];
  previews.forEach((preview) => {
    if (preview.color === renderColor) {
      renderedPreviews.push(preview);
    }
  });
  if (renderedPreviews.length === 0 && previews.length !== 0)
    renderedPreviews = [previews[0], previews[1]];

  const [renderedPosition, setRenderedPosition] = React.useState("front");

  const [renderCount, setRenderCount] = React.useState(
    isEdit ? blueprintsData.blueprints.length - 1 : 0
  );

  const blueprint = blueprintsData.blueprints[renderCount];

  const dispatch = useAppDispatch();

  const [renderColor, setRenderColor] = React.useState(colors[0].image);
  const previewsCount = React.useRef<number>(isEdit ? 0 : previews.length);

  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [placeHolder, setPlaceHolder] = React.useState<fabric.Rect>();

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
          const colorFilter = new fabric.Image.filters.BlendColor({
            color: renderColor,
            mode: "add",
            alpha: 0.75,
          });
          image.scaleToHeight(outerHeight);
          image.set("top", 0);
          canvas.centerObject(image);
          if (isNeedColor) image.filters?.push(colorFilter);
          image.applyFilters();
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
          // canvas.clipPath = image;
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  React.useEffect(() => {
    const rerenderLoop = setInterval(() => {
      const defaultWidth = document.getElementById("outer")?.clientWidth;
      const defaultHeight = document.getElementById("outer")?.clientHeight;
      if (defaultWidth && defaultHeight) {
        setCanvas(initCanvas(defaultWidth, defaultHeight, "preview"));
        clearInterval(rerenderLoop);
      }
    }, 200);
    if (isEdit) {
      dispatch(clearAllPreview());
    }

    return () => {
      clearInterval(rerenderLoop);
      setIsEdit(false);
      canvas?.clear();
    };
  }, []);

  React.useEffect(() => {
    if (previews.length === previewsCount.current + 2 && renderCount === 0) {
      //tim if se tao ra action => de check xem condition da dung chua
      const tmpControlData = {
        ...controlData,
        isLoadingImage: false,
      };
      dispatch(setControlData(tmpControlData));
      previewsCount.current = previews.length;
    }
  }, [previews]);

  React.useEffect(() => {
    let hasMorePreview = true;

    if (previews.length > 0) {
      previews.forEach((preview) => {
        if (preview.color === renderColor) {
          hasMorePreview = false;
        }
      });
    }

    if (renderColor && canvas) {
      if (hasMorePreview) {
        const tmpControlData = {
          ...controlData,
          isLoadingImage: true,
        };
        dispatch(setControlData(tmpControlData));
        setRenderCount(blueprintsData.blueprints.length - 1);
      } else {
        canvas.clear();
        let renderImage = previews[0].imageSrc;
        previews.forEach((preview) => {
          if (
            preview.color === renderColor &&
            preview.position === renderedPosition
          ) {
            renderImage = preview.imageSrc;
          }
        });

        if (canvas.width && canvas.height) {
          const outerSize = {
            outerWidth: canvas.width,
            outerHeight: canvas.height,
          };

          setBackgroundFromDataUrl(renderImage, outerSize, false);
        }
        const tmpControlData = {
          ...controlData,
          isLoadingImage: false,
        };
        dispatch(setControlData(tmpControlData));
      }
    }

    setIsDrawPreview(true);
  }, [renderColor]);

  React.useEffect(() => {
    if (!!selectedColors) {
      let keep = true;
      const renderedColorList = previews.map((preview) => preview.color);
      for (let index = 0; index < selectedColors.length && keep; index++) {
        if (!renderedColorList.includes(selectedColors[index])) {
          keep = false;
          setRenderColor(selectedColors[index]);
          const tmpControlData = {
            ...controlData,
            isLoadingImage: true,
          };
          dispatch(setControlData(tmpControlData));
        }
      }
    }
  }, [selectedColors]);

  React.useEffect(() => {
    if (canvas && previews.length !== 0 && canvas.width && canvas.height) {
      canvas.clear();
      const renderedImage = previews.filter(
        (preview) =>
          preview.color === renderColor && preview.position === renderedPosition
      );
      const outerSize = {
        outerWidth: canvas.width,
        outerHeight: canvas.height,
      };
      setBackgroundFromDataUrl(renderedImage[0].imageSrc, outerSize, false);
    }
  }, [renderedPosition]);

  React.useEffect(() => {
    let hasMorePreview = true;
    let count = 0;

    if (previews.length > 0 && !isEdit) {
      previews.forEach((preview) => {
        if (preview.color === renderColor) {
          count++;
          if (count === 2) hasMorePreview = false;
        }
      });
    }

    if (previews.length === previewsCount.current && renderCount === 0) {
      const tmpControlData = {
        ...controlData,
        isLoadingImage: false,
      };
      dispatch(setControlData(tmpControlData));
    }

    if (canvas && hasMorePreview && canvas.width && canvas.height) {
      canvas.clear();
      setPlaceHolder(
        initPlaceHolder(
          (canvas.height / 100) * blueprint.placeholder.widthRate,
          (canvas.height / 100) * blueprint.placeholder.heightRate,
          (canvas.height / 100) * blueprint.placeholder.top,
          canvas.height,
          canvas.width
        )
      );
    }

    if (canvas && !hasMorePreview && canvas.width && canvas.height) {
      canvas.clear();
      const renderedImage = previews.filter((preview) => {
        return (
          preview.color === renderColor && preview.position === renderedPosition
        );
      });
      const outerSize = {
        outerWidth: canvas.width,
        outerHeight: canvas.height,
      };

      setBackgroundFromDataUrl(renderedImage[0].imageSrc, outerSize, false);
    }

    const rerenderLoop = setInterval(() => {
      if (canvas && imgSrc === "") {
        const canvasObjs = canvas._objects || [];
        if (blueprint.designInfos) {
          if (
            canvasObjs.length === blueprint.designInfos.length + 1 &&
            canvasObjs.some((design) => {
              if (blueprint.designInfos && blueprint.designInfos.length > 0)
                return design.name === blueprint.designInfos[0].key;
              else return true;
            })
          ) {
            clearInterval(rerenderLoop);
            setImgSrc(
              canvas.toDataURL({
                format: "png",
                multiplier: 2,
              })
            );
          }
        } else {
          setImgSrc(
            canvas.toDataURL({
              format: "png",
              multiplier: 2,
            })
          );
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
    let hasMorePreview = true;
    let count = 0;

    if (previews.length > 0 && !isEdit) {
      previews.forEach((preview) => {
        if (preview.color === renderColor) {
          count++;
          if (count === 2) hasMorePreview = false;
        }
      });
    }
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
      } else if (!!selectedColors) {
        let keep = true;
        const renderedColorList = previews.map((preview) => preview.color);
        for (let index = 0; index < selectedColors.length && keep; index++) {
          if (!renderedColorList.includes(selectedColors[index])) {
            keep = false;
            setRenderColor(selectedColors[index]);
          }
        }
      }
      setImgSrc("");
    }
  }, [imgSrc]);

  React.useEffect(() => {
    let hasMorePreview = true;
    let count = 0;

    if (previews.length > 0 && !isEdit) {
      previews.forEach((preview) => {
        if (preview.color === renderColor) {
          count++;
          if (count === 2) hasMorePreview = false;
        }
      });
    }
    if (canvas && placeHolder && hasMorePreview) {
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
    if (canvas && placeHolder && canvas.width && canvas.height) {
      const outerSize = {
        outerWidth: canvas.width,
        outerHeight: canvas.height,
      };

      const blueprintImageUrl = blueprint.tmpFrameImage;
      setBackgroundFromDataUrl(blueprintImageUrl, outerSize, true);

      const designInfos = blueprint.designInfos;
      if (designInfos && designInfos.length > 0) {
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
      if (key === "width") {
        data =
          (value / blueprint.placeholder.width) * placeHolder.getScaledWidth();
      }

      if (key === "height")
        data =
          (value / blueprint.placeholder.height) *
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
      const imageHeight = reverseData("height", design.height);
      if (design.types === "text") {
        const newText = new fabric.Text(design.src, {
          fontFamily: design.font,
          clipPath: placeHolder,
          name: design.key,
          left: imageLeft,
          top: imageTop,
          selectable: false,
          centeredScaling: true,
          transparentCorners: true,
          fill: design.textColor,
        }).setControlsVisibility({
          mt: false, // middle top disable
          mb: false, // midle bottom
          ml: false, // middle left
          mr: false, // I think you get it
        });
        newText.scaleToWidth(imageWidth || 150);
        newText.set("angle", design.rotate);

        canvas.add(newText);
        canvas.renderAll();
      } else {
        fabric.Image.fromURL(
          design.tmpSrc,
          (image: fabric.Image) => {
            image.set("name", design.key);
            image.set("left", imageLeft);
            image.set("top", imageTop);

            image.set("opacity", 100);
            image.set("noScaleCache", true);
            image.set("clipPath", placeHolder);
            image.set("selectable", false);
            image.scaleToWidth(imageWidth || 150);
            image.set("angle", design.rotate);
            canvas.add(image);
            canvas.renderAll();
          },
          { crossOrigin: "anonymous" }
        );
      }
    }
  };

  return (
    <>
      <div className="row h-81">
        <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
          <div className="outer position-relative" id="outer">
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

      <div
        className={` ${
          controlData.controlData.isLoadingImage && "loadingsScreen"
        }`}
      >
        <svg
          className={` ${
            !controlData.controlData.isLoadingImage && "d-none"
          } spinner`}
          viewBox="0 0 50 50"
        >
          <circle
            className="path"
            cx={25}
            cy={25}
            r={20}
            fill="none"
            strokeWidth={5}
          />
        </svg>
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
      <div className="row h-8 ">
        <PreviewFooter
          setRenderedPosition={setRenderedPosition}
          renderedPosition={renderedPosition}
        />
        <div className="col-lg-3 d-md-none d-lg-block border-start px-0">
          <div className="d-flex justify-content-center border-top   py-4">
            <div className="d-flex  w-full align-items-center px-4">
              <button
                className="btn btn-secondary w-full"
                disabled={controlData.controlData.isLoadingImage}
                onClick={() => handleOpenDialog()}
              >
                Lưu lại
              </button>
            </div>
          </div>
        </div>
        <Dialog
          open={isOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          disableEnforceFocus
        >
          <DialogContent>
            {isEditPage ? (
              <>
                {!!previews.filter((preview) => {
                  return preview.position === "front";
                })[0] && (
                  <EditDesignForm
                    handleCloseDialog={handleCloseDialog}
                    loadedColors={colors}
                    imagePreviewForm={
                      previews.filter((preview) => {
                        return preview.position === "front";
                      })[0].imageSrc
                    }
                  />
                )}
              </>
            ) : (
              <>
                {!!previews.filter((preview) => {
                  return preview.position === "front";
                })[0] && (
                  <CreateDesignedProductForm
                    handleCloseDialog={handleCloseDialog}
                    loadedColors={colors}
                    imagePreviewForm={
                      previews.filter((preview) => {
                        return preview.position === "front";
                      })[0].imageSrc
                    }
                  />
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
