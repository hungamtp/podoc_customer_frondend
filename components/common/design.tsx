/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {};

export default function Design({ key }: Props) {
  return (
    <tr className="shop-list">
      <td className="h6 text-center">
        <a href=" " className="text-danger">
          <input type="checkbox" name="select" id="select" />
        </a>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src="asset/images/shop/product/s1.jpg"
            className="img-fluid avatar avatar-small rounded shadow"
            style={{ height: 'auto' }}
            alt="product"
          />
          <div>
            <h6 className="mb-0 ms-3">Design of Unisex Jersey Short Sleeve Tee</h6>
            <p _ngcontent-cjt-c236="" className="small-text mb-0 ms-3" style={{ color: '#757c7e' }}>
              <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
                <b>1</b>&nbsp;sizes
              </span>
              <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
                <b>2</b>&nbsp;colors
              </span>
            </p>
          </div>
        </div>
      </td>
      <td className="text-center">$ 255.00</td>
      <td className="text-center qty-icons">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Published
        </button>
        {/* 
        <button type="button" className="btn btn-light">
          Unpublished
        </button> */}
      </td>
      <td className="text-center qty-icons">
        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
          Order
        </button>
      </td>

      <td className="text-end fw-bold pe-4">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-icon btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="bi bi-pencil cursor-pointer fa-lg"></i>
          </button>

          <div
            className="dropdown-menu dd-menu dropdown-menu-end bg-light shadow rounded border border-primary p-3"
            style={{ width: '120px' }}
          >
            <a href=" " className="d-flex align-items-center mt-1 ">
              Edit Price
            </a>
            <a href=" " className="d-flex align-items-center mt-1">
              Edit design
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
}
