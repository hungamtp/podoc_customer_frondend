/* eslint-disable @next/next/no-img-element */
import Factory from '@/components/common/factory';
import RecentProduct from '@/components/common/recent-product';
import { MainLayout } from '@/components/layouts';
import * as React from 'react';

export interface IProductDetailProps {}

export default function ProductDetail(props: IProductDetailProps) {
  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> Branded T-Shirts </h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <a href="index.html">Landrick</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="index-shop.html">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Product Details
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* Hero End */}
        <section className="section pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="tiny-single-item">
                  <div className="tiny-slide">
                    <img src="asset/images/shop/product/single-2.jpg" className="img-fluid rounded" alt="productImage" />
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="section-title ms-md-4">
                  <h4 className="title">Branded T-Shirts</h4>
                  <h5 className="text-muted">
                    $21.00 <del className="text-danger ms-2">$25.00</del>
                  </h5>
                  <ul className="list-unstyled text-warning h5 mb-0">
                    <li className="list-inline-item">
                      <i className="mdi mdi-star" />
                    </li>
                    <li className="list-inline-item">
                      <i className="mdi mdi-star" />
                    </li>
                    <li className="list-inline-item">
                      <i className="mdi mdi-star" />
                    </li>
                    <li className="list-inline-item">
                      <i className="mdi mdi-star" />
                    </li>
                    <li className="list-inline-item">
                      <i className="mdi mdi-star" />
                    </li>
                  </ul>
                  <h5 className="mt-4 py-2">Overview :</h5>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero exercitationem, unde molestiae sint quae inventore atque
                    minima natus fugiat nihil quisquam voluptates ea omnis. Modi laborum soluta tempore unde accusantium.
                  </p>
                  <ul className="list-unstyled text-muted">
                    <li className="mb-1">
                      <span className="text-primary h5 me-2">
                        <i className="uil uil-check-circle align-middle" />
                      </span>
                      Digital Marketing Solutions for Tomorrow
                    </li>
                    <li className="mb-1">
                      <span className="text-primary h5 me-2">
                        <i className="uil uil-check-circle align-middle" />
                      </span>
                      Our Talented &amp; Experienced Marketing Agency
                    </li>
                    <li className="mb-1">
                      <span className="text-primary h5 me-2">
                        <i className="uil uil-check-circle align-middle" />
                      </span>
                      Create your own skin to match your brand
                    </li>
                  </ul>
                  <div className="row mt-4 pt-2">
                    <div className="col-lg-6 col-12">
                      <div className="d-flex align-items-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Factory />
          <Factory />
          <RecentProduct />
          {/*end container*/}
          <div className="container-fluid mt-100 mt-60 px-0">
            <div className="py-5 bg-light">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                      <a href="shop-product-detail.html" className="text-dark align-items-center">
                        <span className="pro-icons">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-left fea icon-sm"
                          >
                            <line x1={19} y1={12} x2={5} y2={12} />
                            <polyline points="12 19 5 12 12 5" />
                          </svg>
                        </span>
                        <span className="text-muted d-none d-md-inline-block">Web Development</span>
                        <img
                          src="asset/images/work/6.jpg"
                          className="avatar avatar-small rounded shadow ms-2"
                          style={{ height: 'auto' }}
                          alt=""
                        />
                      </a>
                      <a href="index.html" className="btn btn-lg btn-pills btn-icon btn-soft-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-home icons"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      </a>
                      <a href="shop-product-detail.html" className="text-dark align-items-center">
                        <img
                          src="asset/images/work/7.jpg"
                          className="avatar avatar-small rounded shadow me-2"
                          style={{ height: 'auto' }}
                          alt=""
                        />
                        <span className="text-muted d-none d-md-inline-block">Web Designer</span>
                        <span className="pro-icons">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-right fea icon-sm"
                          >
                            <line x1={5} y1={12} x2={19} y2={12} />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </div>
              {/*end container*/}
            </div>
            {/*end div*/}
          </div>
        </section>
        {/*end section*/}
      </div>
    </>
  );
}
ProductDetail.Layout = MainLayout;
