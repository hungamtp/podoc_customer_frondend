/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import useEditDesignedProduct from "@/hooks/api/design/use-edit-desinged-product";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { resetDesigns } from "@/redux/slices/design";
import { resetControl } from "@/redux/slices/designControl";
import { clearAllPreview, Preview } from "@/redux/slices/previews";
import { resetColors } from "@/redux/slices/selectedColors";
import { EditDesignedProduct } from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { b64toBlob } from "helper/files-utils";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import SelectColor from "./select-color";

import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { resetIsDesignInvalid } from "@/redux/slices/designInValid";

export interface EditDesignFormProps {
  handleCloseDialog: () => void;
  loadedColors: {
    id: string;
    name: string;
    image: string;
  }[];
  imagePreviewForm: string;
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

type FormAddDesignInfo = {
  name: string;
  designedPrice: number;
  description: string;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .trim("Không đúng định dạng")
    .min(1, "Tên thiết kế cần ít nhất 1 kí tự")
    .max(50, "Tên thiết kế tối đa 50 kí tự")
    .required("Tên thiết kế không được để trống"),
  designedPrice: yup
    .number()
    .typeError("Giá của mẫu thiết kế không được để trống")
    .min(0, "Giá thiết kế tối thiểu 0 đồng")
    .required("Giá của mẫu thiết kế không được để trống"),
  description: yup
    .string()
    .trim("Không đúng định dạng")
    .min(10, "Mô tả thiết kế cần ít nhất 10 kí tự")
    .max(300, "Mô tả thiết kế tối đa 300 kí tự")
    .required("Thông tin mô tả không được để trống"),
});

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export default function EditDesignForm(props: EditDesignFormProps) {
  const { handleCloseDialog, loadedColors, imagePreviewForm } = props;
  const previews = useAppSelector((state) => state.previews);
  const blueprints = useAppSelector((state) => state.blueprintsData.blueprints);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { designName } = router.query;

  const defaultValues: FormAddDesignInfo = {
    name: "",
    designedPrice: 0,
    description: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormAddDesignInfo>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const selectedColors = useAppSelector((state) => state.selectedColors);
  React.useEffect(() => {
    if (selectedColors.length > 0) {
      setIsErr(false);
    }
  }, [selectedColors]);

  const designControl = useAppSelector((state) => state.designControl);
  const controlData = designControl.controlData;
  const headerInfo = useAppSelector((state) => state.headerInfo);
  const [isErr, setIsErr] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const designedInfo = useAppSelector((state) => state.designProductInfo);

  const onUploadImage = () => {
    let submitPreviewList: Preview[] = [];
    previews.forEach((preview) => {
      selectedColors.forEach((selectedColor) => {
        if (preview.color === selectedColor) submitPreviewList.push(preview);
      });
    });
    const imageList = [] as {
      image: string;
      position: string;
      color: string;
    }[];
    submitPreviewList.forEach((image) => {
      const file = b64toBlob(image.imageSrc);
      const imageRef = ref(
        storage,
        `images/${
          designedInfo.name +
          "(@!#!$)" +
          image.position +
          "(@!#!$)" +
          image.color +
          "(@!#!$)" +
          new Date().getTime()
        }`
      );

      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const position = snapshot.metadata.fullPath
            .split("images/")[1]
            .split("(@!#!$)")[1];
          const color = snapshot.metadata.fullPath
            .split("images/")[1]
            .split("(@!#!$)")[2];
          imageList.push({ image: url, position: position, color: color });

          if (imageList.length === submitPreviewList.length) {
            setIsLoading(false);
            const submitData = {
              designedProductId: designedInfo.id,
              designedPrice: designedInfo.designedPrice,
              description: designedInfo.description,
              colors: selectedColors,
              name: designedInfo.name,
              imagePreviews: imageList,
              bluePrintDtos: blueprints,
            } as EditDesignedProduct;

            editDesignProduct(submitData, {
              onSuccess: (data) => {
                //because data:any
                enqueueSnackbar("Chỉnh sửa thiết kế thành công!", {
                  autoHideDuration: 4000,
                  variant: "success",
                });
                dispatch(setChoosenKey(""));
                dispatch(clearAllPreview());
                dispatch(resetColors());
                dispatch(resetControl());
                dispatch(resetDesigns());
                dispatch(resetIsDesignInvalid());

                handleCloseDialog();
                router.back();
              },
              onError: (error: any) => {},
            });
          }
        });
      });
    });
  };

  const {
    mutate: editDesignProduct,
    error,
    isLoading: isLoadingSubmit,
  } = useEditDesignedProduct();

  const handleConfirm = () => {
    if (selectedColors.length === 0) setIsErr(true);
    else {
      setIsLoading(true);
      onUploadImage();
    }
  };

  return (
    <>
      <div className="col-xxl custom-modal">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row mb-3">
              <label htmlFor="basic-icon-default-fullname" className="h4">
                Bạn muốn lưu lại thiết kế này?
              </label>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <div className="input-group input-group-merge position-relative ">
                  <Image
                    src={imagePreviewForm}
                    className="border rounded border-secondary"
                    width={3000}
                    height={3000}
                    objectFit="cover"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(3000, 3000)
                    )}`}
                    alt="productImage"
                  />
                </div>

                {errors.name && (
                  <span id="error-pwd-message" className="text-danger">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="col-sm-9">
                <div>
                  <label className="h6 fw-bold me-2">Tên thiết kế:</label>
                  {designName}
                </div>
                <div>
                  <label className="h6 fw-bold me-2">Chất liệu:</label>
                  {headerInfo.rawProductMaterial}
                </div>
                <div>
                  <label className="h6 fw-bold me-2">
                    Giá từ nhà sản xuất:
                  </label>
                  {numberWithCommas(headerInfo.rawProductPrice)} VND
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <SelectColor colors={loadedColors} />
            </div>
            {isErr && (
              <span id="error-pwd-message" className="text-danger">
                {"Màu không được để trống"}
              </span>
            )}
            <div className="d-flex justify-content-center mt-5">
              <div className="col-sm-10 d-flex justify-content-around">
                <button
                  className="btn btn-primary w-30p"
                  color="primary"
                  onClick={() => handleConfirm()}
                  disabled={
                    isLoading || isLoadingSubmit || controlData.isLoadingImage
                  }
                >
                  {(isLoading || isLoadingSubmit) && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Xác nhận
                </button>
                <button
                  className="btn btn-secondary w-30p"
                  onClick={handleCloseDialog}
                  autoFocus
                  disabled={isLoading || isLoadingSubmit}
                  type="button"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
