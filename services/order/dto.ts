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
