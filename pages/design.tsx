import { useRouter } from "next/router";
import * as React from "react";
import { fabric } from "fabric";
import Table from "@/components/common/table";
import { nanoid } from "nanoid";
import Script from "next/script";
import $ from "jquery";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

export interface info {
  angle: number;
}

const initplaceHolder = (width: number, height: number): fabric.Canvas => {
  // const ratio = placeHolder.getWidth() / placeHolder.getHeight();
  const tmpplaceHolder = new fabric.Canvas("placeHolder", {
    height: height / 1.5,
    width: width / 1.5,
    backgroundColor: "white",
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
    screen.width >= 922 ? (screen.width / 12) * 7 : screen.width;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [placeHolder, setplaceHolder] = React.useState<fabric.Canvas>();
  React.useEffect(() => {
    setplaceHolder(initplaceHolder(450, 510));
  const pageHeight = 1020;
  const defaultWidth = 929;
  const router = useRouter();
  const [placeHolder, setplaceHolder] = React.useState<fabric.Canvas>();
  React.useEffect(() => {
    setplaceHolder(initplaceHolder(800, 800));
  }, []);
  const resizeplaceHolder = () => {
    if (placeHolder) {
      const outerplaceHolderContainer = $(".outer")[0];
      // const outerHeight = outerplaceHolderContainer.clientHeight;
      // const outerWidth = outerplaceHolderContainer.clientWidth;

      const ratio = placeHolder.getWidth() / placeHolder.getHeight();
      const containerWidth = outerplaceHolderContainer.clientWidth;
      const containerHeight = outerplaceHolderContainer.clientHeight;
      const scale = containerWidth / 3.6 / placeHolder.getWidth();
      const zoom = placeHolder.getZoom() * scale;

      placeHolder.setDimensions({
        width: containerWidth / 3.6,
        height: containerWidth / 3.6 / ratio,
      });
      placeHolder.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
      const node = placeHolder.getElement();
      node.style.left = (containerWidth - placeHolder.getWidth()) / 2 + "px";
      node.style.top = (containerHeight - placeHolder.getHeight()) / 2.2 + "px";
    }
  };
  $(window).resize(resizeplaceHolder);

      placeHolder.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
      placeHolder.setWidth(containerWidth / 3.6);
      placeHolder.setHeight(containerWidth / 3.6 / ratio);
      const wrapper = document.getElementById("placeHolder");
      if (wrapper) {
        wrapper.style.left =
          (containerWidth - placeHolder.getWidth()) / 2 + "px";
        wrapper.style.top =
          (containerHeight - placeHolder.getHeight()) / 2.2 + "px";
        wrapper.style.width = placeHolder.getWidth() + "px";
      }
      placeHolder.renderAll();
      placeHolder.calcOffset();
    }
  };
  // $(window).resize(resizeplaceHolder);

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
        }
      });
      const node = placeHolder.getElement();
      node.style.left = (defaultWidth - placeHolder.getWidth()) / 2 + "px";
      node.style.top = (pageHeight - placeHolder.getHeight()) / 2.2 + "px";
    }

    console.log("cccccccc");
      // const wrapper = document.getElementById("placeHolder");
      // //this is the canvas that I want to put the image on
      // if (wrapper) {
      //   wrapper.style.left = (defaultWidth - placeHolder.getWidth()) / 2 + "px";
      //   wrapper.style.top = (pageHeight - placeHolder.getHeight()) / 2.2 + "px";
      //   wrapper.style.width = placeHolder.getWidth() + "px";
      //   console.log((defaultWidth - placeHolder.getWidth()) / 2 + "px");
      // }
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
        placeHolder.renderAll();
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
      // placeHolder.add(imgInstance);

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
      // placeHolder.renderAll();
      // console.log(placeHolder, 'placeHolderss');
      // fabric.Image.fromURL(imgUrl, (image: fabric.Image) => {
      //   // image.set("name", newName);
      //   // image.set("left", 100);
      //   // image.set("top", 100);
      //   // image.set("angle", 0);
      //   // image.set("opacity", 100);
      //   // image.transparentCorners = false;
      //   // image.centeredScaling = true;
      //   // image.scaleToWidth(170);
      //   // image.scaleToHeight(200);
      //   // placeHolder.add(image);

      //   const designInfo = {
      //     key: newName,
      //     rotate: 0,
      //     width: 150,
      //     height: 120,
      //     scale: 0.3,
      //     left: 150,
      //     top: 200,
      //   };
      //   dispatch(addDesignInfo({ ...designInfo }));

      //   placeHolder.renderAll();
      // }

      // );

      placeHolder.add(
        new fabric.Rect({
          left: 100,
          top: 100,
          fill: "red",
          width: 20,
          height: 20,
          angle: 45,
        })
      );
      placeHolder.renderAll();
    }
  };

  const alignLeft = () => {};

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div
          className="col-lg-7 col-12 mt-4 mt-sm-0 p-0 outer h-screen"
          style={{
            backgroundImage: `url("https://www.xfanzexpo.com/wp-content/uploads/2019/11/t-shirt-template-design-t-shirt-template-this-is-great-with-blank-t-shirt-outline-template.jpg")`,
          }}
        >
          {/* <div id="wrapper"> */}
          <canvas id="placeHolder" className="center-block"></canvas>
          {/* </div> */}
        </div>
        <div className="col-lg-5 d-md-none d-lg-block">
          <Table addRect={addRect} />
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
