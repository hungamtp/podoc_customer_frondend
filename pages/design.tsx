import DesignCanvas from "@/components/design/design-canvas";
import DesignFooterLeft from "@/components/design/design-footer-left";
import DesignHeaderLeft from "@/components/design/design-header-left";
import PreviewCanvas from "@/components/design/preview-canvas";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import useGetBlueprintByProduct from "@/hooks/api/design/use-get-blueprint-by-product";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { fabric } from "fabric";
import { IImageOptions, Image } from "fabric/fabric-impl";
import { useRouter } from "next/router";
import * as React from "react";
import { Blueprint } from "../models";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const productId = router.asPath.split("id=")[1];
  const { data: blueprints, isLoading: isLoading } = useGetBlueprintByProduct(
    Number(productId)
  );

  React.useEffect(() => {
    if (blueprints)
      dispatch(
        updateBlueprint({
          position: blueprints[0].position,
          blueprints: blueprints,
        })
      );
  }, [blueprints]);

  const [isPreview, setIsPreview] = React.useState(false);

  const openPreview = () => {
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  return (
    <div className="container-fluid ">
      <>
        <DesignHeaderLeft
          openPreview={openPreview}
          closePreview={closePreview}
          isPreview={isPreview}
        />

        {isPreview ? <PreviewCanvas /> : <DesignCanvas />}
        <DesignFooterLeft />
      </>
    </div>
  );
}
