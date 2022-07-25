/* eslint-disable @next/next/no-img-element */
import { ShownDesignedProduct } from "@/models/design";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  product: ShownDesignedProduct;
};

export default function DesignedProductCard({ product }: Props) {
  let renderedImage = product.imagePreviews[0];
  product.imagePreviews.forEach((image) => {
    if (image.position === "front") renderedImage = image;
  });
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
    <div
      className="col-lg-4 col-md-6 col-12 mt-4 pt-2"
      // onClick={() => router.push(`/design-detail?id=${product.id}`)}
    >
      <div className="card shop-list border-0 position-relative">
        <ul className="label list-unstyled mb-0">
          {product.tagName &&
            product.tagName.map((tag: String, index: number) => {
              return (
                <li key={index}>
                  <span className="badge badge-link rounded-pill bg-primary p-1">
                    {tag}
                  </span>
                </li>
              );
            })}
        </ul>
        <div
          className="shop-image position-relative overflow-hidden rounded shadow "
          onClick={() => router.push(`/designs/${product.id}`)}
        >
          <Image
            src={renderedImage.image}
            className="img-fluid"
            width={1000}
            height={1000}
            objectFit="cover"
            alt="productImage"
          />
          {/* <a className="overlay-work">
            <img src="asset/images/shop/product/s-13.jpg" className="img-fluid" alt="productImage" />
          </a> */}
          <ul className="list-unstyled shop-icons">
            <li className="mt-2">
              <a className="btn btn-icon btn-pills btn-soft-primary">
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
          <Link href={`/designs/${product.id}`}>
            <a className="text-dark product-name h6">{product.name}</a>
          </Link>
          <div className="d-flex justify-content-between mt-1">
            <h6 className="text-dark small fst-italic mb-0 mt-1">
              {numberWithCommas(product.price)} VND
            </h6>
          </div>
          <div className="design-detail">
            <ul className="list-unstyled">
              {getRates(product.rating).map((rate) => {
                return (
                  <li key={rate} className="list-inline-item text-warning ">
                    <i className="mdi mdi-star"></i>
                  </li>
                );
              })}
              {getUnRates(product.rating).map((rate) => {
                return (
                  <li key={rate} className="list-inline-item">
                    <i className="mdi mdi-star"></i>
                  </li>
                );
              })}
            </ul>
            <span className="list-unstyled text-warning  ">
              ({product.rating.toFixed(2)})
            </span>
          </div>
          <div>
            <span className="sold-number ">Đã bán {product.sold}</span>
          </div>
          <div className="designer cursor-pointer">
            Thiết kế bởi{" "}
            <span onClick={() => goToProfile(product.user.id)}>
              <b>{product.user.firstName + " " + product.user.lastName}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
