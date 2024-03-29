/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import UserRating from "@/components/common/rating";
import ShowRating from "@/components/common/show-rating";
import ImageCarousel from "@/components/designed-products/imageCarousel";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { PageWithHero } from "@/components/layouts/page-with-hero";
import useAddToCart from "@/hooks/api/cart/use-add-to-cart";
import useUpdateCart from "@/hooks/api/cart/use-update-cart";
import useGetOthersDesignById from "@/hooks/api/design/use-get-other-designs-by-designId";
import {
  updateQuantityCartDetail,
  addNewCartDetail,
  setCart as setCartRedux,
} from "@/redux/slices/cart";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { AddToCartDTO, CartDetailDTO } from "@/services/type.dto";
import { Box, Dialog, DialogContent, Rating, Skeleton } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { string } from "yup";

const quickSort = (
  arr: { size: string; dignity: number; color: string }[]
): { size: string; dignity: number; color: string }[] => {
  if (arr.length < 2) return arr;

  // *** lấy phần tử cuối của 'arr' làm 'pivot'
  const pivotIndex = arr.length - 1;
  const pivot = arr[pivotIndex];

  const left = [];
  const right = [];

  let currentItem;
  // *** 'i < pivotIndex' => chúng ta sẽ không loop qua 'pivot' nữa
  for (let i = 0; i < pivotIndex; i++) {
    currentItem = arr[i];

    if (currentItem.dignity < pivot.dignity) {
      left.push(currentItem);
    } else {
      right.push(currentItem);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const sizeSort = (
  sizeList: { color: string; size: string }[]
): { size: string; dignity: number; color: string }[] => {
  const newList: { size: string; dignity: number; color: string }[] = [];
  sizeList.forEach((size) => {
    let dignity = 1;
    for (let index = size.size.length - 1; index >= 0; index--) {
      let isNum = false;
      let num = 1;
      try {
        num = Number(size.size[index]);
        isNum = true;
      } catch (e) {
        isNum = false;
      }
      if (size.size[index] === "x" || size.size[index] === "X") {
        dignity = dignity * 2;
      } else if (size.size[index] === "M" || size.size[index] === "m") {
        dignity = dignity * 1;
      } else if (size.size[index] === "L" || size.size[index] === "l") {
        dignity = dignity * 2;
      } else if (size.size[index] === "s" || size.size[index] === "S") {
        dignity = dignity * -2;
      } else if (isNum) {
        dignity = dignity * num;
      }
    }
    newList.push({ ...size, dignity: dignity });
  });

  return newList;
};

export default function DesignedProductDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { design }: any = router.query;
  const auth = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenSize, setIsOpenSize] = React.useState(false);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const { data: designedProduct, isLoading: isLoading } =
    useGetOthersDesignById(design);

  const {
    mutate: addToCart,
    data: cartDetailFromAPI,
    isLoading: isLoadingAddNewCartDetail,
    error,
  } = useAddToCart();

  const carts = useAppSelector((state) => state.carts);
  const [cart, setCart] = React.useState<CartDetailDTO>();

  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [selectedColorImage, setSelectedColorImage] =
    React.useState<string>("");
  const [selectedColorSize, setSelectedColorSize] = React.useState<string>("");
  const [renderedImagesList, setRenderedImagesList] = React.useState<
    { color: string; image: string; position: string }[]
  >([]);
  const [sizeList, setSizeList] = React.useState<
    { color: string; size: string }[]
  >([]);

  const [colorList, setColorList] = React.useState<string[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!!designedProduct) {
      const colorsAndSizeList = designedProduct.colorAndSizes;
      if (!!colorsAndSizeList) {
        const tmpColorsList = Object.getOwnPropertyNames(colorsAndSizeList);
        setColorList(tmpColorsList);
        setSelectedColorImage(tmpColorsList[0].split("-")[1]);
      }
    }
  }, [designedProduct]);

  React.useEffect(() => {
    if (designedProduct && selectedColorImage) {
      const filterColorImages = designedProduct.imagePreviews.filter(
        (image) => image.color === selectedColorImage
      );

      if (filterColorImages.length > 0) {
        for (let index = 0; index < filterColorImages.length; index++) {
          if (filterColorImages[index].position === "front") {
            const tmp = filterColorImages[0];
            filterColorImages[0] = filterColorImages[index];
            filterColorImages[index] = tmp;
            break;
          }
        }

        setRenderedImagesList(filterColorImages);
      }
    }
  }, [selectedColorImage]);

  React.useEffect(() => {
    if (!!designedProduct) {
      if (!!designedProduct.colorAndSizes) {
        const sizeData = designedProduct.colorAndSizes[selectedColorSize] as {
          color: string;
          size: string;
        }[];
        if (selectedSize) {
          const submitSize = sizeData.filter(
            (size) => size.size === selectedSize
          )[0];
          if (!submitSize) {
            setSelectedSize("");
          }
        }

        setSizeList(quickSort(sizeSort(sizeData)));
      }
    }
  }, [selectedColorSize]);

  const [quantity, setQuantity] = React.useState(1);

  const { mutate: updateCart, data: updateDetailFromAPI } = useUpdateCart();

  React.useEffect(() => {
    if (cartDetailFromAPI) {
      dispatch(addNewCartDetail(cartDetailFromAPI));
      setCart(cartDetailFromAPI);
    }
  }, [cartDetailFromAPI]);

  const productDontHaveEnoughQuatity = useAppSelector(
    (state) => state.checkCartSlice
  );

  const checkout = () => {
    if (auth.isAuth) router.push("/carts");
    else {
      setIsOpen(true);
    }
  };

  const handleChangeQuantity = (newQuantity: number) => {
    const quantityStr: string[] = newQuantity.toString().split("");
    if (quantityStr.includes("-") || quantityStr.includes("+")) {
      return;
    }
    if (newQuantity == 0) {
      return;
    }
    setQuantity(newQuantity);
  };

  const updateQuantity = (newQuantity: number) => {
    const indentity = selectedColor + selectedSize + designedProduct?.id;
    const cartDetailExisted = carts.some((cart) => {
      setCart(cart);
      return `${cart.color + cart.size + cart.designedProductId}` === indentity;
    });
    if (!selectedColor || !selectedSize) setIsError(true);
    else {
      setIsError(false);
      if (cartDetailExisted) {
        updateCartDetailQuantity(newQuantity);
      } else {
        addNewDetail(newQuantity);
      }
    }
  };

  const showSize = () => {
    setIsOpenSize(true);
  };

  const addNewDetail = (newQuantity: number) => {
    if (newQuantity === 0) {
      return;
    }
    const newCartDetail: AddToCartDTO = {
      designId: design,
      color: selectedColor,
      size: selectedSize,
      quantity: newQuantity,
    };
    if (auth.isAuth)
      addToCart(newCartDetail, {
        onSuccess: () => {
          enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
            autoHideDuration: 3000,
            variant: "success",
          });
        },
      });
    else {
      setIsOpen(true);
      // const reduxCartDetail = {
      //   id: nanoid(),
      //   cartId: nanoid(),
      //   designedProductId: designedProduct?.id,
      //   designedProductName: designedProduct?.name,
      //   designedImage: renderedImagesList[0].image,
      //   size: selectedSize,
      //   color: selectedColor,
      //   quantity: newQuantity,
      //   price: designedProduct?.price,
      //   publish: true,
      // };
      // dispatch(addNewCartDetail(reduxCartDetail));
      // enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
      //   autoHideDuration: 3000,
      //   variant: "success",
      // });
    }
  };

  const updateCartDetailQuantity = (newQuantity: number) => {
    if (cart) {
      const newCart: CartDetailDTO[] = [];
      const updatedQuantity = newQuantity + cart.quantity;
      carts.forEach((cartDetail) => {
        if (cartDetail.id != cart.id) {
          newCart.push(cartDetail);
        }
      });
      newCart.push({ ...cart, quantity: updatedQuantity });
      setCart({ ...cart, quantity: updatedQuantity });
      dispatch(
        updateQuantityCartDetail({ ...cart, quantity: updatedQuantity })
      );
      dispatch(setCartRedux(newCart));
      updateCart(newCart);
      enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng!", {
        autoHideDuration: 3000,
        variant: "success",
      });
    }
  };

  const goToProfile = (userId: string) => {
    router.replace(`/others-design?userId=${userId}`);
  };

  return (
    <>
      {isLoading ? (
        <section className="section pb-0">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <Skeleton variant="rectangular" width={400} height={400} />
              </div>
              <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="section-title ms-md-4">
                  <Box sx={{ pt: 0.5 }}>
                    <Typography component="div" variant="h3" width="80%">
                      <Skeleton />
                    </Typography>

                    <Skeleton width="60%" />
                    <Skeleton width="70%" />
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                    <br />
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                    <hr />

                    <Typography component="div" variant="h2">
                      <Skeleton width="80%" />
                    </Typography>
                    <Typography component="div" variant="h3">
                      <div className="d-flex justify-content-between w-50">
                        <Skeleton width="40%" />
                        <Skeleton width="40%" />
                      </div>
                    </Typography>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>
          {designedProduct && (
            <div>
              <Dialog
                open={isOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
              >
                <DialogContent>
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className=" d-flex justify-content-center">
                          <Image
                            src="/asset/images/logo_man.png"
                            className="avatar avatar rounded-circle "
                            width={150}
                            height={150}
                            objectFit="cover"
                            alt="productImage"
                          />
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="basic-icon-default-fullname"
                            className="h4"
                          >
                            Bạn cần phải đăng nhập để có thể mua sắm.
                          </label>
                        </div>

                        <div className="d-flex justify-content-center">
                          <div className="col-sm-10 d-flex justify-content-around">
                            <button
                              className="btn btn-primary"
                              color="primary"
                              onClick={() => router.push("/login")}
                            >
                              Xác nhận
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={handleCloseDialog}
                              autoFocus
                              type="button"
                            >
                              Không
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog
                open={isOpenSize}
                onClose={() => setIsOpenSize(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="md"
              >
                <DialogContent>
                  <div className="text-dark m-2 mb-4">
                    <p className="h4 ms-5">Bảng size</p>

                    <div className="h4 ms-5">
                      <Image
                        src="/asset/images/image_default/size-guide.png"
                        width={250}
                        height={250}
                        objectFit="cover"
                        alt="productImage"
                      />
                    </div>
                    {designedProduct && (
                      <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column border-start border-top">
                          <div className="border-bottom px-4 py-2 card-header bg-light">
                            Size
                          </div>
                          <div className="border-bottom px-4 py-2 ">
                            Chiều rộng (cm)
                          </div>
                          <div className="border-bottom px-4 py-2 ">
                            Chiều dài (cm)
                          </div>
                        </div>
                        <>
                          {designedProduct.sizeProductDto.map(
                            (sizeData, index) => {
                              if (
                                index ===
                                designedProduct.sizeProductDto.length - 1
                              ) {
                                return (
                                  <>
                                    <div className="d-flex flex-column border-start border-top border-end">
                                      <div className="border-bottom px-4 py-2 card-header bg-light">
                                        {sizeData.size}
                                      </div>
                                      <div className="border-bottom px-4 py-2">
                                        {sizeData.width}
                                      </div>
                                      <div className="border-bottom px-4 py-2">
                                        {sizeData.height}
                                      </div>
                                    </div>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <div className="d-flex flex-column border-start border-top">
                                      <div className="border-bottom px-4 py-2 card-header bg-light">
                                        {sizeData.size}
                                      </div>
                                      <div className="border-bottom px-4 py-2 ">
                                        {sizeData.width}
                                      </div>
                                      <div className="border-bottom px-4 py-2 ">
                                        {sizeData.height}
                                      </div>
                                    </div>
                                  </>
                                );
                              }
                            }
                          )}
                        </>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <section className="section pb-0">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      {renderedImagesList && renderedImagesList.length > 0 && (
                        <ImageCarousel
                          key={nanoid()}
                          renderedImagesList={renderedImagesList}
                        />
                      )}
                    </div>
                    <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                      <div className="section-title ms-md-4">
                        <h4 className="title"> {designedProduct.name}</h4>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            {numberWithCommas(designedProduct.price)} VND
                          </h6>
                        </div>
                        <ShowRating
                          rate={designedProduct.rating}
                          rateCount={designedProduct.rateCount}
                        />

                        <div className="designer ">
                          Đã bán <b>{designedProduct.sold}</b>
                        </div>
                        <div className="designer ">
                          Chất liệu{" "}
                          <span
                            onClick={() => goToProfile(designedProduct.user.id)}
                          >
                            <b>{designedProduct.material}</b>
                          </span>
                        </div>
                        <div className="designer ">
                          Nhà in <b>{designedProduct.factoryName}</b>
                        </div>
                        <div className="designer cursor-pointer">
                          Thiết kế bởi{" "}
                          <span
                            onClick={() => goToProfile(designedProduct.user.id)}
                          >
                            <b style={{ textDecoration: "underline" }}>
                              {designedProduct.user.firstName +
                                " " +
                                designedProduct.user.lastName}
                            </b>
                          </span>
                        </div>

                        <h5 className="mt-4 py-2">Mô tả chi tiết:</h5>
                        <p className="text-muted">
                          {designedProduct.description}
                        </p>

                        <hr className="my-0" />
                        <div>
                          <div className="row mt-4 pt-2">
                            <div className="col-lg-8 col-12">
                              <div className="d-flex align-items-center ">
                                <h6 className="mb-0">Chọn màu:</h6>

                                <ul className="list-unstyled mb-0 ms-3">
                                  {colorList.map((color) => (
                                    <li
                                      key={color.split("-")[0]}
                                      className="list-inline-item ms-1"
                                    >
                                      <div
                                        className={` ${
                                          color.split("-")[0] ===
                                            selectedColor && "border-blue"
                                        }`}
                                        onClick={() => {
                                          setSelectedColorSize(color);
                                          setSelectedColor(color.split("-")[0]);
                                          setSelectedColorImage(
                                            color.split("-")[1]
                                          );
                                          setIsError(false);
                                        }}
                                      >
                                        <img
                                          width={30}
                                          height={30}
                                          className="rounded-circle border"
                                          src={
                                            "/asset/images/image_default/color-base.png"
                                          }
                                          style={{
                                            backgroundColor:
                                              color.split("-")[1],
                                            opacity: "0.8",
                                          }}
                                          alt={color.split("-")[0]}
                                        />
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {isError && !selectedColor && (
                                <p className="text-warning">
                                  Vui lòng chọn màu áo
                                </p>
                              )}
                            </div>
                            {/*end col*/}
                            <div className="col-lg-4 col-12 mt-4 mt-lg-0">
                              <div className="d-flex shop-list align-items-center">
                                <h6 className="mb-0">Số lượng:</h6>
                                <div className="qty-icons ms-3 d-flex">
                                  <button
                                    className={`btn btn-icon btn-soft-primary minus ${
                                      quantity == 1 && "disabled"
                                    } ${cart && !cart.publish && " disabled"}`}
                                    onClick={() => setQuantity(quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <input
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e: any) =>
                                      handleChangeQuantity(
                                        Number(e.target.value)
                                      )
                                    }
                                    className="input-quantity mt-0"
                                  />
                                  <button
                                    className={`btn btn-icon btn-soft-primary plus  ${
                                      cart && !cart.publish && " disabled"
                                    }`}
                                    onClick={() => setQuantity(quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                          {sizeList.length > 0 && (
                            <div className="row">
                              <div className="col-lg-8 col-12  d-flex align-items-center pt-4 w-75">
                                <h6 className="mb-0">Size:</h6>
                                <ul className="list-unstyled mb-0 ms-3">
                                  {sizeList.map(({ size }) => (
                                    <li
                                      key={size}
                                      className="list-inline-item ms-1"
                                    >
                                      <button
                                        className={`${
                                          size === selectedSize
                                            ? `is-select`
                                            : "my-button"
                                        }`}
                                        onClick={() => {
                                          setSelectedSize(size);
                                          setIsError(false);
                                        }}
                                      >
                                        {size}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="col-lg-4 col-12 d-flex align-items-center justify-content-start p-0 mt-4">
                                <button
                                  className="btn btn-link text-dark"
                                  onClick={() => showSize()}
                                >
                                  <u>Bảng size</u>
                                </button>
                              </div>
                            </div>
                          )}
                          {isError && !selectedSize && selectedColor && (
                            <p className="text-warning">
                              Vui lòng chọn size áo
                            </p>
                          )}

                          <div className="mt-4 pt-2 d-flex justify-content-between">
                            <div className="">
                              <button
                                className="btn btn-soft-primary"
                                onClick={checkout}
                              >
                                Xem giỏ hàng
                              </button>
                              <button
                                className="btn btn-soft-primary ms-2"
                                onClick={() => updateQuantity(quantity)}
                              >
                                Thêm vào giỏ hàng
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4 pt-2">
                          <div className="col-lg-6 col-12">
                            <div className="d-flex align-items-center"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <UserRating id={design} />
                </div>

                {/* <>
                  <section className="factory">
                    <div className="container">
                      <div className="card">
                        <div className="card-header no-factory">
                          No factory sell this product yet.
                        </div>
                      </div>
                    </div>
                  </section>
                </> */}
              </section>
            </div>
          )}
        </div>
      )}
    </>
  );
}
DesignedProductDetail.Layout = PageWithHero;
