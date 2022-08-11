import { useAppDispatch } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import useEditDesignedProduct from "@/hooks/api/design/use-edit-desinged-product";
import useGetDesignById from "@/hooks/api/design/use-get-design-by-id";
import { setHeaderInfo } from "@/redux/slices/headerInfo";
import { EditDesignedProduct } from "@/services/design/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent } from "@material-ui/core";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export interface MyDesignDetailProps {}

interface DesignProductInfo {
  designedPrice: number;
  description: string;
  name: string;
}

export default function MyDesignDetail(props: MyDesignDetailProps) {
  const router = useRouter();

  const { detail } = router.query;
  const { data: response, isLoading: isLoadingDesign } = useGetDesignById(
    detail as string
  );
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, "Tên thiết kế cần ít nhất 5 kí tự")
      .max(50, "Tên thiết kế tối đa 50 kí tự")
      .required("Tên thiết kế không được để trống"),
    designedPrice: yup
      .number()
      .min(0, "Giá thiết kế tối thiểu 0 đồng")
      .required("Giá của mẫu thiết kế không được để trống"),
    description: yup
      .string()
      .min(5, "Tên thiết kế cần ít nhất  kí tự")
      .max(255, "Description tối đa 255 kí tự")
      .required("Thông tin mô tả không được để trống"),
  });
  const [renderedPosition, setRenderPosition] = useState("front");
  const [imageWithPosition, setImageWithPosition] = useState<
    {
      position: string;
      image: string;
      color: string;
    }[]
  >([]);
  const [renderedColor, setRenderColor] = useState("");
  const form = useForm<DesignProductInfo>({
    defaultValues: {
      designedPrice: 10000,
      description: "",
      name: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = form;
  const [isEdit, setIsEdit] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  React.useEffect(() => {
    if (response) {
      reset({
        designedPrice: response.designedPrice,
        description: response.description,
        name: response.name,
      });
    }
  }, [response]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleConfirm = () => {
    setIsLoading(true);
  };
  const {
    mutate: editDesignProduct,
    error,
    isLoading: isLoadingSubmit,
  } = useEditDesignedProduct(handleCloseDialog);
  const designedPrice = watch("designedPrice", 10000);
  const submit: SubmitHandler<DesignProductInfo> = (data) => {
    if (response) {
      const colorsList = response.colorsObj.map((color) => color.image);
      const submitData = {
        designedProductId: response.id,
        designedPrice: data.designedPrice,
        description: data.description,
        colors: colorsList,
        name: data.name,
        imagePreviews: response.imagePreviews,
        bluePrintDtos: response.bluePrints,
      } as EditDesignedProduct;
      setIsLoading(true);
      editDesignProduct(submitData, {
        onSuccess: (data) => {
          //because data:any
          setIsLoading(false);
          setIsEdit(false);
          handleCloseDialog();
        },
        onError: (error: any) => {},
      });
    }
  };

  React.useEffect(() => {
    if (response) {
      setRenderColor(response.colorsObj[0].image);
    }
  }, [response]);
  React.useEffect(() => {
    if (response) {
      if (renderedColor) {
        const tmpList = response.imagePreviews.filter(
          (image) => image.color === renderedColor
        );
        let submitImageList = [];
        const front = tmpList.filter((image) => image.position === "front")[0];
        const back = tmpList.filter((image) => image.position === "back")[0];
        submitImageList = [front, back];
        setImageWithPosition(submitImageList);
      }
    }
  }, [renderedColor]);

  return (
    <div>
      <section className="bg-invoice bg-light">
        <div className="container">
          {response && (
            <div className="row mt-5 pt-4 pt-sm-0 justify-content-center">
              <div className="col-lg-12">
                <div className="card shadow rounded border-0 mb-4">
                  {renderedColor && (
                    <div className="card-body">
                      <div className="invoice-top pb-4 border-bottom">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="logo-invoice mb-2">
                              Hình ảnh thiết kế
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="invoice-middle py-4">
                        <div className="row mb-0">
                          <div className="col-md-5 d-flex flex-column justify-content-center align-items-center">
                            <>
                              {response.imagePreviews.map((preview) => {
                                if (preview.position === renderedPosition) {
                                  if (preview.color === renderedColor)
                                    return (
                                      <Image
                                        src={preview.image}
                                        className="img-fluid"
                                        width={1000}
                                        height={1000}
                                        objectFit="cover"
                                        alt="productImage"
                                      />
                                    );
                                }
                              })}

                              <button
                                onClick={() => {
                                  dispatch(
                                    setHeaderInfo({
                                      productName: response.productName,
                                      factoryName: response.factoryName,
                                    })
                                  );

                                  router.push(
                                    `/my-product/edit-design?designId=${detail}&designName=${response.name}`
                                  );
                                }}
                                className="btn btn-link text-success"
                              >
                                Chỉnh sửa thiết kế
                              </button>
                            </>
                          </div>
                          <div className="col-md-5 order-md-2 order-1 mt-2 mt-sm-0 ms-5">
                            <div className="pb-4">
                              <p className="h4">Chọn mặt áo</p>
                              <div className="mt-4">
                                <div className="mb-0 d-flex justify-content-between ">
                                  {imageWithPosition.map((imagePreview) => (
                                    <>
                                      <div
                                        key={imagePreview.position}
                                        className="cursor-pointer"
                                        onClick={() => {
                                          setRenderPosition(
                                            imagePreview.position
                                          );
                                        }}
                                      >
                                        <Image
                                          src={imagePreview.image}
                                          className="img-fluid"
                                          width={1000}
                                          height={1000}
                                          objectFit="cover"
                                          alt="productImage"
                                        />

                                        <p className="text-center position-relative bottom-2 bottom-line">
                                          {imagePreview.position === "front" &&
                                            "Trước"}
                                          {imagePreview.position === "back" &&
                                            "Sau"}
                                        </p>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <p className="h4">Chọn màu áo</p>
                              <div className="mt-4">
                                <div className=" mb-0 d-flex justify-content-between ms-4 p-4 w-50">
                                  {response.imagePreviews.map(
                                    (imagePreview) => {
                                      if (
                                        imagePreview.position ===
                                        renderedPosition
                                      )
                                        return (
                                          <>
                                            <div
                                              key={imagePreview.color}
                                              className="cursor-pointer"
                                              onClick={() => {
                                                setRenderColor(
                                                  imagePreview.color
                                                );
                                              }}
                                            >
                                              <Image
                                                className="rounded-circle border"
                                                width={50}
                                                height={50}
                                                objectFit="cover"
                                                key={imagePreview.color}
                                                src={
                                                  "https://images.printify.com/5853fec7ce46f30f8328200a"
                                                }
                                                style={{
                                                  backgroundColor:
                                                    imagePreview.color,
                                                  opacity: "0.8",
                                                }}
                                                alt={imagePreview.color}
                                              />
                                            </div>
                                          </>
                                        );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/*end of mockup*/}
                <div className="card shadow rounded border-0 mb-4">
                  <div className="card-body">
                    <div className="invoice-top pb-4 border-bottom">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="logo-invoice mb-2">Mô tả</div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-middle py-4">
                      <div className="row mb-0">
                        <p className="h4 mb-4">Thông tin mô tả</p>

                        <form>
                          <div className="row">
                            {/*end col*/}
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Tên sản phẩm
                                </label>
                                <div className="form-icon position-relative">
                                  <input
                                    id="subject"
                                    className="form-control"
                                    {...register("name")}
                                    disabled={!isEdit}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Giá thiết kế
                                </label>
                                <div className="form-icon position-relative">
                                  <input
                                    id="subject"
                                    className="form-control"
                                    {...register("designedPrice")}
                                    disabled={!isEdit}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Giá từ nhà sản xuất
                                </label>
                                <div className="form-icon position-relative">
                                  {numberWithCommas(response.priceFromFactory)}{" "}
                                  VND
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <label className="form-label">Tổng giá</label>
                                <div className="form-icon position-relative">
                                  {numberWithCommas(
                                    Number(designedPrice) +
                                      response.priceFromFactory
                                  )}{" "}
                                  VND
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-md-12">
                              <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <div className="form-icon position-relative">
                                  <textarea
                                    id="comments"
                                    rows={4}
                                    className="form-control"
                                    {...register("description")}
                                    disabled={!isEdit}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*end row*/}

                          <Dialog
                            open={isOpen}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            fullWidth={true}
                            disableEnforceFocus
                          >
                            <DialogContent>
                              <div className="col-xxl">
                                <div className="card mb-4">
                                  <div className="card-body">
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="basic-icon-default-fullname"
                                        className="h4"
                                      >
                                        Bạn muốn lại thông tin thay đổi?
                                      </label>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                      <div className="col-sm-10 d-flex justify-content-around">
                                        <button
                                          className="btn btn-primary"
                                          color="primary"
                                          onClick={handleSubmit(submit)}
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
                            </DialogContent>
                          </Dialog>
                          {/*end row*/}
                        </form>
                        <div className="row">
                          <div className="col-sm-12">
                            {isEdit ? (
                              <div className="d-flex justify-content-between w-25">
                                <button
                                  className="btn btn-success w-50 me-4"
                                  onClick={() => handleOpenDialog()}
                                >
                                  Lưu
                                </button>
                                <button
                                  className="btn btn-secondary w-50"
                                  onClick={() => setIsEdit(false)}
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={() => setIsEdit(true)}
                              >
                                Chỉnh sửa
                              </button>
                            )}
                          </div>
                          {/*end col*/}
                        </div>
                        {/*end form*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*end col*/}
            </div>
          )}
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
    </div>
  );
}
MyDesignDetail.Layout = MainLayout;
