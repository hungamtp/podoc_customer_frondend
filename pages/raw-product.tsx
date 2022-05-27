/* eslint-disable @next/next/no-img-element */
import { MainLayout } from '@/components/layouts';
import * as React from 'react';

export interface IProductProps {}

export default function RawProduct(props: IProductProps) {
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
                    <a href="index-shop.html">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Products
                  </li>
                </ul>
              </nav>
            </div>
          </div>{' '}
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
                          <input type="text" id="s" name="s" className="form-control border-0" placeholder="Search Keywords..." />
                          <button type="submit" className="input-group-text bg-white border-0" id="searchsubmit">
                            <i className="uil uil-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* SEARCH */}
                    {/* Categories */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Categories</h5>
                      <ul className="list-unstyled mt-4 mb-0 blog-categories">
                        <li>
                          <a href="jvascript:void(0)">Men</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Women</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Electronics</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Jewellery</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Shoes</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Kid’s Wear</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Sports</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Toys</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Gift Corners</a>
                        </li>
                      </ul>
                    </div>
                    {/* Categories */}
                    {/* color */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Color</h5>
                      <ul className="list-unstyled mt-4 mb-0">
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-primary">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-danger">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-success">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-info">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-secondary">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-warning">
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
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s1.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              T-Shirt
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s3.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              Watch
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s6.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              Coffee Cup
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s8.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              Wooden Stools
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
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
                  <div className="col-lg-4 col-md-5 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <div className="d-flex justify-content-md-between align-items-center">
                      <div className="form custom-form">
                        <div className="mb-0">
                          <select className="form-select form-control" aria-label="Default select example" id="Sortbylist-job">
                            <option selected>Sort by latest</option>
                            <option>Sort by popularity</option>
                            <option>Sort by rating</option>
                            <option>Sort by price: low to high</option>
                            <option>Sort by price: high to low</option>
                          </select>
                        </div>
                      </div>
                      <div className="mx-2">
                        <a href="shop-grids.html" className="h5 text-muted">
                          <i className="uil uil-apps" />
                        </a>
                      </div>
                      <div>
                        <a href="shop-lists.html" className="h5 text-muted">
                          <i className="uil uil-list-ul" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-success">
                            Featured
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s1.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-1.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Branded T-Shirt
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $16.00 <del className="text-danger ms-2">$21.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s2.jpg" className="img-fluid" alt="" />
                        </a>
                        <div className="overlay-work">
                          <div className="py-2 bg-soft-dark rounded-bottom out-stock">
                            <h6 className="mb-0 text-center">Out of stock</h6>
                          </div>
                        </div>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Shopping Bag
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $21.00 <del className="text-danger ms-2">$25.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s3.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-3.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Elegent Watch
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $5.00 <span className="text-success ms-1">30% off</span>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s4.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-4.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Casual Shoes
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-warning">
                            Sale
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s5.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-5.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Earphones
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">$3.00</h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                            New
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-success">
                            Featured
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-warning">
                            Sale
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s6.jpg" className="img-fluid" alt="" />
                        </a>
                        <div className="overlay-work">
                          <div className="py-2 bg-soft-dark rounded-bottom out-stock">
                            <h6 className="mb-0 text-center">Out of stock</h6>
                          </div>
                        </div>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Elegent Mug
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $4.50 <del className="text-danger ms-2">$6.50</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s7.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-7.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Sony Headphones
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $9.99 <span className="text-success ms-2">20% off</span>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                            New
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-success">
                            Featured
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-warning">
                            Sale
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s8.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-8.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Wooden Stools
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $22.00 <del className="text-danger ms-2">$25.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-success">
                            Featured
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s9.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-9.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Coffee Cup / Mug
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $16.00 <del className="text-danger ms-2">$21.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                            New
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s10.jpg" className="img-fluid" alt="" />
                        </a>
                        <div className="overlay-work">
                          <div className="py-2 bg-soft-dark rounded-bottom out-stock">
                            <h6 className="mb-0 text-center">Out of stock</h6>
                          </div>
                        </div>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Sunglasses
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $21.00 <del className="text-danger ms-2">$25.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-success">
                            Featured
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s11.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-11.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Loafer Shoes
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $5.00 <span className="text-success ms-1">30% off</span>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                            New
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-success">
                            Featured
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-warning">
                            Sale
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s12.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-12.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          T-Shirts
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s13.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-13.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Wooden Chair
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $16.00 <del className="text-danger ms-2">$21.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s14.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-14.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          Women Block Heels
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $21.00 <del className="text-danger ms-2">$25.00</del>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                    <div className="card shop-list border-0 position-relative">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="product-detail">
                          <img src="asset/images/shop/product/s15.jpg" className="img-fluid" alt="" />
                        </a>
                        <a href="product-detail" className="overlay-work">
                          <img src="asset/images/shop/product/s-15.jpg" className="img-fluid" alt="" />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="javascript:void(0)"
                              data-bs-toggle="modal"
                              data-bs-target="#productview"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                              <i data-feather="shopping-cart" className="icons" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a href="product-detail" className="text-dark product-name h6">
                          T-Shirts
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $5.00 <span className="text-success ms-1">30% off</span>{' '}
                          </h6>
                          <ul className="list-unstyled text-warning mb-0">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                  {/* PAGINATION START */}
                  <div className="col-12 mt-4 pt-2">
                    <ul className="pagination justify-content-center mb-0">
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                          <i className="mdi mdi-arrow-left" /> Prev
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="javascript:void(0)">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0)">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0)">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0)" aria-label="Next">
                          Next <i className="mdi mdi-arrow-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*end col*/}
                  {/* PAGINATION END */}
                </div>
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
RawProduct.Layout = MainLayout;
