/* eslint-disable @next/next/no-img-element */
import Categories from "@/components/common/categories";
import DesignedProductCard from "@/components/designs/designed-product-card";
import { MainLayout } from "@/components/layouts";
import * as React from "react";

export interface IProductProps {}

export default function Designs(props: IProductProps) {
  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> All Products </h4>
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
                    <a href="home">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Products
                  </li>
                </ul>
              </nav>
            </div>
          </div>{" "}
          {/*end container*/}
        </section>
        {/*end section*/}
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
              />
            </svg>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Products */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="card border-0 sidebar sticky-bar">
                  <div className="card-body p-0">
                    {/* SEARCH */}
                    <div className="widget">
                      <form role="search" method="get">
                        <div className="input-group mb-3 border rounded">
                          <input
                            type="text"
                            id="s"
                            name="s"
                            className="form-control border-0"
                            placeholder="Search Keywords..."
                          />
                          <button
                            type="submit"
                            className="input-group-text bg-white border-0"
                            id="searchsubmit"
                          >
                            <i className="uil uil-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* SEARCH */}

                    <Categories />

                    {/* color */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Color</h5>
                      <ul className="list-unstyled mt-4 mb-0">
                        <li className="list-inline-item">
                          <a
                            href=" "
                            className="btn btn-sm btn-icon btn-pills btn-primary"
                          >
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href=" "
                            className="btn btn-sm btn-icon btn-pills btn-danger"
                          >
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href=" "
                            className="btn btn-sm btn-icon btn-pills btn-success"
                          >
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href=" "
                            className="btn btn-sm btn-icon btn-pills btn-info"
                          >
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href=" "
                            className="btn btn-sm btn-icon btn-pills btn-secondary"
                          >
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            href=" "
                            className="btn btn-sm btn-icon btn-pills btn-warning"
                          >
                            <span className="d-none">.</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* COlor */}
                    {/* Top Products */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Top Products</h5>
                      <ul className="list-unstyled mt-4 mb-0">
                        <li className="d-flex align-items-center">
                          <a href=" ">
                            <img
                              src="asset/images/shop/product/s1.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: "auto" }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href=" " className="text-dark h6">
                              T-Shirt
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00{" "}
                              <del className="text-danger ms-2">$22.00</del>{" "}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href=" ">
                            <img
                              src="asset/images/shop/product/s3.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: "auto" }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href=" " className="text-dark h6">
                              Watch
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00{" "}
                              <del className="text-danger ms-2">$22.00</del>{" "}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href=" ">
                            <img
                              src="asset/images/shop/product/s6.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: "auto" }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href=" " className="text-dark h6">
                              Coffee Cup
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00{" "}
                              <del className="text-danger ms-2">$22.00</del>{" "}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href=" ">
                            <img
                              src="asset/images/shop/product/s8.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: "auto" }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href=" " className="text-dark h6">
                              Wooden Stools
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00{" "}
                              <del className="text-danger ms-2">$22.00</del>{" "}
                            </h6>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-9 col-md-8 col-12 mt-5 pt-2 mt-sm-0 pt-sm-0">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-md-7">
                    <div className="section-title">
                      <h5 className="mb-0">Showing 1–15 of 47 results</h5>
                    </div>
                  </div>
                  {/*end col*/}

                  {/*end col*/}
                </div>
                {/*end row*/}

                {/*end row*/}
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
      </div>
    </>
  );
}
Designs.Layout = MainLayout;
