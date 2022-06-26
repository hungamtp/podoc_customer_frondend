/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import useCreateBlueprintByProduct from "@/hooks/api/design/use-create-designed-product";
import { DesignedProductDto } from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { useRouter } from "next/router";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";
import * as yup from "yup";
import { useAppSelector } from "../hooks/reduxHook";
import SelectColor from "./select-color";

export interface ICreateDesignedProductFormProps {
  handleCloseDialog: () => void;
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
  const { handleCloseDialog } = props;
  const previews = useAppSelector((state) => state.previews);
  const blueprints = useAppSelector((state) => state.blueprintsData.blueprints);
  const [images, setImages] = React.useState<ImageListType>();
  const router = useRouter();
  const { productId, factoryId } = router.query;

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
  const colors = useAppSelector((state) => state.selectedColors);

  const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
    setImages(imageList);
    // data for submit
  };
  const [isLoading, setIsLoading] = React.useState(false);
  const onUploadImage = (data: {
    name: string;
    designedPrice: number;
    description: string;
  }) => {
    if (images !== null) {
      const imageList = [] as { image: string; position: string }[];
      previews.map((image) => {
        const file = b64toBlob(image.imageSrc);
        const imageRef = ref(
          storage,
          `images/${data.name + "-" + image.position}`
        );

        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const position = url.split("%2F")[1].split("-")[1].split("?")[0];
            imageList.push({ image: url, position: position });
            const submitBlueprint = blueprints.map((blueprint) => {
              if (blueprint.designInfos) return blueprint;
              return { ...blueprint, designInfos: [] };
            });
            if (imageList.length === previews.length) {
              setIsLoading(false);
              console.log(submitBlueprint, "blueprint ne");
              const submitData = {
                ...data,
                colors: colors,
                imagePreviews: imageList,
                bluePrintDtos: submitBlueprint,
                factoryId: Number(factoryId),
                productId: Number(productId),
              } as unknown as DesignedProductDto;

              addDesignedProduct(submitData);
            }
          });
        });
      });
    }
  };

  const {
    mutate: addDesignedProduct,
    error,
    isLoading: isLoadingSubmit,
  } = useCreateBlueprintByProduct(handleCloseDialog);

  const onSubmit: SubmitHandler<FormAddDesignInfo> = (data) => {
    setIsLoading(true);
    onUploadImage(data);
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder="John"
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
                      placeholder="ACME Inc."
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
              <SelectColor />

              <div className="d-flex justify-content-center">
                <div className="col-sm-10 d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
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
                    className="btn btn-secondary"
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
