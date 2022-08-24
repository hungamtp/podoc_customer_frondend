/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import useCreateDesignedProduct from "@/hooks/api/design/use-create-designed-product";
import { Preview } from "@/redux/slices/previews";
import { CreateDesignedProduct } from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppSelector } from "../hooks/reduxHook";
import SelectColor from "./select-color";

export interface ICreateDesignedProductFormProps {
  handleCloseDialog: () => void;
  loadedColors: {
    id: string;
    name: string;
    image: string;
  }[];
}

type FormAddDesignInfo = {
  name: string;
  designedPrice: number;
  description: string;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .trim("Không đúng định dạng")
    .min(5, "Tên thiết kế cần ít nhất 5 kí tự")
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
    .min(5, "Mô tả thiết kế cần ít nhất 5 kí tự")
    .max(255, "Description tối đa 255 kí tự")
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

function b64toBlob(dataURI: string) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function CreateDesignedProductForm(
  props: ICreateDesignedProductFormProps
) {
  const { handleCloseDialog, loadedColors } = props;
  const previews = useAppSelector((state) => state.previews);
  const blueprints = useAppSelector((state) => state.blueprintsData.blueprints);
  const selectedColors = useAppSelector((state) => state.selectedColors);
  const router = useRouter();
  const { productId, factoryId } = router.query;
  const [isEmptyColor, setIsEmptyColor] = React.useState(false);

  const defaultValues: FormAddDesignInfo = {
    name: "",
    designedPrice: 10000,
    description: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormAddDesignInfo>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const designedPrice = watch("designedPrice", 10000);
  const headerInfo = useAppSelector((state) => state.headerInfo);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [renderImageInForm, setRenderImageInForm] = React.useState(
    previews.filter((preview) => {
      return preview.position === "front";
    })[0].imageSrc
  );
  React.useEffect(() => {
    if (previews)
      setRenderImageInForm(
        previews.filter((preview) => {
          return preview.position === "front";
        })[0].imageSrc
      );
  }, [previews]);
  const onUploadImage = (data: {
    name: string;
    designedPrice: number;
    description: string;
  }) => {
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
          data.name +
          "-" +
          image.position +
          "-" +
          image.color +
          "-" +
          new Date().getTime()
        }`
      );

      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const position = snapshot.metadata.fullPath
            .split("images/")[1]
            .split("-")[1];
          const color = snapshot.metadata.fullPath
            .split("images/")[1]
            .split("-")[2];
          imageList.push({ image: url, position: position, color: color });
          const submitBlueprint = blueprints.map((blueprint) => {
            if (
              (blueprint.designInfos && blueprint.designInfos.length === 0) ||
              !blueprint.designInfos
            )
              return { ...blueprint, designInfos: [] };
            else return blueprint;
          });

          if (imageList.length === submitPreviewList.length) {
            setIsLoading(false);
            const submitData = {
              ...data,
              colors: selectedColors,
              imagePreviews: imageList,
              bluePrintDtos: submitBlueprint,
              factoryId: factoryId,
              productId: productId,
            } as CreateDesignedProduct;

            addDesignedProduct(submitData, {
              onSuccess: () => {
                enqueueSnackbar("Tạo sản phẩm thiết kế thành công!", {
                  autoHideDuration: 4000,
                  variant: "success",
                });
              },
            });
          }
        });
      });
    });
  };

  const {
    mutate: addDesignedProduct,
    error,
    isLoading: isLoadingSubmit,
  } = useCreateDesignedProduct(handleCloseDialog);

  const onSubmit: SubmitHandler<FormAddDesignInfo> = (data) => {
    if (selectedColors.length === 0) {
      setIsEmptyColor(true);
    } else {
      setIsLoading(true);
      onUploadImage(data);
    }
  };

  return (
    <>
      <div className="col-xxl custom-modal">
        <div className="card mb-4">
          <div className="card-body">
            <p className="h2 text-center pb-4">Lưu lại thiết kế</p>

            <div className="row mb-3">
              <div className="col-sm-3">
                <div className="input-group input-group-merge position-relative ">
                  <Image
                    src={renderImageInForm}
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
                  <label className="h6 fw-bold me-2">Tên sản phẩm:</label>
                  {headerInfo.productName}
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

            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => {
                setIsEmptyColor(false);
              }}
            >
              <div className="row mb-3">
                <div className="col-sm-12">
                  <label htmlFor="basic-icon-default-fullname">
                    Tên thiết kế
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
                      className="form-control"
                      id="basic-icon-default-fullname"
                      aria-label="John"
                      aria-describedby="basic-icon-default-fullname2"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-6">
                  <label htmlFor="basic-icon-default-fullname">
                    Giá thiết kế
                  </label>
                  <div className="input-group input-group-merge position-relative ">
                    <input
                      type="number"
                      className="form-control py-2 rounded"
                      id="basic-icon-default-fullname"
                      aria-label="DesignedPrice"
                      aria-describedby="basic-icon-default-price"
                      {...register("designedPrice")}
                    />
                    <span className="position-absolute top-50 end-0 translate-middle-y px-2">
                      VND
                    </span>
                  </div>

                  {errors.name && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="col-sm-6">
                  <SelectColor colors={loadedColors} />
                  {isEmptyColor && (
                    <p className="text-danger">Vui lòng chọn màu áo để in</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <label htmlFor="basic-icon-default-company">Mô tả</label>
                  <div className="input-group input-group-merge">
                    <textarea
                      id="basic-icon-default-company"
                      className="form-control"
                      aria-label="ACME Inc."
                      aria-describedby="basic-icon-default-company2"
                      {...register("description")}
                    />
                  </div>
                  {errors.description && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-center pt-4">
                <div className="col-sm-12 d-flex justify-content-around">
                  <button
                    className="btn btn-primary w-30p"
                    color="primary"
                    type="submit"
                  >
                    {(isLoading || isLoadingSubmit) && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Tạo
                  </button>
                  <button
                    className="btn btn-secondary w-30p"
                    onClick={handleCloseDialog}
                    disabled={isLoadingSubmit || isLoading}
                    autoFocus
                    type="button"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
