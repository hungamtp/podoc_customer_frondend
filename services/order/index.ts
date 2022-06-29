import { API } from "@/api-client/axios";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { ShippingInfo, ShippingInfoDto } from "./dto";

export const getAllShippingInfos = async () => {
  const { data } = await API.get<ShippingInfoDto>(`/order/shippinginfos`);
  return data.data;
};

export const addOrder = async (cartId: number, shippingInfo: ShippingInfo) => {
  const { data } = await API.post<ISuccessHttpResponse>(
    `/order?cartId=${cartId}`,
    shippingInfo
  );
  return data.data;
};
