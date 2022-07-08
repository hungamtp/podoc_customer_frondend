import { MainLayout } from "@/components/layouts";
import React, { useEffect, useState } from "react";
import useCreatePaymentTransaction from "@/hooks/api/order/use-create-transaction";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, DialogContent } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { ShippingInfo } from "@/services/order/dto";
import useAddOrder from "@/hooks/api/order/use-create-order";
import { useAppSelector } from "@/components/hooks/reduxHook";
import useGetAllShippingInfo from "@/hooks/api/order/use-get-all-shipping-infor";

type Props = {};

const shippingArray = [
  {
    name: "Nguyen Minh Hieu",
    email: "hieuthomnghiep@gmail.com",
    address: "thai binh que anh",
    phone: "0907543291",
  },
  {
    name: "Nguyen Van Tai",
    email: "nguyenvantai@gmail.com",
    address: "ca mau que anh",
    phone: "0907543291",
  },
  {
    name: "Nguyen Van Ttuan",
    email: "nguyenvantuan@gmail.com",
    address: "thai thuy que anh",
    phone: "0907543291",
  },
];

export default function Checkout({}: Props) {
  const handleOrder = async () => {};
  const { data: shippingInfos, isLoading: isLoadingShippingInfos } =
    useGetAllShippingInfo();
  const cart = useAppSelector((state) => state.carts);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const {
    mutate: createPaymentTransaction,
    isLoading,
    error,
  } = useCreatePaymentTransaction();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .min(8, "Email cần ít nhất 8 kí tự")
      .max(50, "Email tối đa 50 kí tự")
      .required("Email không được để trống"),
    address: yup
      .string()
      .min(8, "Email cần ít nhất 8 kí tự")
      .max(26, "Email tối đa 50 kí tự"),
    name: yup
      .string()
      .min(8, "Tên cần ít nhất 8 kí tự")
      .max(26, "Tên tối đa 50 kí tự")
      .required("Tên không được để trống"),
    phone: yup
      .string()
      .min(8, "Số điện thoại cần ít nhất 8 kí tự")
      .max(26, "Số điện thoại tối đa 50 kí tự")
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const submit: SubmitHandler<ShippingInfo> = (data) => {
    createOrder(
      { shippingInfo: data, paymentMethod: 0 },
      {
        onSuccess: (data) => {
          // const qrCode = $($.parseHTML)
          // const rp = fetch(data.data.payUrl).then(response => response.json())
          // .then(data => console.log(data))
          window.open(
            data.data.payUrl,
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=800"
          );
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
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> Checkouts </h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <a href="index.html">Landrick</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="home">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Checkouts
                  </li>
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
                    <span className="h5 mb-0">Your cart</span>
                    <span className="badge bg-primary rounded-pill">3</span>
                  </div>
                  <ul className="list-group mb-3 border">
                    <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                      <div>
                        <h6 className="my-0">Product name</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$12</span>
                    </li>
                    <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                      <div>
                        <h6 className="my-0">Second product</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$8</span>
                    </li>
                    <li className="d-flex justify-content-between lh-sm p-3 border-bottom">
                      <div>
                        <h6 className="my-0">Third item</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$5</span>
                    </li>
                    <li className="d-flex justify-content-between bg-light p-3 border-bottom">
                      <div className="text-success">
                        <h6 className="my-0">Promo code</h6>
                        <small>EXAMPLECODE</small>
                      </div>
                      <span className="text-success">−$5</span>
                    </li>
                    <li className="d-flex justify-content-between p-3">
                      <span>Total (USD)</span>
                      <strong>$20</strong>
                    </li>
                  </ul>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Promo code"
                    />
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </div>
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
                    {shippingInfos && (
                      <button
                        className="btn btn-secondary"
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
                        Chọn địa chỉ khác
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
                        {...register("name")}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name.message}
                        </div>
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
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">
                          {errors.phone.message}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        id="email"
                        className="form-control"
                        placeholder="you@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
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
                        {...register("address")}
                      />
                      {errors.address && (
                        <div className="invalid-feedback">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-check mt-4 pt-4 border-top">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="same-address"
                      {...register("shouldSave")}
                    />
                    <label className="form-check-label" htmlFor="same-address">
                      Lưu lại địa chỉ giao hàng
                    </label>
                  </div>

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

                  <h4 className="mb-3 mt-4 pt-4 border-top">Payment</h4>
                  <div className="checkout-button">
                    <div className="checkout-selector">
                      <input
                        type="radio"
                        className="btn btn-m2 btn-checkout btn-logo-inline"
                      />
                    </div>
                    <div
                      className="content"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span className="checkout-title">Thanh toán bằng</span>
                      <img
                        src="asset/images/momologo.svg"
                        width="25"
                        alt="momo"
                      />
                    </div>
                  </div>
                  <button className="w-100 btn btn-primary" type="submit">
                    Continue to checkout
                  </button>
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

Checkout.Layout = MainLayout;
