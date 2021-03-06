/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MainLayout } from "@/components/layouts";
import { useGetHighestRateDesign } from "@/hooks/api/use-get-highest-rate-design";
import DesignedProducts from "@/components/common/designed-products";
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import Link from "next/link";
import { useGetBestSeller } from "@/hooks/api/use-get-best-seller";
type Props = {};

export default function HomePage({}: Props) {
  const { data: response, isLoading: isLoadingAccount } =
    useGetHighestRateDesign();
  const { data: getBestSellerResponse, isLoading: isLoadingBestSeller } =
    useGetBestSeller();
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
                          In theo y??u c???u l?? m???t c??ng ngh??? in v?? quy tr??nh kinh
                          doanh trong ???? c??c b???n sao s??ch kh??ng ???????c in cho ?????n
                          khi c??ng ty nh???n ???????c m???t ????n ?????t h??ng, cho ph??p in s???
                          l?????ng ????n ho???c s??? l?????ng nh???..
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
                          Ki???m ti???n <br />
                          Online
                        </h1>
                        <p className="para-desc text-dark title-white">
                          T???i PODOC kh??ch h??ng c?? th??? t??? ????ng b??n c??c m???u thi???t
                          k??? c???a b???n th??n v?? thu l???i nhu???n t??? ch??nh c??c m???u
                          thi???t k??? ????.
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
                          D??? d??ng th??m thi???t <br /> k??? v??o s???n ph???m
                        </h4>
                        <p className="para-desc text-dark title-white">
                          V???i c??c c??ng c??? thi???t k??? mi???n ph?? c???a ch??ng t??i, b???n
                          c?? th??? d??? d??ng th??m c??c thi???t k??? t??y ch???nh c???a m??nh
                          v??o s???n ph???m c???a b???n.
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
          title="S???n ph???m c?? ????nh gi?? t???t nh???t"
          data={response}
        />
      )}

      {getBestSellerResponse && getBestSellerResponse.length !== 0 && (
        <DesignedProducts
          title="S???n ph???m b??n ch???y nh???t"
          data={getBestSellerResponse}
        />
      )}
    </>
  );
}
HomePage.Layout = MainLayout;
