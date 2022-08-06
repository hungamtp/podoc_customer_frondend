/* eslint-disable @next/next/no-img-element */
import { Account, MainLayout } from "@/components/layouts";
import useDeleteOrder from "@/hooks/api/order/use-delete-order";
import useGetOrderDetailByOrderId from "@/hooks/api/order/use-get-order-detail-by-orderId";
import usePayUnpaidOrder from "@/hooks/api/order/use-pay-unpaid-order";
import {
  GetAllMyOrdersDto,
  MyOrdersDto,
  OrderDetailDto,
} from "@/services/order/dto";
import { numberWithCommas } from "helper/number-util";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  myOrdersResponse: GetAllMyOrdersDto;
  isLoading: boolean;
};

export default function MyOrdersTable({ myOrdersResponse, isLoading }: Props) {
  useEffect(() => {
    const orderList = [...myOrdersResponse.data];
    if (orderList.length > 0) {
      orderList.forEach((order) => {
        const orderDetailDtos = order.orderDetailDtos;
        if (orderDetailDtos.length > 1) {
          let newLength = 1;
          let i: number;
          let j: number;
          let count = 0;
          for (i = 1; i < orderDetailDtos.length; i++) {
            for (j = 0; j < newLength; j++) {
              if (
                orderDetailDtos[i].designName ===
                  orderDetailDtos[j].designName &&
                orderDetailDtos[i].provider === orderDetailDtos[j].provider
              ) {
                orderDetailDtos[j].quantity =
                  orderDetailDtos[j].quantity + orderDetailDtos[i].quantity;
                count++;
                break;
              }
            }
            if (newLength === j) {
              orderDetailDtos[newLength++] = orderDetailDtos[i];
            }
          }
          if (count === orderDetailDtos.length - 1) {
            order.orderDetailDtos = [orderDetailDtos[0]];
          } else {
            order.orderDetailDtos = orderDetailDtos.slice(0, newLength);
          }
        }
      });
      setRenderOrderData(orderList);
    }
  }, [myOrdersResponse]);

  const { mutate: payOrder } = usePayUnpaidOrder();
  const [renderOrderData, setRenderOrderData] = useState<MyOrdersDto[]>();
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
      {renderOrderData && renderOrderData.length != 0 ? (
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
                            style={{ minWidth: "40px", width: "180px" }}
                          >
                            Tổng giá(VND)
                          </th>
                          <th
                            scope="col"
                            className="border-bottom"
                            style={{ minWidth: "40px", width: "40px" }}
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
                    <th
                      scope="col"
                      className="border-bottom"
                      style={{ width: "100px" }}
                    >
                      Hành động
                    </th>
                    <th
                      scope="col"
                      className="border-bottom"
                      style={{ width: "80px" }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    myOrdersResponse &&
                    renderOrderData.map((orders) => (
                      <tr
                        key={orders.orderId}
                        data-toggle="tooltip"
                        data-placement="top"
                      >
                        <td className="align-middle">
                          <div>
                            {orders.orderDetailDtos.map((orderDetail) => (
                              <>
                                <div>{orderDetail.designName}</div>
                                <div>
                                  <p>Số lượng: {`${orderDetail.quantity}`}</p>
                                </div>
                              </>
                            ))}
                          </div>
                        </td>
                        <td className="align-middle">{`${new Date(
                          orders.createdDate
                        ).getDate()}-${
                          new Date(orders.createdDate).getMonth() + 1
                        }-${new Date(orders.createdDate).getFullYear()}`}</td>
                        <td className="align-middle">
                          {numberWithCommas(orders.totalBill)}{" "}
                        </td>
                        <td className="align-middle">
                          {" "}
                          {orders.countItem} {"sản phẩm"}
                        </td>
                        <td className="align-middle">
                          <div className="dropdown ">
                            <button
                              type="button"
                              className="btn dropdown-toggle d-flex align-items-center m-0"
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
                                <img
                                  className="me-1 rounded"
                                  src="asset/images/momologo.svg"
                                  width="25"
                                  alt="momo"
                                />
                                MOMO
                              </div>
                              <div
                                onClick={() => handleSubmit(1, orders.orderId)}
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
                            className="btn d-flex align-items-center m-0"
                            onClick={() => deleteOrder(orders.orderId)}
                          >
                            <i className="bi bi-x-square text-danger me-2"></i>
                            <p className="m-0">Hủy đơn</p>
                          </button>
                        </td>
                        <td className="align-middle">
                          <button
                            className="btn hoverButton"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Xem chi tiết đơn hàng"
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
                            <i className="bi bi-eye text-primary h5 "></i>
                          </button>
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
