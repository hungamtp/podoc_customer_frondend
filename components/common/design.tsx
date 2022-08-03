/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import usePublishDesignedProduct from "@/hooks/api/design/use-publish-designed-product";
import { SimpleDesignProduct } from "@/services/design/dto";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  product: SimpleDesignProduct;
};

export default function Design({ product }: Props) {
  const { mutate, isLoading } = usePublishDesignedProduct();
  let renderImage = product.imagePreviews[0];
  product.imagePreviews.forEach((image) => {
    if (image.position === "front") renderImage = image;
  });
  const router = useRouter();

  return (
    <tr className="">
      <td>
        <div className="row">
          <div className="col-6">
            <Image
              src={renderImage.image}
              className="img-fluid"
              width={1000}
              height={1000}
              objectFit="cover"
              alt="productImage"
            />
          </div>
          <div className="col-6 d-flex align-items-center">
            <Link href={`/my-product/${product.id}`} className="mb-0 ">
              <a>{product.name}</a>
            </Link>
            {/* <p
              _ngcontent-cjt-c236=""
              className="small-text mb-0 ms-3"
              style={{ color: "#757c7e" }}
            >
              <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
                <b>1</b>&nbsp;sizes
              </span>
              <span _ngcontent-cjt-c236="" className="detail ng-star-inserted">
                <b>2</b>&nbsp;colors
              </span>
            </p> */}
          </div>
        </div>
      </td>
      <td className="align-middle">
        <p className="">{numberWithCommas(product.designedPrice)}</p>
      </td>
      <td className="align-middle">
        {product.publish ? (
          <div className="badge badge-success mb-3 p-1">Đang đăng bán</div>
        ) : (
          <div className="badge badge-secondary mb-3 p-1">Chỉ mình tôi</div>
        )}
        {/* 
        <button type="button" className="btn btn-light">
          Unpublished
        </button> */}
      </td>
      <td className="align-middle">
        <button
          onClick={() => router.push(`/designs/${product.id}`)}
          className="btn btn-outline-success "
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="bi bi-cart" />
        </button>
      </td>

      <td className="align-middle">
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

          <div className="dropdown-menu dd-menu dropdown-menu-end rounded border ">
            {product.publish ? (
              <div
                className="d-flex align-items-center mt-1  hoverButton text-center p-2"
                onClick={() =>
                  mutate({ publish: false, productId: product.id })
                }
              >
                Gỡ xuống
              </div>
            ) : (
              <div
                className="d-flex align-items-center mt-1  hoverButton text-center p-2"
                onClick={() => mutate({ publish: true, productId: product.id })}
              >
                Đăng bán
              </div>
            )}
            <div
              className="d-flex align-items-center mt-1  hoverButton text-center p-2"
              onClick={() => router.push(`/my-product/${product.id}`)}
            >
              Chi tiết
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
