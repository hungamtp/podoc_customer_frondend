/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import useGetAllMyDesign from "@/hooks/api/design/use-get-all-my-design";
import usePublishDesignedProduct from "@/hooks/api/design/use-publish-designed-product";
import { GetAllDesignFilter } from "@/services/design";
import { SimpleDesignProduct } from "@/services/design/dto";
import { Link } from "@material-ui/icons";
import React, { useState } from "react";

type Props = {
  product: SimpleDesignProduct;
};

export default function Design({ product }: Props) {
  const { mutate, isLoading } = usePublishDesignedProduct();
  return (
    <tr className="shop-list">
      <td>
        <div className="d-flex align-items-center">
          <img
            src={
              product.imagePreviews[0]?.image ||
              "https://kravmaganewcastle.com.au/wp-content/uploads/2017/04/default-image.jpg"
            }
            className="img-fluid avatar avatar-small rounded shadow"
            style={{ height: "auto" }}
            alt="product"
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
      <td className="text-center">{product.designedPrice}</td>
      <td className="text-center qty-icons">
        {product.publish ? (
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Đang đăng bán
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Chỉ mình tôi
          </button>
        )}
        {/* 
        <button type="button" className="btn btn-light">
          Unpublished
        </button> */}
      </td>
      <td className="text-center qty-icons">
        <button
          className="btn btn-outline-success"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i className="bi bi-cart" />
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
            style={{ width: "120px" }}
          >
            {product.publish ? (
              <div
                className="d-flex align-items-center mt-1 cursor-pointer"
                onClick={() =>
                  mutate({ publish: false, productId: product.id })
                }
              >
                Gỡ xuống
              </div>
            ) : (
              <div
                className="d-flex align-items-center mt-1 cursor-pointer"
                onClick={() => mutate({ publish: true, productId: product.id })}
              >
                Đăng bán
              </div>
            )}
            <a href=" " className="d-flex align-items-center mt-1">
              Chi tiết
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
}
