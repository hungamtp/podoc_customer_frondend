import useProductDetail from "@/hooks/api/use-product-detail";
import { DesignState } from "@/models/design";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { setControlData } from "@/redux/slices/designControl";
import { Audio, useLoading } from "@agney/react-loading";
import { useRouter } from "next/router";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface IDesignHeaderLeftProps {
  closePreview: () => void;
  openPreview: () => void;
  isPreview: boolean;
}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  const { closePreview, openPreview, isPreview } = props;
  const blueprintData = useAppSelector((state) => state.blueprintsData);
  const infoManageData = useAppSelector((state) => state.infoManageData);
  const choosenKey = useAppSelector((state) => state.choosenKey);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });
  const router = useRouter();

  const designControl = useAppSelector((state) => state.designControl);
  const controlData = designControl.controlData;
  const dispatch = useAppDispatch();
  const productId = router.asPath.split("productId=")[1].split("&")[0];
  const { data: response, isLoading: isLoading } = useProductDetail(productId);
  const updateAllToPreview = () => {
    let pos = -1;
    let tmpDesignInfos: DesignState[] | undefined = [
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
        tmpSrc: "",
        src: "https://www.google.com/search?q=default+image&tbm=isch&source=iu&ictx=1&vet=1&fir=E__DFTIbn9J8IM%252CTx4IM-J_9YNR0M%252C_%253BJpaFCmffhUdABM%252CeirPelkp9eoYkM%252C_%253BdAOBLb6Mi03B7M%252CtF62HY2qabLnWM%252C_%253BdzPYWaGt8jz9-M%252CxyV8ddqOau4KMM%252C_%253B6tO2K22XfMJMrM%252CJQ2op_24QBAxAM%252C_%253BiBwkPVyfzII9PM%252CRpvxnsLrgxL3_M%252C_%253BQ6BBzp2xDdCTDM%252C5SCId8Hd97daPM%252C_%253BZUQ4hqK0eoOE9M%252CCG1CySSEUS0-DM%252C_%253BX_RNqGrs8uOLUM%252CQgac5TnVA2DlVM%252C_%253Bfzm-cB-sF1nIvM%252CYlh7sHyFI9lHtM%252C_%253BCFxypJE63mo0qM%252CCfVbZJhXslp5nM%252C_%253ByFECy8Q7jEiD6M%252CzfN5DSNirAo6lM%252C_%253BmFBeEI-GK2RjoM%252CC93Eufb1-gvCmM%252C_%253BIVgx2CC_VChlFM%252CzfN5DSNirAo6lM%252C_%253BGEbPHTiPVju47M%252CoXGuy_ozigx-hM%252C_&usg=AI4_-kRMLHt0QpXibXOVMObu4AxomAnBBA&sa=X&ved=2ahUKEwiqtJWqz7v3AhUazIsBHTxODDsQ9QF6BAgDEAE&biw=1920&bih=929&dpr=1#imgrc=E__DFTIbn9J8IM",
      },
    ];
    const tmpBlueprints = [...blueprintData.blueprints];
    tmpBlueprints.forEach((blueprint, index) => {
      if (blueprint.position === blueprintData.position) {
        pos = index;
      }
      if (blueprint.position === blueprintData.position) {
        tmpDesignInfos = blueprint.designInfos || tmpDesignInfos;
      }
    });
    if (pos !== -1) {
      {
        tmpBlueprints[pos] = {
          ...tmpBlueprints[pos],
          designInfos: infoManageData.designInfos,
        };
      }
    }

    dispatch(
      updateBlueprint({
        position: blueprintData.position,
        blueprints: tmpBlueprints,
      })
    );
  };

  React.useEffect(() => {
    updateAllToPreview();
  }, [isPreview]);

  return (
    <div className="row h-9">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column">
        <div className="d-flex justify-content-between border-bottom  py-0 px-0">
          <div className="d-flex">
            <p
              className="h6 px-4 m-auto bi bi-arrow-left cursor-pointer"
              onClick={() => router.push("/raw-products")}
            >
              {" "}
              Trở về trang sản phẩm
            </p>
            {!isLoading && response && (
              <div className="d-flex flex-column justify-content-center">
                <p className="h5 pt-2">{response.name}</p>
                <p className="text-secondary">
                  Cung cấp bởi nhà in {response.factories[0].name}
                </p>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center w-quater align-items-center px-4 btn-group">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                defaultChecked
                onClick={() => {
                  closePreview();
                }}
                checked={!isPreview}
              />
              <label className="btn btn-outline-success" htmlFor="btnradio1">
                Thiết kế
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                onClick={() => {
                  openPreview();
                }}
                checked={isPreview}
              />
              <label className="btn btn-outline-success" htmlFor="btnradio2">
                Bản thử
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className=" col-lg-3 d-md-none d-lg-block border-start px-0">
        {controlData.isSetImage ? (
          <div className="d-flex justify-content-around border-bottom  px-0 py-2point5">
            <p className="h5 pt-3 me-5">Thông tin chi tiết</p>
            <div
              className="btn h3 m-0 "
              onClick={() => {
                const tmpControlData = {
                  ...controlData,
                  isSetImage: false,
                  isChooseImage: false,
                };
                dispatch(setControlData(tmpControlData));
              }}
            >
              x
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-around border-bottom  py-3point5 px-0">
            <p className="h5 pt-2">Thêm thiết kế</p>
            <button className="m-0 pt-2 btn btn-link text-success text-decoration-underline">
              Giá và thông số thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
