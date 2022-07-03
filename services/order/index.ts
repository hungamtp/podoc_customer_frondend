import { API } from "@/api-client/axios";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { ShippingInfo, ShippingInfoDto } from "./dto";

export const getAllShippingInfos = async () => {
  const { data } = await API.get<ShippingInfoDto>(`/order/shippinginfos`);
  return data.data;
};

export const addOrder = async (shippingInfo: ShippingInfo) => {
  const { data } = await API.post<PaymentResponse>(`/order`, shippingInfo);
  return data;
};
