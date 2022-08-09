/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Badge } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { setCart } from "@/redux/slices/cart";
import { logout } from "@/redux/slices/auth";
import { CartDetailDTO } from "@/services/type.dto";
import Link from "next/link";
import Image from "next/image";
import UseCart from "@/hooks/api/cart/use-cart";
import { numberWithCommas } from "helper/number-util";
type Props = {};

export default function Header({}: Props) {
  const [itemCount, setItemCount] = React.useState(1);

  const cart = useAppSelector((state) => state.carts);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logoutFunc = () => {
    dispatch(setCart([]));
    dispatch(logout([]));
    router.push("/");
  };
  function toggleMenu(): void {
    var isOpen = document.getElementById("navigation");
    if (isOpen) {
      if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
      } else {
        isOpen.style.display = "block";
      }
    }
  }
  const router = useRouter();
  return (
    <div>
      <div id="topnav" className="bg-light">
        <div className="container">
          <a className="logo" href="/">
            <img
              src="/asset/images/logo_man.png"
              height="60"
              className="logo-light-mode"
              alt=""
            />
          </a>

          <div className="menu-extras">
            <div className="menu-item">
              <a className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0">
            <li className="list-inline-item mb-0">
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-icon btn-pills btn-primary  dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Badge
                    color="secondary"
                    badgeContent={cart.reduce((total, orderDetail) => {
                      return total + orderDetail.quantity;
                    }, 0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                  </Badge>
                </button>

                <div
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-1 p-4"
                  style={{ width: "300px" }}
                >
                  <div className="pb-4">
                    {cart.length != 0 &&
                      cart &&
                      cart.slice(0, 3).map((cart) => {
                        return (
                          <a
                            key={cart.id}
                            href=" "
                            className="d-flex align-items-center "
                          >
                            <div className="w-25">
                              <Image
                                src={
                                  cart.designedImage != ""
                                    ? cart.designedImage
                                    : ""
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src =
                                    "/asset/images/image_default/image_default.png";
                                }}
                                className="shadow rounded"
                                width={1000}
                                height={1000}
                                objectFit="cover"
                                alt="productImage"
                              />
                            </div>

                            <div className="flex-1 text-start ms-3">
                              <h6 className="text-dark mb-0">
                                {cart.designedProductName} ({cart.size})
                              </h6>
                              <p className="text-muted mb-0">
                                {numberWithCommas(cart.price)} X {cart.quantity}
                              </p>
                            </div>
                            <h6 className="text-dark mb-0">
                              {numberWithCommas(cart.price * cart.quantity)}
                            </h6>
                          </a>
                        );
                      })}
                    <div
                      className="text-dark mb-0  "
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "20px",
                        fontStyle: "italic",
                      }}
                    >
                      {cart.length > 0
                        ? `Bạn có ${cart.reduce((total, orderDetail) => {
                            return total + orderDetail.quantity;
                          }, 0)} sản phẩm trong giỏ hàng`
                        : "Giỏ hàng trống"}
                    </div>
                  </div>

                  <div className="  text-center">
                    {cart.length > 0 && (
                      <Link href="/carts">
                        <a className="btn btn-primary me-2">Xem giỏ hàng</a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
            <li className="list-inline-item mb-0"> &nbsp;</li>
            <li className="list-inline-item mb-0">
              <div className="dropdown dropdown-primary">
                {auth.isAuth ? (
                  <button
                    type="button"
                    className="btn rounded btn-icon btn-pills  dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src={auth.image != null ? auth.image : ""}
                      alt="hihi"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "/asset/images/avatardefault_92824.png";
                      }}
                      style={{ borderRadius: "35px" }}
                      height={35}
                      width={35}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-icon btn-pills btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                  </button>
                )}

                <div
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow rounded border-0 mt-1 py-3"
                  style={{ width: "200px" }}
                >
                  {auth.isAuth ? (
                    <div>
                      <Link href="/account">
                        <a className="dropdown-item text-dark">
                          <i className="uil uil-user align-middle me-1"></i> Tài
                          khoản
                        </a>
                      </Link>
                      <Link href="/account/all-order-detail">
                        <a className="dropdown-item text-dark mt-2">
                          <i className="uil uil-clipboard-notes h5 me-1" /> Lịch
                          sử mua hàng
                        </a>
                      </Link>

                      <Link href="/account/mydesign">
                        <a className="dropdown-item text-dark mt-2">
                          <svg
                            className="me-1 mb-0 h5"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width={20}
                            height={24}
                            viewBox="0 0 295.526 295.526"
                            xmlSpace="preserve"
                          >
                            <g>
                              <path
                                d="M147.763,44.074c12.801,0,23.858-8.162,27.83-20.169c-7.578,2.086-17.237,3.345-27.83,3.345
		                            c-10.592,0-20.251-1.259-27.828-3.345C123.905,35.911,134.961,44.074,147.763,44.074z"
                              />
                              <path
                                d="M295.158,58.839c-0.608-1.706-1.873-3.109-3.521-3.873l-56.343-26.01c-11.985-4.06-24.195-7.267-36.524-9.611
		                            c-0.434-0.085-0.866-0.126-1.292-0.126c-3.052,0-5.785,2.107-6.465,5.197c-4.502,19.82-22.047,34.659-43.251,34.659
		                            c-21.203,0-38.749-14.838-43.25-34.659c-0.688-3.09-3.416-5.197-6.466-5.197c-0.426,0-0.858,0.041-1.292,0.126
		                            c-12.328,2.344-24.538,5.551-36.542,9.611L3.889,54.965c-1.658,0.764-2.932,2.167-3.511,3.873
		                            c-0.599,1.726-0.491,3.589,0.353,5.217l24.46,48.272c1.145,2.291,3.474,3.666,5.938,3.666c0.636,0,1.281-0.092,1.917-0.283
		                            l27.167-8.052v161.97c0,3.678,3.001,6.678,6.689,6.678h161.723c3.678,0,6.67-3.001,6.67-6.678V107.66l27.186,8.052
		                            c0.636,0.191,1.28,0.283,1.915,0.283c2.459,0,4.779-1.375,5.94-3.666l24.469-48.272C295.629,62.428,295.747,60.565,295.158,58.839z
		                          "
                              />
                            </g>
                          </svg>{" "}
                          Thiết kế của tôi
                        </a>
                      </Link>

                      <div className="dropdown-divider my-3 border-top"></div>
                      <a
                        className="dropdown-item text-dark cursor-pointer"
                        onClick={logoutFunc}
                      >
                        <i className="uil uil-sign-out-alt align-middle me-1"></i>{" "}
                        Đăng xuất
                      </a>
                    </div>
                  ) : (
                    <Link href="/login">
                      <a className="dropdown-item text-dark" href="#">
                        <i className="uil uil-user align-middle me-1"></i> Đăng
                        nhập
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </li>
          </ul>

          <div id="navigation">
            <ul className="navigation-menu">
              <li>
                <Link href="/" className="sub-menu-item">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/designs" className="sub-menu-item">
                  Thiết kế có sẵn
                </Link>
              </li>

              <li>
                <Link href="/raw-products" className="sub-menu-item">
                  Tự thiết kế
                </Link>
              </li>
              <li>
                <Link href="/about" className="sub-menu-item">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
