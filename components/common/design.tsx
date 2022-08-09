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
        <div className="d-flex align-items-center">
          <div className="w-50">
            <Image
              src={renderImage.image}
              className="img-fluid"
              width={1000}
              height={1000}
              objectFit="cover"
              alt="productImage"
            />
          </div>
          <div className="w-50 " style={{ wordWrap: "break-word" }}>
            <Link href={`/my-product/${product.id}`} className="mb-0 ">
              <a>
                <p>{product.name}</p>
              </a>
            </Link>
          </div>
        </div>
      </td>
      <td className="align-middle">
        <p className="m-0">{numberWithCommas(product.designedPrice)}</p>
      </td>
      <td className="align-middle">
        {product.publish && product.productOfDesignDeleted === false && (
          <div className="badge badge-success m-0 p-1">Đang đăng bán</div>
        )}
        {product.publish === false &&
          product.productOfDesignDeleted === false && (
            <div className="badge badge-secondary m-0 p-1">Chỉ mình tôi</div>
          )}
        {product.productOfDesignDeleted === true && (
          <div className="badge badge-danger m-0 p-1">
            Sản phẩm ngừng sản xuất
          </div>
        )}
        {/* 
        <button type="button" className="btn btn-light">
          Unpublished
        </button> */}
      </td>
      {product.productOfDesignDeleted === false && (
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
      )}

      {product.productOfDesignDeleted === false && (
        <td className="align-middle">
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-icon btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots cursor-pointer fa-lg"></i>
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
                  onClick={() =>
                    mutate({ publish: true, productId: product.id })
                  }
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
      )}
    </tr>
  );
}
