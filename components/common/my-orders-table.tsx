/* eslint-disable @next/next/no-img-element */
import { Account, MainLayout } from "@/components/layouts";
import useDeleteOrder from "@/hooks/api/order/use-delete-order";
import useGetOrderDetailByOrderId from "@/hooks/api/order/use-get-order-detail-by-orderId";
import usePayUnpaidOrder from "@/hooks/api/order/use-pay-unpaid-order";
import { Filter } from "@/services/order";
import {
  GetAllMyOrdersDto,
  MyOrdersDto,
  OrderDetailDto,
} from "@/services/order/dto";
import { nanoid } from "@reduxjs/toolkit";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useEffect, useState } from "react";
import PaginationComponent from "./mui-pagination";

type Props = {
  myOrdersResponse: GetAllMyOrdersDto;
  isLoading: boolean;
  setFilter: (filter: Filter) => void;
  filter: Filter;
};

export default function MyOrdersTable({
  myOrdersResponse,
  isLoading,
  filter,
  setFilter,
}: Props) {
  const { mutate: payOrder } = usePayUnpaidOrder();
  const { mutate: getOrderDetail } = useGetOrderDetailByOrderId();
  const { mutate: deleteOrder } = useDeleteOrder();
  const [isShowOrderDetail, setIsShowOrderDetail] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState<OrderDetailDto[]>();
  const [selectedOrderId, setSelectedOrderId] = useState<string>();

  const handleSubmit = (paymentMethod: number, orderId: string) => {
    const tmpData = {
      paymentMethod: paymentMethod,
      orderId: orderId,
    };
    payOrder(tmpData);
  };
  return (
    <>
      {myOrdersResponse && myOrdersResponse.data.length != 0 ? (
        <div>
          {isShowOrderDetail ? (
            <>
              {orderDetailData && selectedOrderId && (
                <div>
                  <button
                    className="btn btn-secondary mb-4"
                    onClick={() => {
                      setIsShowOrderDetail(false);
                    }}
                  >
                    Trở về
                  </button>
                  <div className="table bg-white shadow rounded">
                    <table className="table mb-0 table-center table-nowrap">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                            style={{
                              minWidth: '100px',
                              width: '150px',
                            }}
                          >
                            Hình ảnh
                          </th>
                          <th scope="col" className="border-bottom align-middle">
                            Thiết kế
                          </th>
                          <th scope="col" className="border-bottom align-middle">
                            Thông tin
                          </th>
                          <th scope="col" className="border-bottom align-middle" style={{ minWidth: '40px', width: '180px' }}>
                            Tổng giá(VND)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading &&
                          orderDetailData.map(order => (
                            <tr key={order.id}>
                              <td>
                                <Image
                                  src={order.designImage}
                                  className="border-secondary"
                                  width={2000}
                                  height={2000}
                                  objectFit="cover"
                                  alt="productImage"
                                />
                              </td>
                              <th className="align-middle">
                                <ul
                                  style={{
                                    listStyleType: 'none',
                                    padding: '0',
                                  }}
                                >
                                  <li className="d-flex">
                                    <div style={{ fontWeight: 'normal' }}>Tên : </div>
                                    <div>{order.designName}</div>
                                  </li>
                                  <li className="d-flex">
                                    <div style={{ fontWeight: 'normal' }}>Nhà in : </div>
                                    <div>{order.provider}</div>
                                  </li>
                                </ul>
                              </th>
                              <td className="align-middle">
                                <div>Size : {order.size}</div>
                                <div>Màu : {order.color}</div>
                                <div>Số lượng : {order.quantity}</div>
                              </td>
                              <td className="align-middle">{numberWithCommas(order.price)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="d-flex w-25">
                      <button
                        className="btn btn-danger w-50 me-5"
                        onClick={() => {
                          deleteOrder(selectedOrderId, {
                            onSuccess: () => {
                              setIsShowOrderDetail(false);
                            },
                          });
                        }}
                      >
                        Hủy đơn
                      </button>
                      <div className="dropdown w-50">
                        <button
                          type="button"
                          className="btn dropdown-toggle btn-success"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Thanh toán
                        </button>

                        <div className="dropdown-menu dd-menu dropdown-menu-end rounded border" style={{ width: '120px' }}>
                          <div
                            onClick={() => handleSubmit(0, selectedOrderId)}
                            className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                          >
                            <img className="me-1 rounded" src="asset/images/momologo.svg" width="25" alt="momo" />
                            MOMO
                          </div>
                          <div
                            onClick={() => handleSubmit(1, selectedOrderId)}
                            className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                          >
                            <img className="me-1 rounded" src="asset/images/zalopay.png" width="25" alt="momo" />
                            Zalo
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="table bg-white shadow rounded">
              <table className="table mb-0 table-center table-nowrap">
                <thead>
                  <tr>
                    <th scope="col" className="border-bottom">
                      Thông tin
                    </th>
                    <th scope="col" className="border-bottom">
                      Ngày tạo
                    </th>
                    <th scope="col" className="border-bottom">
                      Tổng giá (VND)
                    </th>
                    <th scope="col" className="border-bottom">
                      Số lượng
                    </th>
                    <th scope="col" className="border-bottom" style={{ width: '100px' }}>
                      Hành động
                    </th>
                    <th scope="col" className="border-bottom" style={{ width: '80px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    myOrdersResponse &&
                    myOrdersResponse.data.map((orders) => (
                      <tr
                        key={orders.orderId}
                        data-toggle="tooltip"
                        data-placement="top"
                      >
                        <td className="align-middle">
                          <div>
                            {orders.orderDetailDtos
                              .filter((orderDetail, index) => index <= 1)
                              .map((orderDetail, insideIndex, newList) => {
                                if (
                                  newList.length <
                                    orders.orderDetailDtos.length &&
                                  insideIndex === newList.length - 1
                                )
                                  return (
                                    <>
                                      <div className="mt-2">{`${orderDetail.designName} (${orderDetail.color} - ${orderDetail.size} x ${orderDetail.quantity})`}</div>
                                      <div
                                        className="mt-2 ms-5 text-secondary btn btn-link text-secondary"
                                        onClick={() => {
                                          getOrderDetail(orders.orderId, {
                                            onSuccess: (data) => {
                                              setOrderDetailData(data);
                                              setIsShowOrderDetail(true);
                                              setSelectedOrderId(
                                                orders.orderId
                                              );
                                            },
                                          });
                                        }}
                                      >
                                        xem thêm...{" "}
                                      </div>
                                    </>
                                  );
                                else {
                                  return (
                                    <>
                                      <div className="mt-2">{`${orderDetail.designName} (${orderDetail.color} - ${orderDetail.size} x ${orderDetail.quantity})`}</div>
                                    </>
                                  );
                                }
                              })}
                          </div>
                        </td>
                        <td className="align-middle">{`${new Date(orders.createdDate).getDate()}-${
                          new Date(orders.createdDate).getMonth() + 1
                        }-${new Date(orders.createdDate).getFullYear()}`}</td>
                        <td className="align-middle">{numberWithCommas(orders.totalBill)} </td>
                        <td className="align-middle">
                          {' '}
                          {orders.countItem} {'sản phẩm'}
                        </td>
                        <td className="align-middle">
                          <div className="dropdown ">
                            <button
                              type="button"
                              className="btn dropdown-toggle d-flex align-items-center m-0 hoverButton"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="bi bi-credit-card text-success me-2"></i>
                              <p className="m-0">Thanh toán</p>
                            </button>

                            <div className="dropdown-menu dd-menu dropdown-menu-end rounded border">
                              <div
                                onClick={() => handleSubmit(0, orders.orderId)}
                                className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                              >
                                <img className="me-1 rounded" src="asset/images/momologo.svg" width="25" alt="momo" />
                                MOMO
                              </div>
                              <div
                                onClick={() => handleSubmit(1, orders.orderId)}
                                className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                              >
                                <img className="me-1 rounded" src="asset/images/zalopay.png" width="25" alt="momo" />
                                Zalo
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn d-flex align-items-center m-0 hoverButton text-dark"
                            onClick={() => deleteOrder(orders.orderId)}
                          >
                            <i className="bi bi-x-square text-danger me-2"></i>
                            <p className="m-0">Hủy đơn</p>
                          </button>
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn btn-link"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Xem chi tiết đơn hàng"
                            onClick={() => {
                              getOrderDetail(orders.orderId, {
                                onSuccess: data => {
                                  setOrderDetailData(data);
                                  setIsShowOrderDetail(true);
                                  setSelectedOrderId(orders.orderId);
                                },
                              });
                            }}
                          >
                            <p className="m-0">Chi tiết</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="row">
            {Math.ceil(myOrdersResponse.elements / filter.pageSize) <= 1 ||
            isShowOrderDetail ? (
              <></>
            ) : (
              <div className="d-flex justify-content-center">
                <PaginationComponent
                  total={Math.ceil(myOrdersResponse.elements / filter.pageSize)}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <h4 style={{ display: 'flex', justifyContent: 'space-around' }}>Chưa có đơn đặt hàng</h4>
      )}
    </>
  );
}
