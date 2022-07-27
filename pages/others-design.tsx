/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import PaginationComponent from "@/components/common/mui-pagination";
import DesignedProductCard from "@/components/designed-products/designed-product-card";
import { MainLayout } from "@/components/layouts";
import useGetOthersDesignByUserId from "@/hooks/api/design/use-get-others-design-by-userId";
import { RawProductFilter } from "@/hooks/api/use-get-all-product-raw";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

export interface IProductProps {}

export default function OthersDesigns(props: IProductProps) {
  const [filter, setFilter] = useState<RawProductFilter>({
    pageNumber: 0,
    pageSize: 9,
    sort: "",
  });
  const [totalPages, setTotalPages] = React.useState(0);
  const router = useRouter();
  const { userId } = router.query;

  const { data: response, isLoading: isLoading } = useGetOthersDesignByUserId(
    filter,
    userId as string
  );

  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> Tất cả sản phẩm </h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <Link href="home">
                      <a>PODOC</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/raw-products">
                      <a>Cửa hàng</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Sản phẩm của người khác
                  </li>
                </ul>
              </nav>
            </div>
          </div>{" "}
          {/*end container*/}
        </section>
        {/*end section*/}
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Products */}
        <section className="section">
          <div className="container">
            {response && response.content && response.content.length > 0 && (
              <div className="row">
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="card border-0 sidebar sticky-bar">
                    <div className="card-body p-0">
                      {/* SEARCH */}
                      <div className="row align-items-end">
                        <div className="d-flex flex-wrap w-full">
                          <img
                            src={response.content[0].user.credentialImage}
                            className="avatar avatar rounded-circle"
                            width={120}
                            height={120}
                          />
                          <div className="ms-3 mt-4">
                            <h6 className="text-muted mb-0">Người thiết kế</h6>
                            <h5 className="mb-0">
                              {response.content[0].user.lastName}{" "}
                              {response.content[0].user.firstName}
                            </h5>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-8 mt-4 mt-sm-0 pt-2 pt-sm-0"></div>
                        {/*end col*/}
                      </div>
                      {/* Top Products */}
                    </div>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-lg-9 col-md-8 col-12 mt-5 pt-2 mt-sm-0 pt-sm-0">
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-md-7">
                      <div className="section-title">
                        <h5 className="mb-0">
                          Hiển thị 1–
                          {response.totalElements < filter.pageSize
                            ? response.totalElements
                            : filter.pageSize}{" "}
                          của {response.totalElements}
                          &nbsp;sản phẩm
                        </h5>
                      </div>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-4 col-md-5 mt-4 mt-sm-0 pt-2 pt-sm-0">
                      <div className="d-flex justify-content-md-between align-items-center">
                        {/* <div className="form custom-form">
                          <div className="mb-0">
                            <select
                              className="form-select form-control"
                              aria-label="Default select example"
                              id="Sortbylist-job"
                            >
                              <option selected>Sort by latest</option>
                              <option>Sort by popularity</option>
                              <option>Sort by rating</option>
                              <option>Sort by price: low to high</option>
                              <option>Sort by price: high to low</option>
                            </select>
                          </div>
                        </div> */}
                        {/* <div className="mx-2">
                          <a href="shop-grids.html" className="h5 text-muted">
                            <i className="uil uil-apps" />
                          </a>
                        </div>
                        <div>
                          <a href="shop-lists.html" className="h5 text-muted">
                            <i className="uil uil-list-ul" />
                          </a>
                        </div> */}
                      </div>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                  <div className="row">
                    {response.content.map((product) => {
                      return (
                        <DesignedProductCard
                          key={product.id}
                          product={product}
                        />
                      );
                    })}
                    {totalPages == 0 ? (
                      <></>
                    ) : (
                      <div className="d-flex justify-content-center">
                        <PaginationComponent
                          total={totalPages}
                          filter={filter}
                          setFilter={setFilter}
                        />
                      </div>
                    )}
                  </div>
                  {/*end row*/}
                </div>
                {/*end col*/}
              </div>
            )}
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
      </div>
    </>
  );
}
OthersDesigns.Layout = MainLayout;
