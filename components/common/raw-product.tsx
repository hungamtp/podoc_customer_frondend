/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ProductHomePageDTO, TAG } from '@/services/type.dto';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../hooks/reduxHook';
import { setCurrentProductId } from '@/redux/slices/product';
import { numberWithCommas } from 'helper/number-util';
import Image from 'next/image';
type Props = {
  product: ProductHomePageDTO;
};

export default function RawProduct({ product }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const redirectToProductDetail = () => {
    dispatch(setCurrentProductId(product.id));
    router.push(`/raw-products/${product.id}`);
  };
  return (
    <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" onClick={redirectToProductDetail}>
      <div className="card shop-list border-0 position-relative">
        <ul className="label list-unstyled mb-0">
          {product.tags.map((tag, index) => {
            return (
              <li key={index}>
                <span
                  className={`badge badge-link rounded-pill ${tag.tag.name == TAG.HOT && 'bg-success'} ${
                    tag.tag.name == TAG.NEW && 'bg-danger'
                  } ${tag.tag.name == TAG.BEST_SELLER && 'bg-primary'} btn-primary tag-pointer p-1`}
                >
                  {tag.tag.name}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="shop-image position-relative overflow-hidden rounded shadow">
          <Image
            src={product.productImages[0].image}
            className="img-fluid"
            width={1000}
            height={1000}
            objectFit="cover"
            alt="productImage"
          />
          <div className="overlay-work">
            {product.productImages[0].image ? (
              <img
                src={product.productImages[0].image}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                height="450px"
                alt=""
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="card-body content pt-4 p-2">
          <div className="text-dark product-name h6">{product.name}</div>
          <div className="d-flex justify-content-between mt-1">
            <h6 className="text-dark small fst-italic mb-0 mt-1">
              Giá từ
              <span className="text-danger ms-2">{numberWithCommas(product.priceFrom)} VND</span>{' '}
            </h6>
          </div>
          <p _ngcontent-cjt-c236="" className="small-text" style={{ color: '#757c7e' }}>
            <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
              <b>{product.numberOfSize}</b>&nbsp;Kích thước
            </span>
            <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
              <b>{product.numberOfColor}</b>&nbsp;Màu
            </span>
            <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
              <b>{product.numberOfFactory}</b>&nbsp;Xưởng in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
