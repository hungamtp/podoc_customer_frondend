/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import useMyOrders from "@/hooks/api/order/use-my-orders";
import { Filter } from "@/services/order";
import {
  GetAllMyOrdersDto,
  OrderDetailDto,
  PayUnpaidOrderDto,
} from "@/services/order/dto";
import Link from "next/link";
import React, { useState } from "react";
import { numberWithCommas } from "helper/number-util";
import usePayUnpaidOrder from "@/hooks/api/order/use-pay-unpaid-order";
import useGetOrderDetailByOrderId from "@/hooks/api/order/use-get-order-detail-by-orderId";
import Image from "next/image";
import useDeleteCartDetail from "@/hooks/api/cart/use-delete-cartdetail";
import useDeleteOrder from "@/hooks/api/order/use-delete-order";

type Props = {
  myOrdersResponse: GetAllMyOrdersDto;
  isLoading: boolean;
};

export default function MyOrders({ myOrdersResponse, isLoading }: Props) {
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
      {myOrdersResponse.data.length != 0 ? (
        <div>
          {isShowOrderDetail ? (
            <>
              {orderDetailData && selectedOrderId && (
                <div>
                  <div className="table bg-white shadow rounded">
                    <table className="table mb-0 table-center table-nowrap">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                            style={{
                              minWidth: "100px",
                              width: "150px",
                            }}
                          >
                            Hình ảnh
                          </th>
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                          >
                            Thiết kế
                          </th>
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                          >
                            Thông tin
                          </th>
                          <th
                            scope="col"
                            className="border-bottom align-middle"
                            style={{ minWidth: "40px" }}
                          >
                            Tổng giá(VND)
                          </th>
                          <th
                            scope="col"
                            className="border-bottom"
                            style={{ minWidth: "40px", width: "80px" }}
                          >
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setIsShowOrderDetail(false);
                              }}
                            >
                              Trở về
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading &&
                          orderDetailData.map((order) => (
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
                                    listStyleType: "none",
                                    padding: "0",
                                  }}
                                >
                                  <li className="d-flex">
                                    <div style={{ fontWeight: "normal" }}>
                                      Tên :{" "}
                                    </div>
                                    <div>{order.designName}</div>
                                  </li>
                                  <li className="d-flex">
                                    <div style={{ fontWeight: "normal" }}>
                                      Nhà in :{" "}
                                    </div>
                                    <div>{order.provider}</div>
                                  </li>
                                </ul>
                              </th>
                              <td className="align-middle">
                                <div>Size : {order.size}</div>
                                <div>Màu : {order.color}</div>
                                <div>Số lượng : {order.quantity}</div>
                              </td>
                              <td className="align-middle">
                                {numberWithCommas(order.price)}
                              </td>
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

                        <div
                          className="dropdown-menu dd-menu dropdown-menu-end rounded border"
                          style={{ width: "120px" }}
                        >
                          <div
                            onClick={() => handleSubmit(0, selectedOrderId)}
                            className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                          >
                            <img
                              className="me-1 rounded"
                              src="asset/images/momologo.svg"
                              width="25"
                              alt="momo"
                            />
                            MOMO
                          </div>
                          <div
                            onClick={() => handleSubmit(1, selectedOrderId)}
                            className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                          >
                            <img
                              className="me-1 rounded"
                              src="asset/images/zalopay.png"
                              width="25"
                              alt="momo"
                            />
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
                      Ngày tạo
                    </th>
                    <th scope="col" className="border-bottom">
                      Tổng giá (VND)
                    </th>
                    <th scope="col" className="border-bottom">
                      Số lượng
                    </th>
                    <th scope="col" className="border-bottom">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    myOrdersResponse &&
                    myOrdersResponse.data.map((orders) => (
                      <tr key={orders.orderId}>
                        <td>{`${new Date(orders.createdDate).getDate()}-${
                          new Date(orders.createdDate).getMonth() + 1
                        }-${new Date(orders.createdDate).getFullYear()}`}</td>
                        <td>{numberWithCommas(orders.totalBill)} </td>
                        <td>
                          {" "}
                          {orders.countItem} {"sản phẩm"}
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn"
                              onClick={() => {
                                getOrderDetail(orders.orderId, {
                                  onSuccess: (data) => {
                                    setOrderDetailData(data);
                                    setIsShowOrderDetail(true);
                                    setSelectedOrderId(orders.orderId);
                                  },
                                });
                              }}
                            >
                              <i className="bi bi-eye text-primary h5"></i>
                            </button>
                            <div className="dropdown">
                              <button
                                type="button"
                                className="btn dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bi bi-credit-card text-success h5"></i>
                              </button>

                              <div
                                className="dropdown-menu dd-menu dropdown-menu-end rounded border"
                                style={{ width: "120px" }}
                              >
                                <div
                                  onClick={() =>
                                    handleSubmit(0, orders.orderId)
                                  }
                                  className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                                >
                                  <img
                                    className="me-1 rounded"
                                    src="asset/images/momologo.svg"
                                    width="25"
                                    alt="momo"
                                  />
                                  MOMO
                                </div>
                                <div
                                  onClick={() =>
                                    handleSubmit(1, orders.orderId)
                                  }
                                  className="d-flex align-items-center mt-1 cursor-pointer ps-2"
                                >
                                  <img
                                    className="me-1 rounded"
                                    src="asset/images/zalopay.png"
                                    width="25"
                                    alt="momo"
                                  />
                                  Zalo
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn"
                              onClick={() => deleteOrder(orders.orderId)}
                            >
                              <i className="bi bi-x-square text-danger h5"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <h4 style={{ display: "flex", justifyContent: "space-around" }}>
          Chưa có đơn đặt hàng
        </h4>
      )}
    </>
  );
}
MyOrders.Layout = MainLayout;
