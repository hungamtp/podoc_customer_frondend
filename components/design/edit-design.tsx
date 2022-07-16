/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { storage } from "@/firebase/firebase";
import useCreateBlueprintByProduct from "@/hooks/api/design/use-create-designed-product";
import useEditDesignedProduct from "@/hooks/api/design/use-edit-desinged-product";
import { Preview } from "@/redux/slices/previews";
import {
  CreateDesignedProduct,
  EditDesignedProduct,
} from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { b64toBlob } from "helper/files-utils";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppSelector } from "../hooks/reduxHook";
import SelectColor from "./select-color";

export interface EditDesignFormProps {
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

export default function EditDesignForm(props: EditDesignFormProps) {
  const { handleCloseDialog, loadedColors } = props;
  const previews = useAppSelector((state) => state.previews);
  const blueprints = useAppSelector((state) => state.blueprintsData.blueprints);
  const router = useRouter();
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
        `images/${designedInfo.name + "-" + image.position + "-" + image.color}`
      );

      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const position = url.split("%2F")[1].split("-")[1];
          const color = url.split("%2F")[1].split("-")[2].split("?")[0];
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
            console.log(submitData, "submitData");

            editDesignProduct(submitData);
          }
        });
      });
    });
  };

  const {
    mutate: editDesignProduct,
    error,
    isLoading: isLoadingSubmit,
  } = useEditDesignedProduct(handleCloseDialog);

  const handleConfirm = () => {
    setIsLoading(true);
    onUploadImage();
  };

  return (
    <>
      <div className="col-xxl">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row mb-3">
              <label htmlFor="basic-icon-default-fullname" className="h4">
                Bạn muốn lưu lại thiết kế này?
              </label>
            </div>
            <SelectColor colors={loadedColors} />

            <div className="d-flex justify-content-center">
              <div className="col-sm-10 d-flex justify-content-around">
                <button
                  className="btn btn-primary"
                  color="primary"
                  onClick={() => handleConfirm()}
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
                  className="btn btn-secondary"
                  onClick={handleCloseDialog}
                  autoFocus
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
