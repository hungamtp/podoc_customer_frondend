/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import usePublishDesignedProduct from "@/hooks/api/design/use-publish-designed-product";
import { SimpleDesignProduct } from "@/services/design/dto";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  product: SimpleDesignProduct;
};

export default function Design({ product }: Props) {
  const { mutate, isLoading } = usePublishDesignedProduct();
  const router = useRouter();
  return (
    <tr className="">
      <td className="d-flex align-items-center">
        <div className="d-flex align-items-center">
        <Image
              src={product.imagePreviews[0].image}
              className="img-fluid"
              width={100}
              height={100}
              objectFit="cover"
              alt="productImage"
            />
          <div>
            <h6 className="mb-0 ms-3">{product.name}</h6>
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
      <td><div className="d-flex align-items-center h-full"><p >{product.designedPrice}</p></div></td>
      <td className="text-center qty-icons">
        {product.publish ? (
          <p className="text-success mt-3">Đang đăng bán</p>
        ) : (
          <p className="text-secondary mt-3">Chỉ mình tôi</p>
        )}
        {/* 
        <button type="button" className="btn btn-light">
          Unpublished
        </button> */}
      </td>
      <td className="text-center qty-icons">
        <button
          className="btn btn-outline-success mt-3"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="bi bi-cart" />
        </button>
      </td>

      <td className="text-end fw-bold pe-4">
        <div className="dropdown mt-3">
          <button
            type="button"
            className="btn btn-icon btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="bi bi-pencil cursor-pointer fa-lg"></i>
          </button>

          <div className="dropdown-menu dd-menu dropdown-menu-start rounded border ">
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
