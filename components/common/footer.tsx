/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
import useCategory from "@/hooks/api/use-category";
import Link from "next/link";
import React from "react";
import CartIcon from "../../icons/cart-icon";
import EyeIcon from "../../icons/eye-icon";
import HeaerIcon from "../../icons/heart-icon";

type Props = {};

export default function Footer({}: Props) {
  const { data: categories, isLoading: isCategoryLoading } = useCategory();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-60">
              <div className="row">
                <div className="col-lg-3 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                  <p className="mt-4">
                    PODOC sẽ mang đến cho bạn một trải nghiệm tốt nhất.
                  </p>
                  <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                    <li className="list-inline-item">
                      <a href=" " className="rounded">
                        <HeaerIcon />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href=" " className="rounded">
                        <EyeIcon />
                      </a>
                    </li>

                    <li className="list-inline-item">
                      <a href=" " className="rounded">
                        <CartIcon />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12 mb-4 pb-2">
                      <h5 className="footer-head mb-0">Shopping & Clothes</h5>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12">
                      <ul className="list-unstyled footer-list">
                        {!isCategoryLoading &&
                          categories &&
                          categories.slice(0, 6).map((category) => (
                            <li key={category.id}>
                              <a href="#" className="text-foot">
                                <i className="uil uil-angle-right-b me-1"></i>{" "}
                                {category.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {!isCategoryLoading &&
                      categories?.slice(6, 13).length != 0 &&
                      categories?.slice(6, 13).map((category) => (
                        <div
                          key={category.id}
                          className="col-lg-4 col-md-4 col-12 mt-2 mt-sm-0"
                        >
                          <ul className="list-unstyled footer-list">
                            <li>
                              <a href="#" className="text-foot">
                                <i className="uil uil-angle-right-b me-1"></i>{" "}
                                {category.name}
                              </a>
                            </li>
                          </ul>
                        </div>
                      ))}

                    <div className="col-lg-4 col-md-4 col-12 mt-2 mt-sm-0">
                      <ul className="list-unstyled footer-list">
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i>Tài
                            khoản{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i>
                            Lịch sử mua hàng{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foot">
                            <i className="uil uil-angle-right-b me-1"></i>
                            Thiết kế của tôi{" "}
                          </a>
                        </li>

                        <li>
                          <Link href="\">
                            <a className="text-foot">
                              <i className="uil uil-angle-right-b me-1"></i>
                              Returns
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12 mt-4 mt-lg-0 pt-2 pt-lg-0">
                  <h5 className="footer-head">Newsletter</h5>
                  <p className="mt-4">
                    Đăng ký để nhận các thông tin mới từ PODOC qua email.
                  </p>
                  <form>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="foot-subscribe mb-3">
                          <label className="form-label">
                            Nhập email của bạn{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="form-icon position-relative">
                            <i className="bi bi-envelope"></i>
                            <input
                              type="email"
                              name="email"
                              id="emailsubscribe"
                              className="form-control ps-5 rounded"
                              placeholder="email : "
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="d-grid">
                          <input
                            type="submit"
                            id="submitsubscribe"
                            name="send"
                            className="btn btn-soft-primary"
                            value="Đăng ký"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-30 footer-border">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-truck align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Giao hàng nhanh</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-user-arrows align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Hỗ trợ 24/7</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-transaction align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Thanh toán online</h6>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <i className="uil uil-shield-check align-middle h5 mb-0 me-2"></i>
                      <h6 className="mb-0">Bảo mật thanh toán</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-py-30 footer-border">
              <div className="container text-center">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <div className="text-sm-start">
                      <p className="mb-0">
                        <strong>
                          @2022-Let your creativity on your T-shirt
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <ul className="list-unstyled text-sm-end mb-0">
                      <li className="list-inline-item">
                        <a href=" ">
                          <img
                            src="asset/images/payments/american-ex.png"
                            className="avatar avatar-ex-sm"
                            title="American Express"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img
                            src="asset/images/payments/discover.png"
                            className="avatar avatar-ex-sm"
                            title="Discover"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img
                            src="asset/images/payments/master-card.png"
                            className="avatar avatar-ex-sm"
                            title="Master Card"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img
                            src="asset/images/payments/paypal.png"
                            className="avatar avatar-ex-sm"
                            title="Paypal"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href=" ">
                          <img
                            src="asset/images/payments/visa.png"
                            className="avatar avatar-ex-sm"
                            title="Visa"
                            alt=""
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
