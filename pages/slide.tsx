import React from 'react';

type Props = {};

export default function Slide({}: Props) {
  return (
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
                        Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html
                        page.
                      </p>
                      <div className="mt-4">
                        <a href="javascript:void(0)" className="btn btn-soft-primary">
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
                        Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html
                        page.
                      </p>
                      <div className="mt-4">
                        <a href="javascript:void(0)" className="btn btn-soft-primary">
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
                        Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html
                        page.
                      </p>
                      <div className="mt-4">
                        <a href="javascript:void(0)" className="btn btn-soft-primary">
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
  );
}
