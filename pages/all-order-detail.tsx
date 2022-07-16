/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useAllOrderDetail from "@/hooks/api/order/use-all-order-detail";
import { GetAllOrderDetailDto } from "@/services/order/dto";
import { numberWithCommas } from "helper/number-util";
import * as React from "react";

export interface IAllOrderDetailProps {
  allOrdersResponse: GetAllOrderDetailDto;
  isLoading: boolean;
}

export default function AllOrderDetail(props: IAllOrderDetailProps) {
  const { allOrdersResponse, isLoading } = props;
  console.log(allOrdersResponse);
  return (
    <>
      <div className="table-responsive bg-white shadow rounded">
        <table className="table mb-0 table-center table-nowrap">
          <thead>
            <tr>
              <th scope="col" className="border-bottom">
                Tên thiết kế
              </th>
              <th scope="col" className="border-bottom">
                Hình ảnh
              </th>
              <th scope="col" className="border-bottom">
                Tổng giá
              </th>
              <th scope="col" className="border-bottom">
                Số lượng
              </th>
              <th scope="col" className="border-bottom">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              allOrdersResponse &&
              allOrdersResponse.data.map((order) => (
                <tr key={order.id}>
                  <th scope="row">{order.designName}</th>
                  <td>
                    <img
                      className="border border-secondary"
                      src={order.designImage}
                      width={100}
                      height={70}
                    />
                  </td>
                  <td>{numberWithCommas(order.price)} VND</td>
                  <td> {order.quantity} sản phấm</td>
                  <td className="text-success">đã thanh toán</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
