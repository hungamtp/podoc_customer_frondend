/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MainLayout } from "@/components/layouts";
import Cart from "@/components/common/cart";
import { setCartNotEnough, resetCartNotEnough } from "@/redux/slices/checkCart";
import { useAppSelector, useAppDispatch } from "@/components/hooks/reduxHook";
import useCheckCart from "@/hooks/api/cart/use-check-cart";
import { useRouter } from "next/router";
import { Dialog, DialogContent } from "@material-ui/core";
import Link from "next/link";
type Props = {};

export default function Carts({}: Props) {
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
          dispatch(setCartNotEnough(data));
          if (data.length == 0) {
            dispatch(setCartNotEnough([]));
            router.push("/checkout");
          }
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
                <h2 className="title mb-0">Cart</h2>
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
                <li className="breadcrumb-item active">Cart</li>
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
                    Ch??a c?? s???n ph???m n??o trong gi??? h??ng
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
                          className="border-bottom text-start py-3"
                          style={{ minWidth: "200px" }}
                        >
                          S???n ph???m
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "50px" }}
                        >
                          K??ch th?????c
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "50px" }}
                        >
                          M??u
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "50px" }}
                        >
                          Gi??
                        </th>
                        <th
                          className="border-bottom text-center py-3"
                          style={{ minWidth: "100px" }}
                        >
                          S??? l?????ng
                        </th>
                        <th
                          className="border-bottom text-end py-3 pe-4"
                          style={{ minWidth: "100px" }}
                        >
                          T???ng (VND)
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
                      <a className="btn btn-primary">Ti???p t???c mua h??ng</a>
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-6 ms-auto mt-4 pt-2">
                    <div className="table-responsive bg-white rounded shadow">
                      <table className="table table-center table-padding mb-0">
                        <tbody>
                          <tr>
                            <td className="h6 ps-4 py-3">T???ng </td>
                            <td className="text-end fw-bold pe-4">
                              {carts.reduce(
                                (totalSum, a) =>
                                  totalSum + a.quantity * a.price,
                                0
                              )}{" "}
                              VND
                            </td>
                          </tr>
                          <tr>
                            <td className="h6 ps-4 py-3">Coupon</td>
                            <td className="text-end fw-bold pe-4">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  aria-label="Recipient's username"
                                  aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-light">
                            <td className="h6 ps-4 py-3">Th??nh ti???n</td>
                            <td className="text-end fw-bold pe-4">
                              {carts.reduce(
                                (totalSum, a) =>
                                  totalSum + a.quantity * a.price,
                                0
                              )}{" "}
                              VND
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 pt-2 text-end">
                      <button
                        className="btn btn-primary"
                        onClick={handleProceed}
                      >
                        Ti???n h??nh thanh to??n
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
                      B???n c???n ph???i ????ng nh???p ????? c?? th??? thanh to??n, b???n c?? ?????ng ??
                      kh??ng?
                    </label>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div className="col-sm-10 d-flex justify-content-around">
                      <button
                        className="btn btn-primary"
                        color="primary"
                        onClick={() => router.push("/login")}
                      >
                        ?????ng ??
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCloseDialog}
                        autoFocus
                        type="button"
                      >
                        Kh??ng
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
