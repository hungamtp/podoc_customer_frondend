import LoadingPrompt from "@/components/common/loadingPrompt";
import DesignCanvas from "@/components/design/design-canvas";
import DesignHeaderLeft from "@/components/design/design-header-left";
import PreviewCanvas from "@/components/design/preview-canvas";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import useGetBlueprintByProduct from "@/hooks/api/design/use-get-blueprint-by-product";
import useGetColorsByFactoryAndProductId from "@/hooks/api/design/use-get-colors-by-factoryId-productId";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { resetDesigns } from "@/redux/slices/design";
import { resetControl } from "@/redux/slices/designControl";
import { clearAllPreview } from "@/redux/slices/previews";
import { resetColors } from "@/redux/slices/selectedColors";
import { getBase64FromUrl } from "helper/files-utils";
import { useRouter } from "next/router";
import * as React from "react";
import { Blueprint } from "../models";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { productId, factoryId } = router.query;
  const { data: blueprints, isLoading: isLoading } = useGetBlueprintByProduct(
    productId as string
  );
  const storage = globalThis?.sessionStorage;
  const prev = storage.getItem("prevPath");

  const [renderBlueprint, setRenderBlueprint] = React.useState<Blueprint[]>([]);
  const [isLoadedBlueprints, setIsLoadedBlueprint] =
    React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState(true);

  React.useEffect(() => {
    console.log(isEdit, "isEdit");
    if (isEdit === true) dispatch(resetColors());
  }, [isEdit]);
  const position = useAppSelector((state) => state.blueprintsData.position);

  const renderedBlueprints = blueprints;

  const openPreview = () => {
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      if (url !== "/login") {
        dispatch(setChoosenKey(""));
        dispatch(clearAllPreview());
        dispatch(resetColors());
        dispatch(resetControl());
        dispatch(resetDesigns());
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  React.useEffect(() => {
    let isLoaded = true;
    if (renderBlueprint && blueprints) {
      renderBlueprint?.forEach((renderedBlueprint) => {
        if (
          !renderedBlueprint.tmpFrameImage ||
          renderBlueprint.length < blueprints.length
        )
          isLoaded = false;
      });

      setIsLoadedBlueprint(isLoaded);
    }
  }, [renderBlueprint]);

  //Để cả trang đợi 1 state, ta cần phải tạo 1 state (phụ thuộc vào state gốc) - sẽ đợi state gốc load xong thì mới cập nhật trang thái thành renderable

  const designCanvas =
    renderedBlueprints &&
    renderedBlueprints.map(
      (blueprint) =>
        position === blueprint.position && (
          <DesignCanvas openPreview={openPreview} setIsEdit={setIsEdit} />
        )
    );

  const { data: colors, isLoading: isLoadingColors } =
    useGetColorsByFactoryAndProductId(factoryId as string, productId as string);

  React.useEffect(() => {
    if (blueprints) {
      if (prev !== "/login")
        blueprints.forEach((blueprint, index) => {
          getBase64FromUrl(blueprint.frameImage).then((tmpImageSrc) => {
            setRenderBlueprint((state) => [
              ...state,
              { ...blueprint, tmpFrameImage: tmpImageSrc },
            ]);
          });
        });
      else {
        setIsLoadedBlueprint(true);
      }
    }
  }, [blueprints]);

  React.useEffect(() => {
    if (renderBlueprint.length === blueprints?.length) {
      let front = renderBlueprint[0];
      let back = renderBlueprint[0];
      renderBlueprint.forEach((blueprint) => {
        if (blueprint.position === "front") front = blueprint;
      });
      renderBlueprint.forEach((blueprint) => {
        if (blueprint.position === "back") back = blueprint;
      });
      dispatch(
        updateBlueprint({
          position: "front",
          blueprints: [front, back],
        })
      );
    }
  }, [renderBlueprint]);

  const [isPreview, setIsPreview] = React.useState(false);

  return (
    <div className="container-fluid ">
      {isLoadedBlueprints && colors ? (
        <>
          <DesignHeaderLeft
            openPreview={openPreview}
            closePreview={closePreview}
            isPreview={isPreview}
            isEditPage={false}
          />

          {isPreview ? (
            <PreviewCanvas
              isEditPage={false}
              colors={colors}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          ) : (
            designCanvas
          )}
        </>
      ) : (
        <LoadingPrompt />
      )}
    </div>
  );
}
