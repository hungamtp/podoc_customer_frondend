/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Categories from '@/components/common/categories';
import DesignedProduct from '@/components/common/designed-product';
import PaginationComponent from '@/components/common/mui-pagination';
import RawProduct from '@/components/common/raw-product';
import ShowRating from '@/components/common/show-rating';
import DesignedProductCard from '@/components/designed-products/designed-product-card';
import { MainLayout } from '@/components/layouts';
import useGetAllDesigns from '@/hooks/api/design/use-get-all-designs';
import useRawProduct, { RawProductFilter } from '@/hooks/api/use-get-all-product-raw';
import { useGetBestSeller } from '@/hooks/api/use-get-best-seller';
import search from '@/redux/slices/search';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface IProductProps {}

export default function DesignedProducts(props: IProductProps) {
  const [filter, setFilter] = useState<RawProductFilter>({
    pageNumber: 0,
    pageSize: 9,
    sort: '',
  });

  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name: '' },
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

  const { data: response, isLoading: isLoading } = useGetAllDesigns(filter);
  const { data: getBestSellerResponse, isLoading: isLoadingBestSeller } = useGetBestSeller();

  const totalPages = Math.ceil((response?.elements || filter.pageSize) / filter.pageSize);

  return (
    <>
      <div>
        <section
          className="bg-half-170 bg-light d-table w-100"
          style={{
            background: "url('/asset/images/banner/banner_fixed.jpg') no-repeat center center",
            marginTop: '30px',
          }}
        >
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0">Tất cả thiết kế</h4>
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
                    Thiết kế có sẵn
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
                      <form role="search" method="get" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group mb-3 border rounded">
                          <input type="text" className="form-control border-0" {...register('name')} placeholder="Tên sản phẩm" />
                          <button type="submit" className="input-group-text bg-white border-0" id="searchsubmit">
                            <i className="uil uil-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* SEARCH */}
                    <Categories handleCategoryChange={handleCategoryChange} />

                    {/* Top Products */}
                    {getBestSellerResponse && getBestSellerResponse.length > 0 && (
                      <div className="widget mt-4 pt-2">
                        <h5 className="widget-title">Sản phẩm bán chạy</h5>
                        <ul className="list-unstyled mt-4 mb-0">
                          {getBestSellerResponse.map(product => (
                            <li className="d-flex align-items-center" key={product.id}>
                              <Link href={`designs/${product.id}`}>
                                <a className="w-25">
                                  <Image
                                    src={product.image}
                                    className="img-fluid avatar avatar-small rounded shadow"
                                    style={{ height: 'auto' }}
                                    width={2000}
                                    height={2000}
                                    objectFit="cover"
                                    alt="productImage"
                                  />
                                </a>
                              </Link>

                              <div className="flex-1 content ms-3">
                                <Link href={`designs/${product.id}`}>
                                  <a className="text-dark h6">{product.name}</a>
                                </Link>
                                <h6 className="text-dark small fst-italic mb-0 mt-1">
                                  {product.designedPrice} VNĐ
                                  {/* <del className="text-danger ms-2">$22.00</del>{" "} */}
                                </h6>

                                <ShowRating rate={product.rate} rateCount={product.rateCount} />

                                <p className="text-success">{product.username}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-9 col-md-8 col-12 mt-5 pt-2 mt-sm-0 pt-sm-0">
                {!isLoading && response && response.elements > 0 ? (
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-md-7">
                      <div className="section-title">
                        <h5 className="mb-0">
                          Hiển thị 1–
                          {response && response?.elements < filter.pageSize ? response?.elements : filter.pageSize} của {response?.elements}
                          &nbsp;sản phẩm
                        </h5>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex mt-5 ">
                    {" "}
                    {!isLoading && (
                      <h3 className="mt-5 text-center w-100">
                        Không tìm thấy sản phẩm nào
                      </h3>
                    )}
                  </div>
                )}
                {/*end row*/}
                {response && (
                  <div className="row">
                    {response?.data.map(product => {
                      return <DesignedProductCard key={product.id} product={product} />;
                    })}

                    {Math.ceil(response?.elements / filter.pageSize) > 1 && (
                      <div className="d-flex justify-content-center">
                        <PaginationComponent total={totalPages} filter={filter} setFilter={setFilter} />
                      </div>
                    )}
                  </div>
                )}
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
DesignedProducts.Layout = MainLayout;
