import { API } from "@/api-client/axios";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import {
  GetAllMyOrdersDto,
  GetAllOrderDetailDto,
  MyOrdersDto,
  OrderDetailDto,
  PayUnpaidOrderDto,
  PayUnpaidOrderResponse,
  ShippingInfo,
  ShippingInfoDto,
} from "./dto";

export interface Filter {
  pageSize: number;
  pageNumber: number;
  cancel?: boolean;
  paid?: boolean;
}

export const getAllShippingInfos = async () => {
  const { data } = await API.get<ShippingInfoDto>(`/order/shippinginfos`);
  return data.data;
};

export const addOrder = async (
  shippingInfo: ShippingInfo,
  paymentethod: number
) => {
  const { data } = await API.post<PaymentResponse>(
    `/order/${paymentethod}`,
    shippingInfo
  );
  return data;
};

export const getAllMyOrders = async (filter: Filter) => {
  const pageNumber = 0;
  const pageSize = 4;
  let search = filter.paid !== undefined ? `&isPaid=${filter.paid}` : "";
  if (filter.cancel !== undefined) search = search + `&cancel=${filter.cancel}`;
  const query = new URLSearchParams({
    page: filter?.pageNumber?.toString() || pageNumber.toString(),
    size: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllMyOrdersDto>(
    `/order/myorder?${query.toString()}${search}`
  );
  return data;
};

export const getAllOrderDetail = async (filter?: Filter) => {
  const pageNumber = 0;
  const pageSize = 10;
  const query = new URLSearchParams({
    page: filter?.pageNumber?.toString() || pageNumber.toString(),
    size: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllOrderDetailDto>(
    `/order/orderdetail?${query.toString()}`
  );
  return data;
};

export const getOrderDetailByOrderId = async (orderId: string) => {
  const data = await API.get<OrderDetailDto[]>(`/order/${orderId}`);
  return data.data;
};

export const payUnpaidOrder = async (requestData: PayUnpaidOrderDto) => {
  const { data } = await API.put<PayUnpaidOrderResponse>(
    `/order?paymentMethod=${requestData.paymentMethod}&orderId=${requestData.orderId}`
  );
  return data;
};
