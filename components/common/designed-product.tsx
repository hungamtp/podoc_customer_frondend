/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Best4DesignedProduct, ProductHomePage } from '@/services/type.dto';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ShowRating from './show-rating';
type Props = {
  product: ProductHomePage;
};

export default function DesignedProduct({ product }: Props) {
  const router = useRouter();
  const goToProfile = (userId: string) => {
    router.push(`others-design?userId=${userId}`);
  };
  const getRates = (rate: number): number[] => {
    let result = [];
    rate = Math.ceil(rate);
    for (var i = 1; i <= rate; i++) {
      result.push(i);
    }
    return result;
  };
  const getUnRates = (rate: number): number[] => {
    let result = [];
    rate = Math.ceil(rate);
    for (var i = 1; i <= 5 - rate; i++) {
      result.push(i);
    }
    return result;
  };
  return (
    <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2 cursor-pointer" onClick={() => router.push(`/designs/${product.id}`)}>
      <div className="card shop-list border-0 position-relative">
        <ul className="label list-unstyled mb-0">
          {product.tags &&
            product.tags.map((tag: String, index: number) => {
              return (
                <li key={index}>
                  <span className="badge badge-link rounded-pill bg-primary p-1">{tag}</span>
                </li>
              );
            })}
        </ul>
        <div className="shop-image position-relative overflow-hidden rounded shadow">
          <a>
            <Image src={product.image} className="img-fluid" width={1000} height={1000} objectFit="cover" alt="productImage" />
          </a>
          {/* <a className="overlay-work">
            <img src="asset/images/shop/product/s-13.jpg" className="img-fluid" alt="productImage" />
          </a> */}
        </div>
        <div className="card-body content pt-4 p-2">
          <a href="shop-product-detail.html" className="text-dark product-name h6">
            {product.name}
          </a>
          <div className="d-flex justify-content-between mt-1">
            <h6 className="text-dark small fst-italic ">
              Giá : <span className="text-danger ">{product.designedPrice} VND</span>
            </h6>
          </div>
          <div className="design-detail">{product.rateCount > 0 && <ShowRating rate={product.rate} rateCount={product.rateCount} />}</div>
          <div>
            <span className="sold-number ">Đã bán: {product.soldCount}</span>
          </div>
          <div className="designer cursor-pointer">
            Thiết kế bởi{' '}
            <span onClick={() => goToProfile(product.userId)}>
              <b style={{ textDecoration: 'underline' }}>{product.username}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
