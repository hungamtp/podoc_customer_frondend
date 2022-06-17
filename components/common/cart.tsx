/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {};

export default function Cart({}: Props) {
  return (
    <tr className="shop-list">
      <td className="h6 text-center">
        <a href=" " className="text-danger">
          <i className="uil uil-times"></i>
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
          <h6 className="mb-0 ms-3">T-Shirt</h6>
        </div>
      </td>
      <td className="text-center">M</td>
      <td className="text-center">White</td>
      <td className="text-center">$ 255.00</td>
      <td className="text-center qty-icons">
        <button className="btn btn-icon btn-soft-primary minus">-</button>
        <input min="0" name="quantity" value="7" type="number" className="btn btn-icon btn-soft-primary qty-btn quantity" />
        <button className="btn btn-icon btn-soft-primary plus">+</button>
      </td>
      <td className="text-end fw-bold pe-4">$510.00</td>
    </tr>
  );
}
