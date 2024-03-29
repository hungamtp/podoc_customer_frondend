/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Factory from '@/components/common/factory';
import Products from '@/components/common/designed-products';
import { MainLayout } from '@/components/layouts';
import useProductDetail from '@/hooks/api/use-product-detail';
import { useGetHighestRateDesignById } from '@/hooks/api/use-get-highest-rate-design-by-id';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAppSelector } from '@/components/hooks/reduxHook';
import { numberWithCommas } from 'helper/number-util';
import Link from 'next/link';
import { useGetBestSellerByProductId } from '@/hooks/api/use-get-best-seller-by-Id';
import { Rating, Typography } from '@mui/material';
import ShowRating from '@/components/common/show-rating';
import { Skeleton } from '@mui/material';
import { Box } from '@material-ui/core';

export default function ProductDetail() {
  const router = useRouter();
  const { rawProduct }: any = router.query;
  const { data: response, isLoading: isLoading } = useProductDetail(rawProduct);
  const { data: responseGetHighestRateDesignById, isLoading: isLoadingGetHighestRateDesignById } = useGetHighestRateDesignById(rawProduct);

  const { data: responseBestSellerByProductId, isLoading: isLoadingBestSellerByProductId } = useGetBestSellerByProductId(rawProduct);

  return (
    <>
      <div>
        <section className="bg-half-170 bg-light d-table w-100">
          <div className="container">
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-12 text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> {response?.name} </h4>
                </div>
              </div>
            </div>

            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb bg-white rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <a href="/">PODOC</a>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/raw-products">
                      <a>Tự thiết kế</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Chi tiết sản phẩm
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {isLoading && (
          <section className="section pb-0">
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <Skeleton variant="rectangular" width={400} height={400} />
                </div>
                <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <div className="section-title ms-md-4">
                    <Box sx={{ pt: 0.5 }}>
                      <Typography component="div" variant="h3" width="80%">
                        <Skeleton />
                      </Typography>
                      <Typography component="div" variant="h5">
                        <Skeleton width="60%" />
                      </Typography>

                      <Skeleton width="70%" />
                      <Skeleton width="60%" />
                      <Skeleton width="80%" />
                      <br />

                      <Typography component="div" variant="h4">
                        <Skeleton width="30%" />
                      </Typography>

                      <Typography component="div" variant="h1">
                        <Skeleton width="80%" />
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {response && (
          <section className="section pb-0">
            <div className="container mb-5">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="tiny-single-item">
                    <div className="tiny-slide">
                      <img src={response?.images[0]} className="img-fluid rounded" alt="productImage" />
                    </div>
                  </div>
                </div>

                <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                  <div className="section-title ms-md-4">
                    <h4 className="title"> {response?.name}</h4>
                    <h5 className="text-muted">
                      {response?.lowestPrice === 0
                        ? `Từ ${numberWithCommas(Number(response?.highestPrice))} VND`
                        : `Từ ${numberWithCommas(Number(response?.lowestPrice))} VND đến ${numberWithCommas(
                            Number(response?.highestPrice)
                          )} VND`}
                    </h5>
                    <ShowRating rate={response?.rate} rateCount={response?.rateCount} />

                    {/* <div>
                      <span className="sold-number ">
                        Đã bán {response?.sold}
                      </span>
                    </div> */}
                    <h5 className="mt-4 py-2">Mô tả sản phẩm :</h5>
                    <p className="text-muted">{response?.description}</p>

                    <div className="row mt-4 pt-2">
                      <div className="col-lg-6 col-12">
                        <div className="d-flex align-items-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="mt-5 mb-5 pt-3">
                <p className="h3 font-weight-bold">Danh sách nhà in</p>
              </div>
            </div>

            {response.factories.length != 0 ? (
              response.factories.map(factory => {
                return <Factory key={factory.id} factory={factory} productName={response.name} />;
              })
            ) : (
              <>
                <section className="factory">
                  <div className="container">
                    <div className="card">
                      <div className="card-header no-factory">Sản phẩm chưa được hỗ trợ bởi công ty nào</div>
                    </div>
                  </div>
                </section>
              </>
            )}
            {responseGetHighestRateDesignById?.length != 0 && responseGetHighestRateDesignById && (
              <Products title="Các sản phẩm được đánh giá cao" data={responseGetHighestRateDesignById} />
            )}

            {responseBestSellerByProductId?.length != 0 && responseBestSellerByProductId && (
              <Products title="Các sản phẩm đang bán chạy" data={responseBestSellerByProductId} />
            )}

            <div className="container-fluid mt-100 mt-60 px-0">
              <div className="py-5 bg-light">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-between">
                        <a href="shop-product-detail.html" className="text-dark align-items-center">
                          <span className="pro-icons"></span>
                        </a>
                        <a href="/" className="btn btn-lg btn-pills btn-icon btn-soft-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-home icons"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </a>
                        <a className="text-dark align-items-center">
                          <span className="pro-icons"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
ProductDetail.Layout = MainLayout;
