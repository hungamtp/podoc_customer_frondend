import { DesignState } from "@/models/design";
import { updateBlueprint } from "@/redux/slices/blueprints";
import { setControlData } from "@/redux/slices/designControl";
import { resetHeaderInfo } from "@/redux/slices/headerInfo";
import { Audio, useLoading } from "@agney/react-loading";
import { useRouter } from "next/router";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

export interface IDesignHeaderLeftProps {
  closePreview: () => void;
  openPreview: () => void;
  isPreview: boolean;
  isEditPage: boolean;
}

export default function DesignHeaderLeft(props: IDesignHeaderLeftProps) {
  const { closePreview, openPreview, isPreview, isEditPage } = props;
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
  const headerInfo = useAppSelector((state) => state.headerInfo);
  const updateAllToPreview = () => {
    let pos = -1;
    let tmpDesignInfos: DesignState[] = [];
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
    const handleRouteChange = (url: string) => {
      if (
        !url.includes("/design?productId") &&
        !url.includes("/my-product/edit-design?designId=")
      )
        dispatch(resetHeaderInfo());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  React.useEffect(() => {
    updateAllToPreview();
  }, [isPreview]);

  return (
    <div className="row ">
      <div className="col-lg-9 col-12 px-0 d-flex flex-column">
        <div className="d-flex justify-content-between py-0 px-0 border-bottom">
          <div className="d-flex">
            <p
              className="h6 px-4 m-auto bi bi-arrow-left cursor-pointer"
              onClick={() => {
                if (isEditPage) router.push("/mydesign");
                else router.push("/raw-products");
              }}
            >
              {" "}
              Trở về trang sản phẩm
            </p>
            {headerInfo && (
              <div className="d-flex flex-column justify-content-center">
                <p className="h5 pt-2">{headerInfo.productName}</p>
                <p className="text-secondary">
                  Cung cấp bởi nhà in {headerInfo.factoryName}
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
                disabled={controlData.isLoadingImage}
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
                disabled={controlData.isLoadingImage}
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

      <div className=" col-lg-3 d-md-none d-lg-block border-start px-0 border-bottom">
        {controlData.isSetImage ? (
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-around px-0 ">
              <p className="h5 me-5 py-4">Thông tin chi tiết</p>
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
          </div>
        ) : (
          <div className="d-flex justify-content-around  px-0">
            <p className="h5 m-0 py-4">Thêm thiết kế</p>
          </div>
        )}
      </div>
    </div>
  );
}
