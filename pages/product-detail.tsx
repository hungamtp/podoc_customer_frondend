import { MainLayout } from "@/components/layouts";
import * as React from "react";

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
        <section className="section pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="tiny-single-item">
                  <div className="tiny-slide">
                    <img
                      src="asset/images/shop/product/single-2.jpg"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="tiny-slide">
                    <img
                      src="asset/images/shop/product/single-3.jpg"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="tiny-slide">
                    <img
                      src="asset/images/shop/product/single-4.jpg"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="tiny-slide">
                    <img
                      src="asset/images/shop/product/single-5.jpg"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                  <div className="tiny-slide">
                    <img
                      src="asset/images/shop/product/single-6.jpg"
                      className="img-fluid rounded"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="section-title ms-md-4">
                  <h4 className="title">Branded T-Shirts</h4>
                  <h5 className="text-muted">
                    $21.00 <del className="text-danger ms-2">$25.00</del>{" "}
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero exercitationem, unde molestiae sint quae inventore
                    atque minima natus fugiat nihil quisquam voluptates ea
                    omnis. Modi laborum soluta tempore unde accusantium.
                  </p>
                  <ul className="list-unstyled text-muted">
                    <li className="mb-1">
                      <span className="text-primary h5 me-2">
                        <i className="uil uil-check-circle align-middle" />
                      </span>{" "}
                      Digital Marketing Solutions for Tomorrow
                    </li>
                    <li className="mb-1">
                      <span className="text-primary h5 me-2">
                        <i className="uil uil-check-circle align-middle" />
                      </span>{" "}
                      Our Talented &amp; Experienced Marketing Agency
                    </li>
                    <li className="mb-1">
                      <span className="text-primary h5 me-2">
                        <i className="uil uil-check-circle align-middle" />
                      </span>{" "}
                      Create your own skin to match your brand
                    </li>
                  </ul>
                  <div className="row mt-4 pt-2">
                    <div className="col-lg-6 col-12">
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0">Your Size:</h6>
                        <ul className="list-unstyled mb-0 ms-3">
                          <li className="list-inline-item">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-soft-primary"
                            >
                              S
                            </a>
                          </li>
                          <li className="list-inline-item ms-1">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-soft-primary"
                            >
                              M
                            </a>
                          </li>
                          <li className="list-inline-item ms-1">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-soft-primary"
                            >
                              L
                            </a>
                          </li>
                          <li className="list-inline-item ms-1">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-soft-primary"
                            >
                              XL
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-6 col-12 mt-4 mt-lg-0">
                      <div className="d-flex shop-list align-items-center">
                        <h6 className="mb-0">Quantity:</h6>
                        {/* <div className="qty-icons ms-3">
                          <button
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                            className="btn btn-icon btn-soft-primary minus"
                          >
                            -
                          </button>
                          <input
                            min={0}
                            name="quantity"
                            defaultValue={0}
                            type="number"
                            className="btn btn-icon btn-soft-primary qty-btn quantity"
                          />
                          <button
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                            className="btn btn-icon btn-soft-primary plus"
                          >
                            +
                          </button>
                        </div> */}
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                  <div className="mt-4 pt-2">
                    <a href="javascript:void(0)" className="btn btn-primary">
                      Shop Now
                    </a>
                    <a
                      href="shop-cart.html"
                      className="btn btn-soft-primary ms-2"
                    >
                      Add to Cart
                    </a>
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
          <div className="container mt-100 mt-60">
            <div className="row">
              <div className="col-12">
                <ul
                  className="nav nav-pills shadow flex-column flex-sm-row d-md-inline-flex mb-0 p-1 bg-white rounded position-relative overflow-hidden"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item m-1">
                    <a
                      className="nav-link py-2 px-5 active rounded"
                      id="description-data"
                      data-bs-toggle="pill"
                      href="#description"
                      role="tab"
                      aria-controls="description"
                      aria-selected="false"
                    >
                      <div className="text-center">
                        <h6 className="mb-0">Description</h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}
                  <li className="nav-item m-1">
                    <a
                      className="nav-link py-2 px-5 rounded"
                      id="additional-info"
                      data-bs-toggle="pill"
                      href="#additional"
                      role="tab"
                      aria-controls="additional"
                      aria-selected="false"
                    >
                      <div className="text-center">
                        <h6 className="mb-0">Additional Information</h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}
                  <li className="nav-item m-1">
                    <a
                      className="nav-link py-2 px-5 rounded"
                      id="review-comments"
                      data-bs-toggle="pill"
                      href="#review"
                      role="tab"
                      aria-controls="review"
                      aria-selected="false"
                    >
                      <div className="text-center">
                        <h6 className="mb-0">Review</h6>
                      </div>
                    </a>
                    {/*end nav link*/}
                  </li>
                  {/*end nav item*/}
                </ul>
                <div className="tab-content mt-5" id="pills-tabContent">
                  <div
                    className="card border-0 tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-data"
                  >
                    <p className="text-muted mb-0">
                      Due to its widespread use as filler text for layouts,
                      non-readability is of great importance: human perception
                      is tuned to recognize certain patterns and repetitions in
                      texts. If the distribution of letters and words is random,
                      the reader will not be distracted from making a neutral
                      judgement on the visual impact and readability of the
                      typefaces (typography), or the distribution of text on the
                      page (layout or type area). For this reason, dummy text
                      usually consists of a more or less random series of words
                      or syllables.
                    </p>
                  </div>
                  <div
                    className="card border-0 tab-pane fade"
                    id="additional"
                    role="tabpanel"
                    aria-labelledby="additional-info"
                  >
                    <table className="table">
                      <tbody>
                        <tr>
                          <td style={{ width: "100px" }}>Color</td>
                          <td className="text-muted">
                            Red, White, Black, Orange
                          </td>
                        </tr>
                        <tr>
                          <td>Material</td>
                          <td className="text-muted">Cotton</td>
                        </tr>
                        <tr>
                          <td>Size</td>
                          <td className="text-muted">S, M, L, XL, XXL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="card border-0 tab-pane fade"
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-comments"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <ul className="media-list list-unstyled mb-0">
                          <li>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <a className="pe-3" href="#">
                                  <img
                                    src="images/client/01.jpg"
                                    className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                    alt="img"
                                  />
                                </a>
                                <div className="flex-1 commentor-detail">
                                  <h6 className="mb-0">
                                    <a
                                      href="javascript:void(0)"
                                      className="text-dark media-heading"
                                    >
                                      Lorenzo Peterson
                                    </a>
                                  </h6>
                                  <small className="text-muted">
                                    15th August, 2021 at 01:25 pm
                                  </small>
                                </div>
                              </div>
                              <ul className="list-unstyled mb-0">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                              </ul>
                            </div>
                            <div className="mt-3">
                              <p className="text-muted fst-italic p-3 bg-light rounded">
                                Awesome product
                              </p>
                            </div>
                          </li>
                          <li className="mt-4">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <a className="pe-3" href="#">
                                  <img
                                    src="images/client/02.jpg"
                                    className="img-fluid avatar avatar-md-sm rounded-circle shadow"
                                    alt="img"
                                  />
                                </a>
                                <div className="flex-1 commentor-detail">
                                  <h6 className="mb-0">
                                    <a
                                      href="javascript:void(0)"
                                      className="media-heading text-dark"
                                    >
                                      Tammy Camacho
                                    </a>
                                  </h6>
                                  <small className="text-muted">
                                    15th August, 2021 at 05:44 pm
                                  </small>
                                </div>
                              </div>
                              <ul className="list-unstyled mb-0">
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star text-warning" />
                                </li>
                                <li className="list-inline-item">
                                  <i className="mdi mdi-star-outline text-warning" />
                                </li>
                              </ul>
                            </div>
                            <div className="mt-3">
                              <p className="text-muted fst-italic p-3 bg-light rounded mb-0">
                                Good
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-6 mt-4 mt-lg-0 pt-2 pt-lg-0">
                        <form className="ms-lg-4">
                          <div className="row">
                            <div className="col-12">
                              <h5>Add your review:</h5>
                            </div>
                            <div className="col-12 mt-4">
                              <h6 className="small fw-bold">Your Rating:</h6>
                              <a
                                href="javascript:void(0)"
                                className="d-inline-block me-3"
                              >
                                <ul className="list-unstyled mb-0 small">
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                </ul>
                              </a>
                              <a
                                href="javascript:void(0)"
                                className="d-inline-block me-3"
                              >
                                <ul className="list-unstyled mb-0 small">
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                </ul>
                              </a>
                              <a
                                href="javascript:void(0)"
                                className="d-inline-block me-3"
                              >
                                <ul className="list-unstyled mb-0 small">
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                </ul>
                              </a>
                              <a
                                href="javascript:void(0)"
                                className="d-inline-block me-3"
                              >
                                <ul className="list-unstyled mb-0 small">
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star-outline text-warning" />
                                  </li>
                                </ul>
                              </a>
                              <a
                                href="javascript:void(0)"
                                className="d-inline-block"
                              >
                                <ul className="list-unstyled mb-0 small">
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="mdi mdi-star text-warning" />
                                  </li>
                                </ul>
                              </a>
                            </div>
                            <div className="col-md-12 mt-3">
                              <div className="mb-3">
                                <label className="form-label">
                                  Your Review:
                                </label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="message-circle"
                                    className="fea icon-sm icons"
                                  />
                                  <textarea
                                    id="message"
                                    placeholder="Your Comment"
                                    rows={5}
                                    name="message"
                                    className="form-control ps-5"
                                    required
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Name <span className="text-danger">*</span>
                                </label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="user"
                                    className="fea icon-sm icons"
                                  />
                                  <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    className="form-control ps-5"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Your Email{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="form-icon position-relative">
                                  <i
                                    data-feather="mail"
                                    className="fea icon-sm icons"
                                  />
                                  <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="form-control ps-5"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-md-12">
                              <div className="send d-grid">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </form>
                        {/*end form*/}
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end container*/}
          <div className="container mt-100 mt-60">
            <div className="row">
              <div className="col-12">
                <h5 className="mb-0">Related Products</h5>
              </div>
              {/*end col*/}
              <div className="col-12 mt-4">
                <div className="tiny-four-item">
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="badge badge-link rounded-pill bg-danger"
                          >
                            Hot
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s1.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-1.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Branded T-Shirt
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $16.00{" "}
                            <del className="text-danger ms-2">$21.00</del>{" "}
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s2.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-2.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Shopping Bag
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $21.00{" "}
                            <del className="text-danger ms-2">$25.00</del>{" "}
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="badge badge-link rounded-pill bg-warning"
                          >
                            Sale
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s3.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-3.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Elegent Watch
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $5.00{" "}
                            <span className="text-success ms-1">30% off</span>{" "}
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s4.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-4.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Casual Shoes
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $18.00{" "}
                            <del className="text-danger ms-2">$22.00</del>{" "}
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="badge badge-link rounded-pill bg-warning"
                          >
                            Sale
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s5.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-5.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Earphones
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $3.00
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s6.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-6.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Elegent Mug
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $4.50 <del className="text-danger ms-2">$6.50</del>{" "}
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s7.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-7.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Sony Headphones
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $9.99{" "}
                            <span className="text-success ms-2">20% off</span>{" "}
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
                  <div className="tiny-slide">
                    <div className="card shop-list border-0 position-relative m-2">
                      <ul className="label list-unstyled mb-0">
                        <li>
                          <a
                            href="javascript:void(0)"
                            className="badge badge-link rounded-pill bg-success"
                          >
                            Featured
                          </a>
                        </li>
                      </ul>
                      <div className="shop-image position-relative overflow-hidden rounded shadow">
                        <a href="shop-product-detail.html">
                          <img
                            src="asset/images/shop/product/s8.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <a
                          href="shop-product-detail.html"
                          className="overlay-work"
                        >
                          <img
                            src="asset/images/shop/product/s-8.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                        <ul className="list-unstyled shop-icons">
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn btn-icon btn-pills btn-soft-danger"
                            >
                              <i data-feather="heart" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-product-detail.html"
                              className="btn btn-icon btn-pills btn-soft-primary"
                            >
                              <i data-feather="eye" className="icons" />
                            </a>
                          </li>
                          <li className="mt-2">
                            <a
                              href="shop-cart.html"
                              className="btn btn-icon btn-pills btn-soft-warning"
                            >
                              <i
                                data-feather="shopping-cart"
                                className="icons"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body content pt-4 p-2">
                        <a
                          href="shop-product-detail.html"
                          className="text-dark product-name h6"
                        >
                          Wooden Stools
                        </a>
                        <div className="d-flex justify-content-between mt-1">
                          <h6 className="text-dark small fst-italic mb-0 mt-1">
                            $22.00{" "}
                            <del className="text-danger ms-2">$25.00</del>{" "}
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
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
          <div className="container-fluid mt-100 mt-60 px-0">
            <div className="py-5 bg-light">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                      <a
                        href="shop-product-detail.html"
                        className="text-dark align-items-center"
                      >
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
                        <span className="text-muted d-none d-md-inline-block">
                          Web Development
                        </span>
                        <img
                          src="images/work/6.jpg"
                          className="avatar avatar-small rounded shadow ms-2"
                          style={{ height: "auto" }}
                          alt=""
                        />
                      </a>
                      <a
                        href="index.html"
                        className="btn btn-lg btn-pills btn-icon btn-soft-primary"
                      >
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
                      <a
                        href="shop-product-detail.html"
                        className="text-dark align-items-center"
                      >
                        <img
                          src="images/work/7.jpg"
                          className="avatar avatar-small rounded shadow me-2"
                          style={{ height: "auto" }}
                          alt=""
                        />
                        <span className="text-muted d-none d-md-inline-block">
                          Web Designer
                        </span>
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
