/* eslint-disable @next/next/no-img-element */
import { MainLayout } from '@/components/layouts';
import * as React from 'react';
import useRawProduct from '@/hooks/api/use-get-all-product-raw';
import { RawProductFilter } from '@/hooks/api/use-get-all-product-raw';
import { useState } from 'react';
import RawProduct from '@/components/common/raw-product';
import Pagination from '@/components/common/pagination';
export interface IProductProps {}

export default function RawProducts(props: IProductProps) {
  const [filter, setFilter] = useState<RawProductFilter>({
    pageNumber: 0,
    pageSize: 10,
    search: '',
    sort: '',
  });
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilter({ ...filter, pageNumber: value - 1 });
  };
  const { data: response, isLoading: isLoading } = useRawProduct(filter);

  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> All Products </h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <a href="index.html">Landrick</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="index-shop.html">Shop</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Products
                  </li>
                </ul>
              </nav>
            </div>
          </div>{' '}
          {/*end container*/}
        </section>
        {/*end section*/}
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* Hero End */}
        {/* Start Products */}
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-12">
                <div className="card border-0 sidebar sticky-bar">
                  <div className="card-body p-0">
                    {/* SEARCH */}
                    <div className="widget">
                      <form role="search" method="get">
                        <div className="input-group mb-3 border rounded">
                          <input type="text" id="s" name="s" className="form-control border-0" placeholder="Search Keywords..." />
                          <button type="submit" className="input-group-text bg-white border-0" id="searchsubmit">
                            <i className="uil uil-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* SEARCH */}
                    {/* Categories */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Categories</h5>
                      <ul className="list-unstyled mt-4 mb-0 blog-categories">
                        <li>
                          <a href="jvascript:void(0)">Men</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Women</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Electronics</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Jewellery</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Shoes</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Kid’s Wear</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Sports</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Toys</a>
                        </li>
                        <li>
                          <a href="jvascript:void(0)">Gift Corners</a>
                        </li>
                      </ul>
                    </div>
                    {/* Categories */}
                    {/* color */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Color</h5>
                      <ul className="list-unstyled mt-4 mb-0">
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-primary">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-danger">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-success">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-info">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-secondary">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="javascript:void(0)" className="btn btn-sm btn-icon btn-pills btn-warning">
                            <span className="d-none">.</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* COlor */}
                    {/* Top Products */}
                    <div className="widget mt-4 pt-2">
                      <h5 className="widget-title">Top Products</h5>
                      <ul className="list-unstyled mt-4 mb-0">
                        <li className="d-flex align-items-center">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s1.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              T-Shirt
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s1.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              Watch
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s1.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              Coffee Cup
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                        <li className="d-flex align-items-center mt-2">
                          <a href="javascript:void(0)">
                            <img
                              src="asset/images/shop/product/s1.jpg"
                              className="img-fluid avatar avatar-small rounded shadow"
                              style={{ height: 'auto' }}
                              alt=""
                            />
                          </a>
                          <div className="flex-1 content ms-3">
                            <a href="javascript:void(0)" className="text-dark h6">
                              Wooden Stools
                            </a>
                            <h6 className="text-dark small fst-italic mb-0 mt-1">
                              $18.00 <del className="text-danger ms-2">$22.00</del>{' '}
                            </h6>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-9 col-md-8 col-12 mt-5 pt-2 mt-sm-0 pt-sm-0">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-md-7">
                    <div className="section-title">
                      <h5 className="mb-0">Showing 1–15 of 47 results</h5>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-lg-4 col-md-5 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <div className="d-flex justify-content-md-between align-items-center">
                      <div className="form custom-form">
                        <div className="mb-0">
                          <select className="form-select form-control" aria-label="Default select example" id="Sortbylist-job">
                            <option selected>Sort by latest</option>
                            <option>Sort by popularity</option>
                            <option>Sort by rating</option>
                            <option>Sort by price: low to high</option>
                            <option>Sort by price: high to low</option>
                          </select>
                        </div>
                      </div>
                      <div className="mx-2">
                        <a href="shop-grids.html" className="h5 text-muted">
                          <i className="uil uil-apps" />
                        </a>
                      </div>
                      <div>
                        <a href="shop-lists.html" className="h5 text-muted">
                          <i className="uil uil-list-ul" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
                <div className="row">
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <RawProduct />
                  <Pagination />
                </div>
                {/*end row*/}
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
      </div>
    </>
  );
}
RawProducts.Layout = MainLayout;
