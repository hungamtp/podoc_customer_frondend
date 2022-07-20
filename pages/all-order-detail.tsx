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
                Size
              </th>
              <th scope="col" className="border-bottom">
                Màu
              </th>
              <th scope="col" className="border-bottom">
                Ngày
              </th>
              <th scope="col" className="border-bottom">
                Tổng giá(VND)
              </th>
              <th scope="col" className="border-bottom">
                Số lượng
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
                      className="border-secondary"
                      src={order.designImage}
                      width={100}
                      height={70}
                    />
                  </td>
                  <td>{order.size}</td>
                  <td>{order.color}</td>
                  <td>{order.date}</td>
                  <td>{numberWithCommas(order.price)}</td>
                  <td> {order.quantity}</td>
                  
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
