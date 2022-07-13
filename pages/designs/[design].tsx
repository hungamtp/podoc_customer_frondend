/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { PageWithHero } from "@/components/layouts/page-with-hero";
import useAddToCart from "@/hooks/api/cart/use-add-to-cart";
import useUpdateCart from "@/hooks/api/cart/use-update-cart";
import useGetOthersDesignById from "@/hooks/api/design/use-get-others-design-by-id";
import {
  updateQuantityCartDetail,
  addNewCartDetail,
  setCart as setCartRedux,
} from "@/redux/slices/cart";
import { AddToCartDTO, CartDetailDTO } from "@/services/type.dto";
import { nanoid } from "@reduxjs/toolkit";
import { numberWithCommas } from "helper/number-util";
import { useRouter } from "next/router";
import * as React from "react";
import { string } from "yup";

export default function DesignedProductDetail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { design }: any = router.query;
  const auth = useAppSelector((state) => state.auth);

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
  const [selectedColorSize, setSelectedColorSize] = React.useState<string>("");
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
      }
    }
  }, [designedProduct]);

  React.useEffect(() => {
    if (!!designedProduct) {
      if (!!designedProduct.colorAndSizes) {
        setSizeList(designedProduct.colorAndSizes[selectedColorSize]);
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

  const updateQuantity = (newQuantity: number) => {
    const indentity = selectedColor + selectedSize;
    const cartDetailExisted = carts.some((cart) => {
      setCart(cart);
      return `${cart.color + cart.size}` === indentity;
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
    if (auth.isAuth) addToCart(newCartDetail);
    else {
      const reduxCartDetail = {
        id: nanoid(),
        cartId: nanoid(),
        designedProductId: designedProduct?.id,
        designedProductName: designedProduct?.name,
        designedImage: designedProduct?.imagePreviews[0].image,
        size: selectedSize,
        color: selectedColor,
        quantity: newQuantity,
        price: designedProduct?.price,
        publish: true,
      };
      dispatch(addNewCartDetail(reduxCartDetail));
    }
  };

  const updateCartDetailQuantity = (newQuantity: number) => {
    if (cart) {
      dispatch(updateQuantityCartDetail({ ...cart, quantity: newQuantity }));
      setQuantity(newQuantity);
      const newCart: CartDetailDTO[] = [];
      carts.forEach((cartDetail) => {
        if (cartDetail.id != cart.id) {
          newCart.push(cartDetail);
        }
      });
      newCart.push({ ...cart, quantity: newQuantity });
      dispatch(setCartRedux(newCart));
      updateCart(newCart);
    }
  };

  const getRates = (rate: number): number[] => {
    let result = [];
    rate = Math.ceil(rate);
    for (var i = 1; i <= rate; i++) {
      result.push(i);
    }
    return result;
  };
  const getUnRates = (rate: number): number[] => {
    let result = [];
    rate = Math.ceil(rate);
    for (var i = 1; i <= 5 - rate; i++) {
      result.push(i);
    }
    return result;
  };
  const goToProfile = (userId: string) => {
    console.log(userId);
  };

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          {designedProduct && (
            <div>
              <section className="section pb-0">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <div className="tiny-single-item">
                        <div className="tiny-slide">
                          <img
                            src={designedProduct.imagePreviews[0].image}
                            className="img-fluid rounded"
                            alt="productImage"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                      <div className="section-title ms-md-4">
                        <h4 className="title"> {designedProduct.name}</h4>
                        <div className="d-flex">
                          <ul className="list-unstyled">
                            {getRates(designedProduct.rating).map((rate) => {
                              return (
                                <li
                                  key={rate}
                                  className="list-inline-item text-warning "
                                >
                                  <i className="mdi mdi-star"></i>
                                </li>
                              );
                            })}
                            {getUnRates(designedProduct.rating).map((rate) => {
                              return (
                                <li key={rate} className="list-inline-item">
                                  <i className="mdi mdi-star"></i>
                                </li>
                              );
                            })}
                          </ul>
                          <span className="list-unstyled text-warning  ">
                            ({designedProduct.rating})
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            {numberWithCommas(designedProduct.price)} VND
                          </h6>
                        </div>
                        <div>
                          <span className="sold-number ">
                            Đã bán {designedProduct.sold}
                          </span>
                        </div>
                        <div className="designer cursor-pointer">
                          Thiết kế bởi{" "}
                          <span
                            onClick={() => goToProfile(designedProduct.user.id)}
                          >
                            <b>
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
                            <div className="col-lg-6 col-12">
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
                                          setIsError(false);
                                        }}
                                      >
                                        <img
                                          width={30}
                                          height={30}
                                          className="rounded-circle border"
                                          src={
                                            "https://images.printify.com/5853fec7ce46f30f8328200a"
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
                                <p className="text-danger">
                                  Vui lòng chọn màu áo
                                </p>
                              )}
                              {sizeList.length > 0 && (
                                <div className="d-flex align-items-center pt-4">
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
                              )}
                              {isError && !selectedSize && selectedColor && (
                                <p className="text-danger">
                                  Vui lòng chọn size áo
                                </p>
                              )}
                            </div>
                            {/*end col*/}
                            <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                              <div className="d-flex shop-list align-items-center">
                                <h6 className="mb-0">Số lượng:</h6>
                                <div className="qty-icons ms-3">
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
                                      setQuantity(Number(e.target.value))
                                    }
                                    className="btn btn-icon btn-soft-primary qty-btn quantity"
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
                          <div className="mt-4 pt-2">
                            <button
                              className="btn btn-primary"
                              onClick={() => router.push("/carts")}
                            >
                              Mua sản phẩm
                            </button>
                            <button
                              className="btn btn-soft-primary ms-2"
                              onClick={() => updateQuantity(quantity)}
                            >
                              Thêm vào giỏ hàng
                            </button>
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
