/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import * as React from "react";
import useRawProduct from "@/hooks/api/use-get-all-product-raw";
import { RawProductFilter } from "@/hooks/api/use-get-all-product-raw";
import { useState } from "react";
import RawProduct from "@/components/common/raw-product";
import Pagination from "@/components/common/pagination";
import search from "@/redux/slices/search";
import Categories from "@/components/common/categories";
import { useForm } from "react-hook-form";
import PaginationComponent from "@/components/common/mui-pagination";
import Link from "next/link";

export interface IProductProps {}

export default function RawProducts(props: IProductProps) {
  const [filter, setFilter] = useState<RawProductFilter>({
    pageNumber: 0,
    pageSize: 9,
    sort: "",
  });
  const [totalPages, setTotalPages] = React.useState(0);

  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name: "" },
  });

  const onSubmit = (data: { name: string }) => {
    const value = data.name;
    let tmpFilter = { ...filter };
    if (value) tmpFilter = { ...filter, name: value };
    else delete tmpFilter.name;
    setFilter(tmpFilter);
  };

  const handleCategoryChange = (value: string) => {
    let tmpFilter = { ...filter } as RawProductFilter;
    if (value) tmpFilter = { ...filter, category: value };
    else delete tmpFilter.category;
    setFilter(tmpFilter);
  };
  const { data: response, isLoading: isLoading } = useRawProduct(filter);
  React.useEffect(() => {
    if (response) setTotalPages(Math.ceil(response.elements / filter.pageSize));
  }, [response]);

  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> Tất cả sản phẩm thô</h4>
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
                  <li className="breadcrumb-item active" aria-current="page">
                    Tự thiết kế
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
          {response && response.elements > 0 ? (
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="card border-0 sidebar sticky-bar">
                    <div className="card-body p-0">
                      {/* SEARCH */}
                      <div className="widget">
                        <form
                          role="search"
                          method="get"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="input-group mb-3 border rounded">
                            <input
                              type="text"
                              className="form-control border-0"
                              placeholder="Tên sản phẩm"
                              {...register("name")}
                            />
                            <button
                              type="submit"
                              className="input-group-text bg-white border-0"
                              id="searchsubmit"
                            >
                              <i className="uil uil-search" />
                            </button>
                          </div>
                        </form>
                      </div>
                      {/* SEARCH */}
                      <Categories handleCategoryChange={handleCategoryChange} />

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
                          {response && response?.elements < filter.pageSize
                            ? response?.elements
                            : filter.pageSize}{" "}
                          của {response?.elements}
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
                    {response?.data.map((product) => {
                      return <RawProduct key={product.id} product={product} />;
                    })}
                    {totalPages <= 1 ? (
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
              {/*end row*/}
            </div>
          ) : (
            <p className="h2 text-center">Chưa có sản phẩm thô nào</p>
          )}
          {/*end container*/}
        </section>
        {/*end section*/}
      </div>
    </>
  );
}
RawProducts.Layout = MainLayout;
