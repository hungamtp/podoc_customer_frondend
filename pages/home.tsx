/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MainLayout } from "@/components/layouts";
import { useGetHighestRateDesign } from "@/hooks/api/use-get-highest-rate-design";
import DesignedProducts from "@/components/common/designed-products";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import Link from "next/link";
type Props = {};

export default function HomePage({}: Props) {
  const { data: response, isLoading: isLoadingAccount } =
    useGetHighestRateDesign();
  const dispatch = useAppDispatch();
  return (
    <>
      <section className="home-slider position-relative">
        <div
          id="carouselExampleInterval"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <div
                className="bg-home slider-rtl-2 d-flex align-items-center"
                style={{
                  background: "url('asset/images/shop/bg2.jpg') center center",
                }}
              >
                <div className="bg-overlay bg-overlay-white opacity-5"></div>
                <div className="container">
                  <div className="row align-items-center mt-5">
                    <div className="col-lg-7 col-md-7">
                      <div className="title-heading mt-4">
                        <h1 className="display-4 title-white fw-bold mb-3">
                          Print On Demand Of Customer
                        </h1>
                        <p className="para-desc text-dark title-white">
                          In theo yêu cầu là một công nghệ in và quy trình kinh
                          doanh trong đó các bản sao sách không được in cho đến
                          khi công ty nhận được một đơn đặt hàng, cho phép in số
                          lượng đơn hoặc số lượng nhỏ..
                        </p>
                        <div className="mt-4">
                          <Link href="\designs">
                            <a className="btn btn-soft-primary">Mua ngay</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="3000">
              <div
                className="bg-home slider-rtl-1 d-flex align-items-center "
                style={{
                  background: "url('asset/images/shop/hp-2.png') center center",
                  backgroundSize: "1500px 850px",
                }}
              >
                <div className="bg-overlay bg-overlay-white opacity-5"></div>
                <div className="container">
                  <div className="row align-items-center mt-5">
                    <div className="col-lg-7 col-md-7">
                      <div className="title-heading mt-4">
                        <h1 className="display-4 title-white fw-bold mb-3">
                          Kiếm tiền <br />
                          Online
                        </h1>
                        <p className="para-desc text-dark title-white">
                          Tại PODOC khách hàng có thể tự đăng bán các mẫu thiết
                          kế của bản thân và thu lợi nhuận từ chính các mẫu
                          thiết kế đó.
                        </p>
                        <div className="mt-4">
                          <Link href="\designs">
                            <a className="btn btn-soft-primary">Mua ngay</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="3000">
              <div
                className="bg-home slider-rtl-3 d-flex align-items-center"
                style={{
                  background: "url('asset/images/shop/hp-3.jpg') center center",
                  backgroundSize: "1500px 850px",
                }}
              >
                <div className="bg-overlay bg-overlay-white opacity-5"></div>
                <div className="container">
                  <div className="row align-items-center mt-5">
                    <div className="col-lg-7 col-md-7">
                      <div className="title-heading mt-4">
                        <h4 className="display-4 title-white fw-bold mb-3">
                          Dễ dàng thêm thiết <br /> kế vào sản phẩm
                        </h4>
                        <p className="para-desc text-dark title-white">
                          Với các công cụ thiết kế miễn phí của chúng tôi, bạn
                          có thể dễ dàng thêm các thiết kế tùy chỉnh của mình
                          vào sản phẩm của bạn.
                        </p>
                        <div className="mt-4">
                          <Link href="\designs">
                            <a className="btn btn-soft-primary">Mua ngay</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {response && response.length !== 0 && (
        <DesignedProducts
          title="Sản phẩm có đánh giá tốt nhất"
          data={response}
        />
      )}

      {/* <div className="container mt-100 mt-60">
        <div className="row">
          <div className="col-12">
            <h5 className="mb-0">Top Categories</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img
                  src="asset/images/shop/categories/fashion.jpg"
                  className="avatar avatar-small rounded-circle shadow-md"
                  alt=""
                />
                <div className="content mt-3">
                  <h6 className="mb-0">
                    <a href=" " className="title text-dark">
                      Fashion
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img
                  src="asset/images/shop/categories/sports.jpg"
                  className="avatar avatar-small rounded-circle shadow-md"
                  alt=""
                />
                <div className="content mt-3">
                  <h6 className="mb-0">
                    <a href=" " className="title text-dark">
                      Sports
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img
                  src="asset/images/shop/categories/music.jpg"
                  className="avatar avatar-small rounded-circle shadow-md"
                  alt=""
                />
                <div className="content mt-3">
                  <h6 className="mb-0">
                    <a href=" " className="title text-dark">
                      Music
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img
                  src="asset/images/shop/categories/furniture.jpg"
                  className="avatar avatar-small rounded-circle shadow-md"
                  alt=""
                />
                <div className="content mt-3">
                  <h6 className="mb-0">
                    <a href=" " className="title text-dark">
                      Furniture
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img
                  src="asset/images/shop/categories/electronics.jpg"
                  className="avatar avatar-small rounded-circle shadow-md"
                  alt=""
                />
                <div className="content mt-3">
                  <h6 className="mb-0">
                    <a href=" " className="title text-dark">
                      Electronics
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img
                  src="asset/images/shop/categories/mobile.jpg"
                  className="avatar avatar-small rounded-circle shadow-md"
                  alt=""
                />
                <div className="content mt-3">
                  <h6 className="mb-0">
                    <a href=" " className="title text-dark">
                      Mobiles
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End of season */}
    </>
  );
}
HomePage.Layout = MainLayout;
