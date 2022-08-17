/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Account } from "@/components/layouts";
import useUserDashboard from "@/hooks/api/dashboard/use-dashboard";
import useGetAllMyDesign from "@/hooks/api/design/use-get-all-my-design";
import { GetAllDesignFilter } from "@/services/design";
import { nanoid } from "@reduxjs/toolkit";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useState } from "react";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const { data: response } = useUserDashboard();
  const [filter, setFilter] = useState<GetAllDesignFilter>({
    pageNumber: 0,
    pageSize: 9,
  });

  const { data: responseDesigned, isLoading } = useGetAllMyDesign(filter);
  let renderImage = responseDesigned?.content.map((product) => {
    product.imagePreviews[0];
  });

  return (
    <>
      {response && responseDesigned && (
        <div className="container-fluid">
          <div className="layout-specing">
            <div className="row row-cols-xl-5 row-cols-md-2 row-cols-1">
              <div className="col mt-4">
                <a className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-user-circle fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Tổng thiết kế</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value">
                          {response.designCount}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              {/*end col*/}
              <div className="col mt-4">
                <a className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-usd-circle fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Tổng thu nhập</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value">
                          {numberWithCommas(response.income)}{" "}
                        </span>
                        VND
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              {/*end col*/}
              <div className="col mt-4">
                <a className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-shopping-bag fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Tổng đã bán</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value">
                          {response.designSoldCount}{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              {/*end col*/}

              {/*end col*/}
              <div className="col-lg-12 mt-3">
                <p className="fs-5 text-dark fw-bold mb-0 ">
                  <span className="counter-value">Thống kê theo tháng</span>
                </p>
              </div>

              <div className="col mt-4">
                <a className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-usd-circle fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Thu nhập trong tháng</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value" data-target={145}>
                          {numberWithCommas(response.incomeCurrentMonth)} VND
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col mt-4">
                <a className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
                  <div className="d-flex align-items-center">
                    <div className="icon text-center rounded-pill">
                      <i className="uil uil-shopping-bag fs-4 mb-0" />
                    </div>
                    <div className="flex-1 ms-3">
                      <h6 className="mb-0 text-muted">Đã bán trong tháng</h6>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value" data-target={145}>
                          {response.designSoldCountCurrentMonth}
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* end col */}

              {responseDesigned.content && responseDesigned.content.length > 0 && (
                <div className="col-lg-12 mt-3">
                  <p className="fs-5 text-dark fw-bold mb-0 ">
                    <span className="counter-value">
                      Sản phấm đã bán trên thiết kế
                    </span>
                  </p>
                </div>
              )}

              {responseDesigned.content.map((data) => {
                const image = data.imagePreviews.filter((imagePreviews) => {
                  return imagePreviews.position === "front";
                }) || [data.imagePreviews[0]];
                return (
                  <div key={data.id} className="col-lg-12 mt-2">
                    <a className="features feature-primary d-flex justify-content-between align-items-center bg-white rounded shadow p-3">
                      <div className="d-flex align-items-center">
                        <div className="w-25">
                          <Image
                            src={image[0].image}
                            className="img-fluid rounded-pill"
                            width={200}
                            height={200}
                            objectFit="cover"
                            alt="productImage"
                          />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">{data.name}</h6>
                          <p className="fs-6 text-dark fw-bold mb-0">
                            <span className="counter-value">
                              {numberWithCommas(data.designedPrice)} VND
                            </span>
                          </p>
                        </div>
                      </div>
                      <p className="fs-5 text-dark fw-bold mb-0">
                        <span className="counter-value">{data.soldCount} </span>
                        <span className="fs-6 fw-light text-muted">
                          Sản phẩm
                        </span>
                      </p>
                    </a>
                  </div>
                );
              })}
              {/*end col*/}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Dashboard.Layout = Account;
