import { useRouter } from "next/router";
import * as React from "react";
import { fabric } from "fabric";
import Table from "@/components/common/table";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { setValue, addDesignInfo } from "@/redux/slices/design";
import { nanoid } from "nanoid";
import Script from "next/script";
import $ from "jquery";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

export interface info {
  angle: number;
}

const getCenterData = (
  imgWidth: number,
  imgHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  let widthAspectRatio = maxWidth / imgWidth;
  let heightAspectRatio = maxHeight / imgHeight;

  let finalAspectRatio = Math.min(widthAspectRatio, heightAspectRatio);

  let finalHeight = imgHeight * finalAspectRatio;
  let finalWidth = imgWidth * finalAspectRatio;

  let imgTop = 0;
  if (maxHeight > finalHeight) {
    imgTop = (Math.round(maxHeight) - Math.round(finalHeight)) / 2;
  }

  let imgLeft = 0;
  if (maxWidth > finalWidth) {
    imgLeft = (Math.round(maxWidth) - Math.round(finalWidth)) / 2;
  }
  return {
    imgTop: imgTop,
    imgLeft: imgLeft,
    finalWidth: finalWidth,
    finalHeight: finalHeight,
  };
};

const initCanvas = (): fabric.Canvas => {
  const outerCanvasContainer = $(".outer")[0];

  // const ratio = canvas.getWidth() / canvas.getHeight();
  const containerWidth = outerCanvasContainer.clientWidth;
  const containerHeight = outerCanvasContainer.clientHeight;
  const tmpCanvas = new fabric.Canvas("canvas", {
    height: containerHeight,
    width: containerWidth,
    backgroundColor: "white",
  });
  return tmpCanvas;
};
export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [placeHolder, setPlaceHolder] = React.useState<fabric.Canvas>();
  const w_scale = 2.8;
  const h_scale = 2.4;
  const ratio = 1.2;
  React.useEffect(() => {
    setCanvas(initCanvas());
  }, []);
  const setBackgroundFromDataUrl = (
    dataUrl: string,
    outerSize: { outerWidth: number; outerHeight: number }
  ) => {
    if (!dataUrl && !outerSize) {
      return true;
    }

    if (canvas) {
      fabric.Image.fromURL(dataUrl, (image: fabric.Image) => {
        const { imgLeft, imgTop, finalHeight, finalWidth } = getCenterData(
          image.width || 100,
          image.height || 150,
          outerSize.outerWidth,
          outerSize.outerHeight
        );
        image.set("left", imgLeft);
        image.set("top", imgTop);
        image.set("angle", 0);
        image.set("opacity", 100);
        image.transparentCorners = false;
        image.centeredScaling = true;
        image.scaleToHeight(finalHeight);
        image.scaleToWidth(finalWidth);
        canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
        console.log(canvas, "canvasss");
      });
    }
  };
  const resizeCanvas = () => {
    const outerCanvasContainer = $(".outer")[0];
    const outerWidth = outerCanvasContainer.clientWidth;
    const outerHeight = outerCanvasContainer.clientHeight;
    const outerSize = {
      outerWidth,
      outerHeight,
    };
    const blueprintImageUrl =
      "https://www.xfanzexpo.com/wp-content/uploads/2019/11/t-shirt-template-design-t-shirt-template-this-is-great-with-blank-t-shirt-outline-template.jpg";
    setBackgroundFromDataUrl(blueprintImageUrl, outerSize);
  };
  $(window).resize(resizeCanvas);

  const [selectedShapeKey, setSelectedShapeKey] = React.useState("");

  React.useEffect(() => {
    if (canvas) {
      canvas.on("object:moving", function (options) {
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
      const outerCanvasContainer = $(".outer")[0];
      const containerWidth = outerCanvasContainer.clientWidth;
      const containerHeight = outerCanvasContainer.clientHeight;
      const outerSize = {
        outerWidth: 1020,
        outerHeight: 760,
      };
      const blueprintImageUrl =
        "https://www.xfanzexpo.com/wp-content/uploads/2019/11/t-shirt-template-design-t-shirt-template-this-is-great-with-blank-t-shirt-outline-template.jpg";
      setBackgroundFromDataUrl(blueprintImageUrl, outerSize);
      new fabric.Rect({
        left: 100,
        top: 50,
        fill: "yellow",
        width: 200,
        height: 100,
        objectCaching: false,
        stroke: "lightgreen",
        strokeWidth: 4,
      });
    }

    console.log("cccccccc");
  }, [canvas]);

  const addRect = (imgUrl: string) => {
    if (canvas) {
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
        canvas.add(image);
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
        canvas.renderAll();
        console.log(canvas, "canvasss");
      });
      //   {
      // 	name: newName,
      // 	left: 100,
      // 	top: 100,
      // 	angle: 30,
      // 	opacity: 0.85,
      // 	transparentCorners: false,
      // 	centeredScaling: true,
      // }
      // const imgInstance = new fabric.Rect({
      // 	left: 100,
      // 	top: 100,
      // 	fill: 'red',
      // 	width: 20,
      // 	height: 20,
      // 	angle: 45,
      // });

      // imgInstance.scaleToWidth(170);
      // imgInstance.scaleToHeight(200);
      // canvas.add(imgInstance);

      // const designInfo = {
      // 	key: newName,
      // 	rotate: 0,
      // 	width: 150,
      // 	height: 120,
      // 	scale: 0.3,
      // 	left: 150,
      // 	top: 200,
      // };
      // dispatch(addDesignInfo({ ...designInfo }));
      // canvas.renderAll();
      // console.log(canvas, 'canvasss');
    }
  };

  const alignLeft = () => {};

  return (
    <div className="flex h-screen flex-wrap bg-red-400 min-height-[300px]">
      <div className="w-full h-screen  flex flex-row justify-center items-center outer max-w-5xl">
        <canvas id="canvas" className="relative top-96"></canvas>
      </div>
      <div className=" border-b-2 border-gray-400 my-8 mx-4 w-[800px] order-last ">
        <div className="flex flex-row flex-wrap flex-grow mt-2">
          <div className="w-full p-3">
            {/*Table Card*/}
            <Table addRect={addRect} />
          </div>
        </div>
      </div>
    </div>
  );
}
//  export async function getServerSideProps() {
// return {
// 		props: {},
// 	};
// }
