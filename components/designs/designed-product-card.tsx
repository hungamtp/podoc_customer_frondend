import * as React from "react";

export interface IDesignedProductCardProps {}

export default function DesignedProductCard(props: IDesignedProductCardProps) {
  return (
    <div>
      <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
        <div className="card shop-list border-0 position-relative">
          <ul className="label list-unstyled mb-0">
            <li>
              <a href=" " className="badge badge-link rounded-pill bg-success">
                Featured
              </a>
            </li>
          </ul>
          <div className="shop-image position-relative overflow-hidden rounded shadow">
            <a href="product-detail">
              <img
                src="asset/images/shop/product/s1.jpg"
                className="img-fluid"
                alt=""
              />
            </a>
            <a href="product-detail" className="overlay-work">
              <img
                src="asset/images/shop/product/s-1.jpg"
                className="img-fluid"
                alt=""
              />
            </a>
            <ul className="list-unstyled shop-icons">
              <li>
                <a href=" " className="btn btn-icon btn-pills btn-soft-danger">
                  <i data-feather="heart" className="icons" />
                </a>
              </li>
              <li className="mt-2">
                <a
                  href=" "
                  data-bs-toggle="modal"
                  data-bs-target="#productview"
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
                $16.00 <del className="text-danger ms-2">$21.00</del>{" "}
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
  );
}
