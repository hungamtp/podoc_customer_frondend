/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/components/hooks/reduxHook";
import { CheckoutLayout } from "@/components/layouts";
import useGetAccountById from "@/hooks/api/account/use-account-by-id";
import useAddOrder from "@/hooks/api/order/use-create-order";
import useCreatePaymentTransaction from "@/hooks/api/order/use-create-transaction";
import useGetAllShippingInfo from "@/hooks/api/order/use-get-all-shipping-infor";
import { setCart } from "@/redux/slices/cart";
import { ShippingInfo } from "@/services/order/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

type Props = {};

export default function Checkout({}: Props) {
  const handleOrder = async () => {};
  const { data: shippingInfos, isLoading: isLoadingShippingInfos } =
    useGetAllShippingInfo();
  const cart = useAppSelector((state) => state.carts);

  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(credentialId);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const [paymentMethod, setPaymentMethod] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    mutate: createPaymentTransaction,
    isLoading,
    error,
  } = useCreatePaymentTransaction();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .trim()
      .min(8, "Email cần ít nhất 8 chữ cái")
      .max(50, "Email tối đa 50 chữ cái")
      .required("Email không được để trống"),
    address: yup
      .string()
      .typeError("Địa chỉ đang trống, vui lòng nhập lại địa chỉ giao hàng")
      .trim()
      .min(8, "Địa chỉ cần ít nhất 8 chữ cái")
      .max(300, "Địa chỉ tối đa 300 chữ cái")
      .required("Địa chỉ giao hàng không được trống"),
    name: yup
      .string()
      .trim()
      .max(26, "Tên tối đa 50 chữ cái")
      .required("Tên không được để trống"),
    phone: yup
      .string()
      .trim()
      .matches(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        "Sai định dạng"
      )
      .required("Số điện thoại không được để trống"),
  });
  const form = useForm<ShippingInfo>({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      shouldSave: true,
    },
    resolver: yupResolver(schema),
  });

  const { mutate: createOrder, isLoading: isUpdatingInfo } = useAddOrder();
  const [isShowCancelReason, setIsShowCancelReason] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseAccount) {
      reset({
        name:
          responseAccount.data.userFirstName +
          " " +
          responseAccount.data.userLastName,
        email: responseAccount.data.email,
        address: responseAccount.data.address,
        phone: responseAccount.data.phone + "",
      });
      if (responseAccount.data.id) {
        setIsEdit(false);
      } else {
        setIsEdit(true);
      }
    }
  }, [responseAccount]);

  const submit: SubmitHandler<ShippingInfo> = (data) => {
    createOrder(
      { shippingInfo: data, paymentMethod: paymentMethod },
      {
        onSuccess: (data: any) => {
          dispatch(setCart([]));
          // set cart redux to null
          window.location.href = data.data.payUrl;
        },
        onError: () => {
          setIsShowCancelReason(true);
        },
      }
    );
  };

  const handleChange = (shipping: {
    name: string;
    email: string;
    address: string;
    phone: string;
  }) => {
    handleCloseDialog();
    reset(shipping);
  };

  const shippingInfosList = shippingInfos?.map((shipping) => (
    <div
      key={nanoid()}
      className="p-4 card rounded shadow mb-4 btn"
      onClick={() => handleChange(shipping)}
    >
      <div className="d-flex justify-content-between">
        <span className="">Tên khách hàng</span>
        <p className="text-left w-half">{shipping.name}</p>
      </div>
      <div className="d-flex justify-content-between">
        <span className="">Email</span>
        <p className="text-left w-half">{shipping.email}</p>
      </div>
      <div className="d-flex justify-content-between">
        <span className="">Địa chỉ</span>
        <p className="text-left w-half">{shipping.address}</p>
      </div>
      <div className="d-flex justify-content-between">
        <span className="">Số điện thoại</span>
        <p className="text-left w-half">{shipping.phone}</p>
      </div>
    </div>
  ));

  return (
    <>
      <Dialog
        open={isShowCancelReason}
        onClose={() => setIsShowCancelReason(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogContent>
          <div className="">
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
            <div className="h5 d-flex justify-content-center">
              Chúng tôi xin chân thành xin lỗi quý khách.
            </div>
            <div className=" d-flex justify-content-center">
              Một vài sản phẩm trong đơn hàng của quý khách đã bị gỡ xuống.
            </div>
            <div className=" d-flex justify-content-center">
              {`Để tiến hành thanh toán, vui lòng xóa sản phẩm ra khỏi giỏ hàng `}
            </div>
            <div className=" d-flex justify-content-center">
              {`hoặc chờ cho tới khi sản phẩm được đăng tải lại.`}
            </div>

            <div className=" d-flex justify-content-center">
              <button
                className="btn btn-primary ps-4 pe-4"
                onClick={() => {
                  setIsShowCancelReason(false);
                  router.replace("/carts");
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div>
        <section
          className="bg-half-170 bg-light d-table w-100"
          style={{
            background:
              "url('/asset/images/banner/banner_fixed.jpg') no-repeat center center",
            marginTop: "30px",
          }}
        >
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> Thanh toán </h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>PODOC</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link href="/carts">
                      <a>Giỏ hàng</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Thanh toán</li>
                </ul>
              </nav>
            </div>
          </div>{" "}
          {/*end container*/}
        </section>
        {/*end section*/}
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        {/* Hero End */}
        {/* Start */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-lg-4 order-md-last">
                <div className="card rounded shadow p-4 border-0">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0">Giỏ hàng của tôi</span>
                    <span className="badge bg-primary rounded-pill">
                      {cart.length}
                    </span>
                  </div>
                  <ul className="list-group mb-3 border">
                    {cart.map((cartDetail) => (
                      <li
                        key={cartDetail.id}
                        className="d-flex justify-content-between lh-sm p-3 border-bottom"
                      >
                        <div>
                          <h6 className="my-0">
                            {cartDetail.designedProductName}
                          </h6>
                          <div className="d-flex justify-content-around">
                            <small className="text-muted me-2">
                              {cartDetail.color}
                              {`-`}
                              {cartDetail.size}
                            </small>

                            <small className="text-muted">
                              {`Số lượng: `}
                              {cartDetail.quantity}
                            </small>
                          </div>
                        </div>
                        <span className="text-muted">
                          {numberWithCommas(cartDetail.price)}
                        </span>
                      </li>
                    ))}

                    {/* <li className="d-flex justify-content-between bg-light p-3 border-bottom">
                      <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                      </div>
                      <span className="text-success">−$5</span>
                    </li> */}
                    <li className="d-flex justify-content-between p-3">
                      <span>Tổng tiền (VND)</span>
                      <strong>
                        {numberWithCommas(
                          cart.reduce(
                            (totalSum, a) => totalSum + a.quantity * a.price,
                            0
                          )
                        )}
                      </strong>
                    </li>
                  </ul>
                  {/* <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Promo code"
                    />
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div> */}
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-7 col-lg-8">
                <form
                  className="card rounded shadow p-4 border-0"
                  onSubmit={handleSubmit(submit)}
                >
                  <div className="d-flex justify-content-between">
                    <h4 className="mb-3">Thông tin giao hàng</h4>
                    {shippingInfos && shippingInfos.length > 0 && isEdit && (
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                        color="secondary"
                      >
                        {/* {(isLoading || isLoadingSubmit) && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )} */}
                        Chọn địa chỉ có sẵn
                      </button>
                    )}
                  </div>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="name" className="form-label">
                        Họ và tên
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        disabled={!isEdit}
                        {...register("name")}
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name.message}</div>
                      )}
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="phone" className="form-label">
                        Số điện thoại
                      </label>
                      <input
                        id="phone"
                        type="text"
                        className="form-control"
                        disabled={!isEdit}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="text-danger">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        className="form-control"
                        disabled={!isEdit}
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="text-danger">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        disabled={!isEdit}
                        {...register("address")}
                      />
                      {errors.address && (
                        <div className="text-danger">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>
                  {isEdit ? (
                    <div className="form-check mt-4 pt-4 border-top">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="same-address"
                        {...register("shouldSave")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="same-address"
                      >
                        Lưu lại địa chỉ giao hàng
                      </label>
                    </div>
                  ) : (
                    <div
                      className="btn btn-primary mt-4 w-25"
                      onClick={() => setIsEdit(true)}
                    >
                      Chọn địa chỉ khác
                    </div>
                  )}

                  <Dialog
                    open={isOpen}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                  >
                    {shippingInfos && shippingInfos.length > 0 && (
                      <DialogContent>
                        <div className="overflow-y-scroll h-60">
                          {shippingInfosList}
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>

                  <h4 className="mb-3 mt-4 pt-4 border-top">
                    Phương thức thanh toán
                  </h4>
                  <label htmlFor="btn-check-momo">
                    <div className="d-flex ">
                      <div className="checkout-button-momo my-3">
                        <div className="checkout-selector">
                          <input
                            id="btn-check-momo"
                            checked={paymentMethod == 0}
                            onChange={() => setPaymentMethod(0)}
                            type="radio"
                            className="btn btn-m2 btn-checkout btn-logo-inline"
                          />
                        </div>
                        <div className="checkout-content">
                          <span className="checkout-title">
                            Thanh toán bằng
                          </span>
                          <Image
                            src={"/asset/images/momologo.svg"}
                            className="img-fluid"
                            width={50}
                            height={50}
                            objectFit="contain"
                            alt="productImage"
                          />
                        </div>
                      </div>
                    </div>
                  </label>
                  <label htmlFor="btn-check-zalo">
                    <div className="d-flex ">
                      <div className="checkout-button-zalo my-3">
                        <div className="checkout-selector">
                          <input
                            type="radio"
                            id="btn-check-zalo"
                            checked={paymentMethod == 1}
                            onChange={() => setPaymentMethod(1)}
                            className="btn btn-m2 btn-checkout btn-logo-inline"
                          />
                        </div>
                        <div className="checkout-content">
                          <span className="checkout-title">
                            Thanh toán bằng Zalo
                          </span>
                          <Image
                            src={"/asset/images/zalopay.png"}
                            className="img-fluid"
                            width={50}
                            height={50}
                            objectFit="cover"
                            alt="productImage"
                          />
                        </div>
                      </div>
                    </div>
                  </label>
                  <div className="w-100 d-flex ">
                    <button className="w-50 btn btn-primary mt-1" type="submit">
                      Tiếp tục thanh toán
                    </button>
                  </div>
                </form>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
        {/* End */}
      </div>
    </>
  );
}

Checkout.Layout = CheckoutLayout;
