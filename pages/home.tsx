/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MainLayout } from '@/components/layouts';
import { useGetHighestRateDesign } from '@/hooks/api/use-get-highest-rate-design';
import DesignedProducts from '@/components/common/designed-products';
import { useAppDispatch, useAppSelector } from '@/components/hooks/reduxHook';
import useCart from '@/hooks/api/cart/use-cart';
import cart, { setCart } from '@/redux/slices/cart';
type Props = {};

export default function HomePage({}: Props) {
  const { data: response, isLoading: isLoadingAccount } = useGetHighestRateDesign();
  const dispatch = useAppDispatch();
  const { data: responseCart, isLoading: isLoading } = useCart();
  dispatch(setCart(responseCart));
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
                style={{ background: "url('asset/images/shop/bg2.jpg') center center" }}
              >
                <div className="bg-overlay bg-overlay-white opacity-5"></div>
                <div className="container">
                  <div className="row align-items-center mt-5">
                    <div className="col-lg-7 col-md-7">
                      <div className="title-heading mt-4">
                        <h1 className="display-4 title-white fw-bold mb-3">
                          New Accessories <br />
                          Collections
                        </h1>
                        <p className="para-desc text-dark title-white">
                          Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5
                          html page.
                        </p>
                        <div className="mt-4">
                          <a href=" " className="btn btn-soft-primary">
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item" data-bs-interval="3000">
              <div
                className="bg-home slider-rtl-1 d-flex align-items-center"
                style={{ background: "url('asset/images/shop/bg1.jpg') center center" }}
              >
                <div className="bg-overlay bg-overlay-white opacity-5"></div>
                <div className="container">
                  <div className="row align-items-center mt-5">
                    <div className="col-lg-7 col-md-7">
                      <div className="title-heading mt-4">
                        <h1 className="display-4 title-white fw-bold mb-3">
                          Headphones <br />
                          Speaker
                        </h1>
                        <p className="para-desc text-dark title-white">
                          Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5
                          html page.
                        </p>
                        <div className="mt-4">
                          <a href=" " className="btn btn-soft-primary">
                            Shop Now
                          </a>
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
                style={{ background: "url('asset/images/shop/bg3.jpg') center center" }}
              >
                <div className="bg-overlay bg-overlay-white opacity-5"></div>
                <div className="container">
                  <div className="row align-items-center mt-5">
                    <div className="col-lg-7 col-md-7">
                      <div className="title-heading mt-4">
                        <h1 className="display-4 title-white fw-bold mb-3">
                          Modern Furniture, <br />
                          Armchair
                        </h1>
                        <p className="para-desc text-dark title-white">
                          Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5
                          html page.
                        </p>
                        <div className="mt-4">
                          <a href=" " className="btn btn-soft-primary">
                            Shop Now
                          </a>
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

      {response && <DesignedProducts title="Highest Rate Designed Products" data={response} />}
      {response && <DesignedProducts title="Best Seller" data={response} />}

      <div className="container mt-100 mt-60">
        <div className="row">
          <div className="col-12">
            <h5 className="mb-0">Top Categories</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-4 col-6 mt-4 pt-2">
            <div className="card explore-feature border-0 rounded text-center bg-white">
              <div className="card-body">
                <img src="asset/images/shop/categories/fashion.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
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
                <img src="asset/images/shop/categories/sports.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
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
                <img src="asset/images/shop/categories/music.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
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
                <img src="asset/images/shop/categories/furniture.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
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
                <img src="asset/images/shop/categories/electronics.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
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
                <img src="asset/images/shop/categories/mobile.jpg" className="avatar avatar-small rounded-circle shadow-md" alt="" />
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
      </div>
      {/* End of season */}
      <div className="container-fluid mt-100 mt-60">
        <div className="rounded py-5" style={{ background: "url('asset/images/shop/cta.jpg') fixed" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2 className="fw-bold title-white mb-4">
                    End of Season Clearance <br />
                    Sale upto 30%
                  </h2>
                  <p className="para-desc para-white text-muted mb-0">
                    Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html
                    page.
                  </p>
                  <div className="mt-4">
                    <a href=" " className="btn btn-primary">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
HomePage.Layout = MainLayout;
