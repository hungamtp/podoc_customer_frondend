/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/components/layouts";
import useMyOrders from "@/hooks/api/order/use-my-orders";
import { Filter } from "@/services/order";
import { GetAllMyOrdersDto, PayUnpaidOrderDto } from "@/services/order/dto";
import Link from "next/link";
import React, { useState } from "react";
import { numberWithCommas } from "helper/number-util";
import usePayUnpaidOrder from "@/hooks/api/order/use-pay-unpaid-order";

type Props = {
  myOrdersResponse: GetAllMyOrdersDto;
  isLoading: boolean;
};

export default function MyOrders({ myOrdersResponse, isLoading }: Props) {
  const { mutate: payOrder } = usePayUnpaidOrder();

  const handleSubmit = (paymentMethod: number, orderId: string) => {
    const tmpData = {
      paymentMethod: paymentMethod,
      orderId: orderId,
    };
    payOrder(tmpData);
  };
  return (
    <>
    {myOrdersResponse.data.length != 0 ?
      <div className="table-responsive bg-white shadow rounded">
        <table className="table mb-0 table-center table-nowrap">
          <thead>
            <tr>
              <th scope="col" className="border-bottom">
                Ngày tạo
              </th>
              <th scope="col" className="border-bottom">
                Trạng thái
              </th>
              <th scope="col" className="border-bottom">
                Tổng giá
              </th>
              <th scope="col" className="border-bottom">
                Số lượng
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              myOrdersResponse &&
              myOrdersResponse.data.map((orders) => (
                <tr key={orders.orderId}>
                  <td>{orders.createdDate}</td>
                  <td className="text-danger">
                    {orders.isPaid === false && "chưa thanh toán"}
                  </td>
                  <td>{numberWithCommas(orders.totalBill)} VND</td>
                  <td>
                    {" "}
                    {orders.countItem} {"sản phẩm"}
                  </td>
                  <td>
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-primary  dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Thanh Toán
                      </button>

                      <div
                        className="dropdown-menu dd-menu dropdown-menu-end bg-light shadow rounded border border-primary p-3"
                        style={{ width: "120px" }}
                      >
                        <div
                          onClick={() => handleSubmit(0, orders.orderId)}
                          className="d-flex align-items-center mt-1 cursor-pointer"
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
                          className="d-flex align-items-center mt-1 cursor-pointer"
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
       :<h4 style={{display :"flex"  , justifyContent :"space-around"}}>Chưa có đơn đặt hàng</h4>}
    </>
  );
}
MyOrders.Layout = MainLayout;
