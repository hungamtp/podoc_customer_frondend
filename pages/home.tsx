/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MainLayout } from '@/components/layouts';
import { useGetHighestRateDesign } from '@/hooks/api/use-get-highest-rate-design';
import DesignedProducts from '@/components/common/designed-products';
import { useAppDispatch, useAppSelector } from '@/components/hooks/reduxHook';
import Link from 'next/link';
import { useGetBestSeller } from '@/hooks/api/use-get-best-seller';
type Props = {};

export default function HomePage({}: Props) {
  const { data: response, isLoading: isLoadingAccount } = useGetHighestRateDesign();
  const { data: getBestSellerResponse, isLoading: isLoadingBestSeller } = useGetBestSeller();
  const dispatch = useAppDispatch();

  const sizeDefault = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const selectdSize = ['XS', 'XXL', 'XXXL', 'M'];
  var newSize = [];
  newSize = sizeDefault.filter(size => {
    if (selectdSize.includes(size)) {
      return true;
    }
  });

  return (
    <>
      <section className="home-slider position-relative">
        <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2" aria-label="Slide 3"></button>
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
                        <h1 className="display-4 title-white fw-bold mb-3">Print On Demand Of Customer</h1>
                        <p className="para-desc text-dark title-white">
                          In theo yêu cầu là một công nghệ in và quy trình kinh doanh trong đó các bản sao sách không được in cho đến khi
                          công ty nhận được một đơn đặt hàng, cho phép in số lượng đơn hoặc số lượng nhỏ..
                        </p>
                        <div className="mt-4">
                          <Link href="/designs">
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
                  backgroundSize: '1500px 850px',
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
                          Tại PODOC khách hàng có thể tự đăng bán các mẫu thiết kế của bản thân và thu lợi nhuận từ chính các mẫu thiết kế
                          đó.
                        </p>
                        <div className="mt-4">
                          <Link href="/designs">
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
                  backgroundSize: '1500px 850px',
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
                          Với các công cụ thiết kế miễn phí của chúng tôi, bạn có thể dễ dàng thêm các thiết kế tùy chỉnh của mình vào sản
                          phẩm của bạn.
                        </p>
                        <div className="mt-4">
                          <Link href="/designs">
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

      {response && response.length !== 0 && <DesignedProducts title="Sản phẩm có đánh giá tốt nhất" data={response} />}
      {/* 
      {getBestSellerResponse && getBestSellerResponse.length !== 0 && (
        <DesignedProducts
          title="Sản phẩm bán chạy nhất"
          data={getBestSellerResponse}
        />
      )} */}
    </>
  );
}
HomePage.Layout = MainLayout;
