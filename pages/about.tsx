/* eslint-disable @next/next/no-img-element */
import { MainLayout } from '@/components/layouts';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default function About({}: Props) {
  return (
    <>
      <section
        className="bg-half-170 bg-light d-table w-100"
        style={{
          background: "url('/asset/images/banner/banner.jpg') no-repeat center center fixed ",
          marginTop: '70px',
        }}
      >
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-12 text-center">
              <div className="pages-heading">
                <h4 className="title mb-0"> GIỚI THIỆU PODOC </h4>
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
                <li className="breadcrumb-item active" aria-current="page">
                  Giới thiệu
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="section-title">
                <h5 className="title mb-4  text-center text-uppercase ">
                  Chất lượng của sản phẩm và độ hài lòng của khách hàng là trên hết
                </h5>
                <p className="text-wrap fs-6 mb-0">
                  Chọn cho mình slogan “<strong>Let your creativity on your T-shirt</strong>”, PODOC mong muốn đem đến những thiết kế không
                  chỉ có tính thẩm mỹ cao, mà còn đầy ý nghĩa, chứa đựng những kỷ niệm, kí ức đẹp, lưu giữ trên từng chiếc áo của khách
                  hàng.
                  <br />
                  <br />
                  Chúng tôi luôn đặt chất lượng vải và chất lượng hình in lên hàng đầu, để chiếc áo sẽ giống như những kỷ niệm: luôn luôn
                  bền lâu.
                  <br />
                  <br />
                  PODOC sẽ không ngừng nâng cao dịch vụ, phấn đấu để trở thành thương hiệu hàng đầu về chăm sóc khách hàng, thiết kế độc
                  đáo, sản phẩm chất lượng tại Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5 ">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4">Các Dịch vụ nổi bật</h4>
                {/* <p className="text-muted para-desc mx-auto mb-0">
                  Start working with{" "}
                  <span className="text-primary fw-bold">Landrick</span> that
                  can provide everything you need to generate awareness, drive
                  traffic, connect.
                </p> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mt-4 pt-2">
              <div className="card features feature-clean bg-transparent process-arrow border-0 text-center">
                <div className="icons text-primary text-center mx-auto">
                  <i className="uil uil-rocket d-block rounded h3 mb-0"></i>
                </div>

                <div className="card-body">
                  <h5 className="text-dark">Giao hàng nhanh</h5>
                  <p className="text-muted mb-0">Các nhà máy sẽ hỗ trợ giao sản phẩm đến tận tay các khách hàng một cách nhanh chóng</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 pt-2">
              <div className="card features feature-clean bg-transparent process-arrow border-0 text-center">
                <div className="icons text-primary text-center mx-auto">
                  <i className="uil uil-user-arrows d-block rounded h3 mb-0"></i>
                </div>

                <div className="card-body">
                  <h5 className="text-dark">Hỗ trợ 24/7</h5>
                  <p className="text-muted mb-0">
                    Nhân viên của PODOC sẵn sàng hỗ trợ các khách hàng giải quyết vấn đề nhiệt tình và hiệu quả
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-4 pt-2">
              <div className="card features feature-clean bg-transparent process-arrow border-0 text-center">
                <div className="icons text-primary text-center mx-auto">
                  <i className="uil uil-transaction d-block rounded h3 mb-0"></i>
                </div>

                <div className="card-body">
                  <h5 className="text-dark">Thanh toán online</h5>
                  <p className="text-muted mb-0">PODOC cung cấp cho khách hàng hình thức thanh toán online cực kì thuận tiện trên MOMO</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col-md-6">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img
                  src="asset/images/shop/fea1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="category-title ms-md-4 ms-2">
                  <h4>
                    Street style has its own <br /> rules
                  </h4>
                  <a href=" " className="btn btn-sm btn-soft-primary mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img
                  src="asset/images/shop/fea2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="category-title ms-md-4 ms-2">
                  <h4>
                    Old style in a new <br /> edition
                  </h4>
                  <a href=" " className="btn btn-sm btn-soft-primary mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-4 pt-2">
              <div className="card shop-features border-0 rounded overflow-hidden">
                <img
                  src="asset/images/shop/fea4.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="category-title ms-md-4 ms-2">
                  <h4>Summer Collection</h4>
                  <a href=" " className="btn btn-sm btn-soft-primary mt-2">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </>
  );
}

About.Layout = MainLayout;
