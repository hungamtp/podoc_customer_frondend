import DesignCanvas from "@/components/design/design-canvas";
import DesignFooterLeft from "@/components/design/design-footer-left";
import DesignHeaderLeft from "@/components/design/design-header-left";
import PreviewCanvas from "@/components/design/preview-canvas";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import useGetBlueprintByProduct from "@/hooks/api/design/use-get-blueprint-by-product";
import useGetDesignById from "@/hooks/api/design/use-get-design-by-id";
import { Blueprint } from "@/models/design";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { resetDesigns, updateDesignInfos } from "@/redux/slices/design";
import { resetControl, setControlData } from "@/redux/slices/designControl";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import * as React from "react";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { clearAllPreview } from "@/redux/slices/previews";
import { resetColors } from "@/redux/slices/selectedColors";

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
  const position = useAppSelector((state) => state.blueprintsData.position);
  const blueprints = response?.bluePrints;

  console.log(blueprints, "blueprintss");

  const renderedBlueprint = blueprints || blueprintInit;

  const designCanvas = renderedBlueprint.map(
    (blueprint) =>
      position === blueprint.position && (
        <DesignCanvas openPreview={openPreview} />
      )
  );

  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      dispatch(setChoosenKey(""));
      dispatch(clearAllPreview());
      dispatch(resetColors());
      dispatch(resetControl());
      dispatch(resetDesigns());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  React.useEffect(() => {
    if (blueprints) {
      blueprints.forEach((blueprint) => {
        blueprint.designInfos?.forEach((designInfo) => {
          designInfo.key = nanoid();
        });
      });
      dispatch(
        updateBlueprint({
          position: blueprints[0].position,
          blueprints: blueprints,
        })
      );

      dispatch(
        updateDesignInfos({
          isEmpty: false,
          designInfos: blueprints[0].designInfos,
        })
      );

      dispatch(
        setControlData({
          isSetImage: false,
          isChooseImage: true,
          isEmpty: false,
        })
      );
    }
  }, [response]);
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

        {isPreview ? (
          <PreviewCanvas isEditPage={true} colors={colors} />
        ) : (
          designCanvas
        )}
        <DesignFooterLeft />
      </>
    </div>
  );
}
