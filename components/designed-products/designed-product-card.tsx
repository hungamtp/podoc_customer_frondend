/* eslint-disable @next/next/no-img-element */
import { ShownDesignedProduct } from '@/models/design';
import { Rating } from '@mui/material';
import { numberWithCommas } from 'helper/number-util';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ShowRating from '../common/show-rating';
type Props = {
  product: ShownDesignedProduct;
};

export default function DesignedProductCard({ product }: Props) {
  let renderedImage = product.imagePreviews[0];
  product.imagePreviews.forEach(image => {
    if (image.position === 'front') renderedImage = image;
  });
  const router = useRouter();
  const goToProfile = (userId: string) => {
    router.push(`others-design?userId=${userId}`);
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
                  <span className="badge badge-link rounded-pill bg-primary p-1">{tag}</span>
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
        </div>
        <div className="card-body content pt-4 p-2">
          <Link href={`/designs/${product.id}`}>
            <a className="text-dark product-name h6">{product.name}</a>
          </Link>
          <div className="d-flex justify-content-between mt-1">
            <h6 className="text-dark small fst-italic mb-0 mt-1">{numberWithCommas(product.price)} VND</h6>
          </div>
          {product.ratingCount > 0 ? (
            <ShowRating rate={product.rating} rateCount={product.ratingCount} />
          ) : (
            <span className="sold-number ">chưa có đánh giá nào</span>
          )}

          <div>
            <span className="sold-number ">Đã bán {product.sold}</span>
          </div>
          <div className="designer cursor-pointer">
            Thiết kế bởi{' '}
            <span onClick={() => goToProfile(product.user.id)}>
              <b>{product.user.firstName + ' ' + product.user.lastName}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
