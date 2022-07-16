import { API } from "@/api-client/axios";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
<<<<<<< HEAD
import { GetAllMyOrdersDto, GetAllOrderDetailDto, PayUnpaidOrderDto, PayUnpaidOrderResponse, ShippingInfo, ShippingInfoDto } from "./dto";
=======
import { GetAllMyOrdersDto, PayUnpaidOrderDto, PayUnpaidOrderResponse, ShippingInfo, ShippingInfoDto } from "./dto";
>>>>>>> 5dd2249 (update my orders)

export interface Filter {
  pageSize: number;
  pageNumber: number;
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

export const getAllMyOrders = async (filter?: Filter) => {
  const pageNumber = 0;
  const pageSize = 10;
  const query = new URLSearchParams({
    page: filter?.pageNumber?.toString() || pageNumber.toString(),
    size: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<GetAllMyOrdersDto>(
    `/order/myorder?${query.toString()}`
  );
  return data;
};
<<<<<<< HEAD
export const getAllOrderDetail = async (filter?: Filter) => {
  const pageNumber = 1;
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
=======
>>>>>>> 5dd2249 (update my orders)

export const payUnpaidOrder = async (requestData: PayUnpaidOrderDto) => {
  const { data } = await API.put<PayUnpaidOrderResponse>(
    `/order?paymentMethod=${requestData.paymentMethod}&orderId=${requestData.orderId}`,
  );
  return data;
};