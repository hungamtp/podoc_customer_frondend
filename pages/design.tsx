import DesignCanvas from "@/components/design/design-canvas";
import DesignFooterLeft from "@/components/design/design-footer-left";
import DesignHeaderLeft from "@/components/design/design-header-left";
import PreviewCanvas from "@/components/design/preview-canvas";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import useGetBlueprintByProduct from "@/hooks/api/design/use-get-blueprint-by-product";
import useGetColorsByFactoryAndProductId from "@/hooks/api/design/use-get-colors-by-factoryId-productId";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { nanoid } from "@reduxjs/toolkit";
import { getBase64FromUrl } from "helper/files-utils";
import { forEach } from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import { Blueprint } from "../models";
// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface AboutPageProps {}

const blueprintInit = [
  {
    frameImage:
      "https://firebasestorage.googleapis.com/v0/b/assign…=media&token=c6307725-741f-477b-b01f-97407f61cb61",
    tmpFrameImage:
      "https://firebasestorage.googleapis.com/v0/b/assign…=media&token=c6307725-741f-477b-b01f-97407f61cb61",
    position: "Front",
    placeholder: {
      width: 15,
      height: 17,
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
  },

  {
    frameImage:
      "https://bizweb.dktcdn.net/100/364/712/products/021204.jpg?v=1635825038117",
    tmpFrameImage:
      "https://firebasestorage.googleapis.com/v0/b/assign…=media&token=c6307725-741f-477b-b01f-97407f61cb61",
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
  },
] as Blueprint[];

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { productId, factoryId } = router.query;
  const { data: blueprints, isLoading: isLoading } = useGetBlueprintByProduct(
    productId as string
  );
  const [renderBlueprint, setRenderBlueprint] = React.useState<Blueprint[]>([]);
  const [isLoadedBlueprints, setIsLoadedBlueprint] =
    React.useState<boolean>(false);
  const position = useAppSelector((state) => state.blueprintsData.position);

  const renderedBlueprints = blueprints;

  const openPreview = () => {
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

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
          <DesignCanvas isEdit={false} openPreview={openPreview} />
        )
    );

  const { data: colors, isLoading: isLoadingColors } =
    useGetColorsByFactoryAndProductId(factoryId as string, productId as string);

  React.useEffect(() => {
    if (blueprints) {
      blueprints.forEach((blueprint, index) => {
        getBase64FromUrl(blueprint.frameImage).then((tmpImageSrc) => {
          setRenderBlueprint((state) => [
            ...state,
            { ...blueprint, tmpFrameImage: tmpImageSrc },
          ]);
        });
      });
    }
  }, [blueprints]);

  React.useEffect(() => {
    if (renderBlueprint.length === blueprints?.length)
      dispatch(
        updateBlueprint({
          position: renderBlueprint[0].position,
          blueprints: renderBlueprint,
        })
      );
  }, [renderBlueprint]);

  const [isPreview, setIsPreview] = React.useState(false);

  return (
    <div className="container-fluid ">
      {isLoadedBlueprints ? (
        <>
          <DesignHeaderLeft
            openPreview={openPreview}
            closePreview={closePreview}
            isPreview={isPreview}
          />

          {isPreview ? (
            <PreviewCanvas isEditPage={false} colors={colors} />
          ) : (
            designCanvas
          )}
        </>
      ) : (
        <div id="preloader">
          <div id="status">
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
