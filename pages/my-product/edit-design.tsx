import DesignCanvas from "@/components/design/design-canvas";
import DesignHeaderLeft from "@/components/design/design-header-left";
import PreviewCanvas from "@/components/design/preview-canvas";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { DesignControl } from "@/components/layouts/design-control";
import useGetColorsByFactoryAndProductId from "@/hooks/api/design/use-get-colors-by-factoryId-productId";
import useGetDesignById from "@/hooks/api/design/use-get-design-by-id";
import { Blueprint } from "@/models/design";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { resetDesigns, updateDesignInfos } from "@/redux/slices/design";
import { resetControl, setControlData } from "@/redux/slices/designControl";
import { resetIsDesignInvalid } from "@/redux/slices/designInValid";
import { setDesignedProductInfo } from "@/redux/slices/designProductInfo";
import { clearAllPreview } from "@/redux/slices/previews";
import { resetColors, setColors } from "@/redux/slices/selectedColors";
import { getBase64FromUrl } from "helper/files-utils";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as React from "react";

// import dynamic from 'next/dynamic';

// const Header = dynamic(() => import('@/components/common/main-header'), { ssr: false });

export interface EditDesignProps {}

const blueprintInit = [
  {
    frameImage:
      "https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/March2022/6-0_55.jpg",
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
      "https://media.coolmate.me/cdn-cgi/image/quality=80/uploads/March2022/15-0.jpg",
    position: "arm",
    placeholder: {
      width: 14,
      height: 16,
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

export default function EditDesign(props: EditDesignProps) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { designId } = router.query;
  const { data: response, isLoading: isLoading } = useGetDesignById(
    designId as string
  );
  const [submitPreview, setSubmitPreview] = React.useState<Blueprint[]>();
  const { data: colors, isLoading: isLoadingColors } =
    useGetColorsByFactoryAndProductId(response?.factoryId, response?.productId);
  const position = useAppSelector((state) => state.blueprintsData.position);
  const [isEdit, setIsEdit] = React.useState(true);
  React.useEffect(() => {
    if (isEdit === true) dispatch(resetColors());
  }, [isEdit]);

  const blueprints = response?.bluePrints;

  const [renderBlueprint, setRenderBlueprint] = React.useState<Blueprint[]>([]);
  const [isLoadedBlueprints, setIsLoadedBlueprint] =
    React.useState<boolean>(false);

  const [isPreview, setIsPreview] = React.useState(false);

  const openPreview = () => {
    setIsPreview(true);
  };

  const closePreview = () => {
    setIsPreview(false);
  };

  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      dispatch(setChoosenKey(""));
      dispatch(clearAllPreview());
      dispatch(resetColors());
      dispatch(resetControl());
      dispatch(resetDesigns());
      dispatch(resetIsDesignInvalid());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const designCanvas =
    blueprints &&
    blueprints.map(
      (blueprint) =>
        position === blueprint.position && (
          <DesignCanvas openPreview={openPreview} setIsEdit={setIsEdit} />
        )
    );

  React.useEffect(() => {
    if (response) {
      dispatch(
        setDesignedProductInfo({
          id: response.id,
          name: response.name,
          description: response.description,
          designedPrice: response.designedPrice,
        })
      );
      const colorsList = response.colorsObj.map((color) => color.image);
      dispatch(setColors(colorsList));

      if (blueprints && blueprints.length > 0) {
        const renderBlueprint = [...blueprints];
        const allTasks: Promise<void>[] = [];
        renderBlueprint.forEach((blueprint, index) => {
          if (!!blueprint.designInfos && blueprint.designInfos.length !== 0) {
            blueprint.designInfos.forEach((designInfo, index) => {
              if (designInfo.types !== "text") {
                const loadDesignInfo = getBase64FromUrl(designInfo.src).then(
                  (tmpSrc) => {
                    if (blueprint.designInfos) {
                      blueprint.designInfos[index].tmpSrc = tmpSrc;
                    }
                  }
                );
                allTasks.push(loadDesignInfo);
              }

              designInfo.key = nanoid();
            });
          }

          const loadBlueprint = getBase64FromUrl(blueprint.frameImage).then(
            (tmpImageSrc) => {
              blueprint.tmpFrameImage = tmpImageSrc;
            }
          );
          allTasks.push(loadBlueprint);
        });
        Promise.all(allTasks).then((final) => {
          let front = renderBlueprint[0];
          let back = renderBlueprint[0];
          renderBlueprint.forEach((blueprint) => {
            if (blueprint.position === "front") front = blueprint;
          });
          renderBlueprint.forEach((blueprint) => {
            if (blueprint.position === "back") back = blueprint;
          });

          setRenderBlueprint([front, back]);
        });
      }
    }
  }, [response]);

  React.useEffect(() => {
    if (blueprints && renderBlueprint.length === blueprints.length) {
      setIsLoadedBlueprint(true);

      let displayBlueprint = renderBlueprint[0];
      renderBlueprint.forEach((blueprint) => {
        if (blueprint.position === "front") {
          displayBlueprint = blueprint;
        }
      });

      dispatch(
        updateBlueprint({
          position: "front",
          blueprints: renderBlueprint,
        })
      );

      if (
        renderBlueprint[0].designInfos &&
        renderBlueprint[0].designInfos.length > 0
      ) {
        dispatch(
          setControlData({
            isSetImage: false,
            isChooseImage: true,
            isEmpty: false,
          })
        );
        dispatch(
          updateDesignInfos({
            isEmpty: false,
            designInfos: displayBlueprint.designInfos,
          })
        );
      } else {
        dispatch(
          setControlData({
            isSetImage: false,
            isChooseImage: false,
            isEmpty: true,
          })
        );
        dispatch(
          updateDesignInfos({
            isEmpty: true,
            designInfos: renderBlueprint[0].designInfos,
          })
        );
      }
    }
  }, [renderBlueprint]);

  return (
    <div className="container-fluid ">
      {isLoadedBlueprints && colors && response ? (
        <>
          <DesignHeaderLeft
            openPreview={openPreview}
            closePreview={closePreview}
            isPreview={isPreview}
            isEditPage={true}
          />

          {isPreview ? (
            <PreviewCanvas
              isEditPage={true}
              colors={colors}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
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

EditDesign.Layout = DesignControl;
