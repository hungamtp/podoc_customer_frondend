/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/layouts";
import Cart from "@/components/common/cart";
import { setCartNotEnough, resetCartNotEnough } from "@/redux/slices/checkCart";
import { useAppSelector, useAppDispatch } from "@/components/hooks/reduxHook";
import useCheckCart from "@/hooks/api/cart/use-check-cart";
import { useRouter } from "next/router";
import { Dialog, DialogContent } from "@material-ui/core";
import Link from "next/link";
import { numberWithCommas } from "helper/number-util";
import UseCart from "@/hooks/api/cart/use-cart";
import { setCart } from "@/redux/slices/cart";
type Props = {};

export default function Carts({}: Props) {
  const { mutate: responseCart, isLoading: isCartLoading } = UseCart();
  useEffect(() => {
    responseCart("");
  }, []);
  const carts = useAppSelector((state) => state.carts);
  const haveProduct = carts?.length != 0;
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { mutate: checkCart, isLoading, error } = useCheckCart();

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleProceed = () => {
    if (auth.isAuth)
      checkCart(carts, {
        onSuccess: (data) => {
          dispatch(setCartNotEnough([data]));
          router.push("/checkout");
        },
        onError: (data) => {
          dispatch(setCartNotEnough(data));
        },
      });
    else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <section className="bg-half-170 bg-light d-table w-100">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h2 className="title mb-0">Giỏ hàng</h2>
              </div>
            </div>
          </div>

          <div className="position-breadcrumb">
            <nav aria-label="breadcrumb" className="d-inline-block">
              <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <a>PODOC</a>
                  </Link>
                </li>
                <li className="breadcrumb-item active">Giỏ hàng</li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
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
            ></path>
          </svg>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive bg-white shadow rounded">
                {carts?.length == 0 ? (
                  <h4 className="warning-cart-text">
                    Chưa có sản phẩm nào trong giỏ hàng
                  </h4>
                ) : (
                  <table className="table mb-0 table-center">
                    <thead>
                      <tr>
                        <th
                          className="border-bottom py-3"
                          style={{ minWidth: "20px" }}
                        ></th>
                        <th
                          className="border-bottom text-start ps-5 py-3"
                          style={{ minWidth: "200px", width: "250px" }}
                        >
                          Sản phẩm
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "50px" }}
                        >
                          Kích thước
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "50px" }}
                        >
                          Màu
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "50px" }}
                        >
                          Giá(VND)
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "100px" }}
                        >
                          Số lượng
                        </th>
                        <th
                          className="border-bottom text-end py-3 pe-4"
                          style={{ minWidth: "100px" }}
                        >
                          Tổng (VND)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {carts?.map((cart) => {
                        return <Cart key={cart.id} cart={cart} />;
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              {haveProduct && (
                <div className="row">
                  <div className="col-lg-8 col-md-6 mt-4 pt-2">
                    <Link href="/designs">
                      <a className="btn btn-primary">Tiếp tục mua hàng</a>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 ms-auto mt-4 pt-2">
                    <div className="table-responsive bg-white rounded shadow">
                      <table className="table table-center table-padding mb-0">
                        <tbody>
                          <tr>
                            <td className="h6 ps-4 py-3">Tổng </td>
                            <td className="text-end fw-bold pe-4">
                              {numberWithCommas(
                                carts.reduce(
                                  (totalSum, a) =>
                                    totalSum + a.quantity * a.price,
                                  0
                                )
                              )}{" "}
                              VND
                            </td>
                          </tr>

                          {/* <tr className="bg-light">
                            <td className="h6 ps-4 py-3">Thành tiền</td>
                            <td className="text-end fw-bold pe-4">
                              {numberWithCommas(
                                carts.reduce(
                                  (totalSum, a) =>
                                    totalSum + a.quantity * a.price,
                                  0
                                )
                              )}{" "}
                              VND
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-3  text-end">
                      <button
                        className="btn btn-primary"
                        onClick={handleProceed}
                      >
                        Tiến hành thanh toán
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
                  <div className="row mb-3">
                    <label htmlFor="basic-icon-default-fullname" className="h4">
                      Bạn cần phải đăng nhập để có thể thanh toán, bạn có đồng ý
                      không?
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div className="col-sm-10 d-flex justify-content-around">
                      <button
                        className="btn btn-primary"
                        color="primary"
                        onClick={() => router.push("/login")}
                      >
                        Đồng ý
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
      </section>
    </>
  );
}
Carts.Layout = MainLayout;
