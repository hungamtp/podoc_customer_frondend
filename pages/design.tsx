import { useRouter } from "next/router";
import * as React from "react";
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
import DesignCanvas from "@/components/design/design-canvas";
import { Blueprint } from "../models";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

const blueprintInit = [
  {
    frame_image:
      "https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/March2022/6-0_55.jpg",
    position: "front",
    placeHolder: {
      width: 4500,
      height: 5100,
    },
  },
  {
    frame_image:
      "https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/March2022/15-0.jpg",
    position: "front",
    placeHolder: {
      width: 4200,
      height: 4800,
    },
  },
  {
    frame_image:
      "https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117",
    position: "front",
    placeHolder: {
      width: 3600,
      height: 4110,
    },
  },
] as Blueprint[];

export default function AboutPage(props: AboutPageProps) {
  const [blueprintList, setBlueprintList] =
    React.useState<Blueprint[]>(blueprintInit);

  const openPreview = () => {
    // if (placeHolder) {
    //   const placeHolderNode = placeHolder.getElement();
    //   placeHolderNode.style.borderWidth = "1px";
    //   placeHolderNode.style.borderColor = "rgba(1,1,1,0.3)".replace(
    //     /[^,]+(?=\))/,
    //     "0.5"
    //   );
    //   placeHolder._objects.forEach((obj) => {
    //     obj.set("selectable", false);
    //   });
    //   placeHolder.discardActiveObject().renderAll();
    // }
  };

  const closePreview = () => {
    // if (placeHolder) {
    //   const placeHolderNode = placeHolder.getElement();
    //   placeHolder._objects.forEach((obj) => {
    //     obj.set("selectable", true);
    //   });
    //   placeHolderNode.style.borderStyle = "dashed";
    //   placeHolderNode.style.borderColor = "white";
    //   placeHolderNode.style.borderWidth = "1px";
    // }
  };

  return (
    <div className="container-fluid ">
      <div className="align-items-center">
        <DesignHeaderLeft
          openPreview={openPreview}
          closePreview={closePreview}
        />
        <DesignCanvas />
        <DesignFooterLeft />
      </div>
    </div>
  );
}
