/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProductHomePageDTO } from '@/services/type.dto';
import { useRouter } from 'next/router';
type Props = {
  product: ProductHomePageDTO;
};

export default function RawProduct({ product }: Props) {
  const router = useRouter();
  return (
    <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" onClick={() => router.push(`product-detail/${product.id}`)}>
      <div className="card shop-list border-0 position-relative">
        <ul className="label list-unstyled mb-0">
          {product.tags.map((tag, index) => {
            return (
              <li key={index}>
                <span className="badge badge-link rounded-pill bg-success tag-pointer">Hot</span>
              </li>
            );
          })}
        </ul>
        <div className="shop-image position-relative overflow-hidden rounded shadow">
          <a>
            {product.productImages[0].image ? (
              <img src={product.productImages[0].image} className="img-fluid" alt="" />
            ) : (
              <img src="asset/images/shop/product/s1.jpg" className="img-fluid" alt="" />
            )}
          </a>
          <a className="overlay-work">
            {product.productImages[1].image ? <img src={product.productImages[1].image} className="img-fluid" alt="" /> : ''}
          </a>
          <ul className="list-unstyled shop-icons">
            <li>
              <a href=" " className="btn btn-icon btn-pills btn-soft-danger">
                <i className="bi bi-heart"></i>
              </a>
            </li>
            <li className="mt-2">
              <a href=" " data-bs-toggle="modal" data-bs-target="#productview" className="btn btn-icon btn-pills btn-soft-primary">
                <i className="bi bi-eye"></i>
              </a>
            </li>
            <li className="mt-2">
              <a href="shop-cart.html" className="btn btn-icon btn-pills btn-soft-warning">
                <i className="bi bi-cart-plus"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body content pt-4 p-2">
          <a className="text-dark product-name h6">{product.name}</a>
          <div className="d-flex justify-content-between mt-1">
            {/* <h6 className="text-dark small fst-italic mb-0 mt-1">
               <del className="text-danger ms-2">$21.00</del>{' '}
            </h6> */}
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
          <p _ngcontent-cjt-c236="" className="small-text" style={{ color: '#757c7e' }}>
            <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
              <b>{product.numberOfSize}</b>&nbsp;sizes
            </span>
            <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
              <b>{product.numberOfColor}</b>&nbsp;colors
            </span>
            <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
              <b>{product.numberOfFactory}</b>&nbsp;print providers
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
