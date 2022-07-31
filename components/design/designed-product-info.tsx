/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import useCreateDesignedProduct from "@/hooks/api/design/use-create-designed-product";
import { Preview } from "@/redux/slices/previews";
import { CreateDesignedProduct } from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
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
    .min(1, "Tên thiết kế cần ít nhất 1 kí tự")
    .max(26, "Tên thiết kế tối đa 50 kí tự")
    .required("Tên thiết kế không được để trống"),
  designedPrice: yup
    .number()
    .min(0, "Giá thiết kế tối thiểu 0 đồng")
    .required("Giá của mẫu thiết kế không được để trống"),
  description: yup.string().max(100, "Description tối đa 100 kí tự"),
});

function b64toBlob(dataURI: string) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/jpeg" });
}

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
    formState: { errors, isDirty },
  } = useForm<FormAddDesignInfo>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
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
          new Date().getTime()
        }`
      );

      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const position = url.split("%2F")[1].split("-")[1];
          const color = url.split("%2F")[1].split("-")[2].split("?")[0];
          imageList.push({ image: url, position: position, color: color });
          const submitBlueprint = blueprints.map((blueprint) => {
            console.log(blueprint, "blueprint");
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

            addDesignedProduct(submitData);
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
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <p className="h2 text-center pb-4">Lưu lại thiết kế</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              onChange={() => {
                setIsEmptyColor(false);
              }}
            >
              <div className="row mb-3">
                <label htmlFor="basic-icon-default-fullname">
                  Tên thiết kế
                </label>

                <div className="col-sm-10">
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

              <div className="row mb-3">
                <label htmlFor="basic-icon-default-company">Giá thiết kế</label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <input
                      type="number"
                      id="basic-icon-default-company"
                      className="form-control"
                      placeholder="ACME Inc."
                      aria-label="ACME Inc."
                      aria-describedby="basic-icon-default-company2"
                      {...register("designedPrice")}
                    />
                  </div>
                  {errors.designedPrice && (
                    <span id="error-pwd-message" className="text-danger">
                      {errors.designedPrice.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="basic-icon-default-company">Mô tả</label>
                <div className="col-sm-10">
                  <div className="input-group input-group-merge">
                    <input
                      type="text"
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
              <SelectColor colors={loadedColors} />
              {isEmptyColor && (
                <p className="text-danger">Vui lòng chọn màu áo để in</p>
              )}

              <div className="d-flex justify-content-center pt-4">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary w-30p"
                    color="primary"
                    type="submit"
                  >
                    {(isLoading || isLoadingSubmit) && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Tạo
                  </button>
                  <button
                    className="btn btn-secondary w-30p"
                    onClick={handleCloseDialog}
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
