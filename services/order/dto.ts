import {
  Blueprint,
  DesignedProduct,
  ShownDesignedProduct,
} from "@/models/design";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
  shouldSave: boolean;
}

export interface ShippingInfoDto extends ISuccessHttpResponse {
  data: { name: string; email: string; address: string; phone: string }[];
}

export interface DesignedProductDto extends ISuccessHttpResponse {
  designedPrice: number;
  imagePreviews: {
    image: string;
    position: string;
  }[];
  bluePrintDtos: Blueprint[];
  factoryId: string;
  productId: string;
}

export interface GetAllMyOrdersDto {
  data: MyOrdersDto[];
  page: number;
  element: number;
}
export interface GetAllOrderDetailDto {
  data: OrderDetailDto[];
  page: number;
  element: number;
}

export interface OrderDetailDto {
  id: string;
  price: number;
  designId: string;
  designName: boolean;
  designImage: string;
  designerName: string;
  designerId: string;
  color: string;
  size: string;
  quantity: string;
  date : string;
}

export interface MyOrdersDto {
  orderId: string;
  totalBill: number;
  createdDate: string;
  isPaid: boolean;
  countItem: number;
}

export interface PayUnpaidOrderDto {
  paymentMethod: number;
  orderId: string;
}

export interface PayUnpaidOrderResponse extends EventTarget {
  data: {
    payUrl: string;
  };
}
