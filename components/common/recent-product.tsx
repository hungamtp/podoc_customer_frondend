/* eslint-disable @next/next/no-img-element */
import { data } from 'jquery';
import { GetStaticProps } from 'next/types';
import React, { useEffect } from 'react';
import { Best4DesignedProduct, ProductHomePage } from '@/services/type.dto';
import { useGetHighestRateDesign } from '@/hooks/api/use-get-highest-rate-design';

export default function RecentProduct() {
  const { data: response, isLoading: isLoadingAccount } = useGetHighestRateDesign();
  console.log(response);
  return (
    <div className="container mt-100 mt-60">
      <div className="row"></div>
      <div className="col-12">
        <h5 className="mb-0">Recent Products</h5>
      </div>
      {response &&
        response.map((item: ProductHomePage) => {
          return <div key={item.id}>hung</div>;
        })}
      <div className="row">
        <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
          <div className="card shop-list border-0 position-relative">
            <ul className="label list-unstyled mb-0">
              <li>
                <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                  New
                </a>
              </li>
            </ul>
            <div className="shop-image position-relative overflow-hidden rounded shadow">
              <a href="shop-product-detail.html">
                <img src="asset/images/shop/product/s13.jpg" className="img-fluid" alt="productImage" />
              </a>
              <a href="shop-product-detail.html" className="overlay-work">
                <img src="asset/images/shop/product/s-13.jpg" className="img-fluid" alt="productImage" />
              </a>
              <ul className="list-unstyled shop-icons">
                <li>
                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#productview"
                    className="btn btn-icon btn-pills btn-soft-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </a>
                </li>
                <li className="mt-2">
                  <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body content pt-4 p-2">
              <a href="shop-product-detail.html" className="text-dark product-name h6">
                Wooden Chair
              </a>
              <div className="d-flex justify-content-between mt-1">
                <h6 className="text-dark small fst-italic mb-0 mt-1">
                  $16.00 <del className="text-danger ms-2">$21.00</del>
                </h6>
                <ul className="list-unstyled text-warning mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
          <div className="card shop-list border-0 position-relative">
            <ul className="label list-unstyled mb-0">
              <li>
                <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                  New
                </a>
              </li>
            </ul>
            <div className="shop-image position-relative overflow-hidden rounded shadow">
              <a href="shop-product-detail.html">
                <img src="asset/images/shop/product/s14.jpg" className="img-fluid" alt="productImage" />
              </a>
              <div className="overlay-work">
                <div className="py-2 bg-soft-dark rounded-bottom out-stock">
                  <h6 className="mb-0 text-center">Out of stock</h6>
                </div>
              </div>
              <ul className="list-unstyled shop-icons">
                <li>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#productview"
                    className="btn btn-icon btn-pills btn-soft-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body content pt-4 p-2">
              <a href="shop-product-detail.html" className="text-dark product-name h6">
                Women Block Heels
              </a>
              <div className="d-flex justify-content-between mt-1">
                <h6 className="text-dark small fst-italic mb-0 mt-1">
                  $21.00 <del className="text-danger ms-2">$25.00</del>
                </h6>
                <ul className="list-unstyled text-warning mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
          <div className="card shop-list border-0 position-relative">
            <ul className="label list-unstyled mb-0">
              <li>
                <a href="javascript:void(0)" className="badge badge-link rounded-pill bg-primary">
                  New
                </a>
              </li>
            </ul>
            <div className="shop-image position-relative overflow-hidden rounded shadow">
              <a href="shop-product-detail.html">
                <img src="asset/images/shop/product/s15.jpg" className="img-fluid" alt="productImage" />
              </a>
              <a href="shop-product-detail.html" className="overlay-work">
                <img src="asset/images/shop/product/s-15.jpg" className="img-fluid" alt="productImage" />
              </a>
              <ul className="list-unstyled shop-icons">
                <li>
                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#productview"
                    className="btn btn-icon btn-pills btn-soft-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </a>
                </li>
                <li className="mt-2">
                  <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body content pt-4 p-2">
              <a href="shop-product-detail.html" className="text-dark product-name h6">
                T-Shirts
              </a>
              <div className="d-flex justify-content-between mt-1">
                <h6 className="text-dark small fst-italic mb-0 mt-1">
                  $5.00 <span className="text-success ms-1">30% off</span>
                </h6>
                <ul className="list-unstyled text-warning mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
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
              <a href="shop-product-detail.html">
                <img src="asset/images/shop/product/s16.jpg" className="img-fluid" alt="productImage" />
              </a>
              <a href="shop-product-detail.html" className="overlay-work">
                <img src="asset/images/shop/product/s-16.jpg" className="img-fluid" alt="productImage" />
              </a>
              <ul className="list-unstyled shop-icons">
                <li>
                  <a href="javascript:void(0)" className="btn btn-icon btn-pills btn-soft-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </a>
                </li>
                <li className="mt-2">
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#productview"
                    className="btn btn-icon btn-pills btn-soft-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </a>
                </li>
                <li className="mt-2">
                  <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body content pt-4 p-2">
              <a href="shop-product-detail.html" className="text-dark product-name h6">
                Clock
              </a>
              <div className="d-flex justify-content-between mt-1">
                <h6 className="text-dark small fst-italic mb-0 mt-1">
                  $18.00 <del className="text-danger ms-2">$22.00</del>
                </h6>
                <ul className="list-unstyled text-warning mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                  <li className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
