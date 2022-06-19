import {
  Blueprint,
  DesignedProduct,
  ShownDesignedProduct,
} from "@/models/design";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetBlueprintDto extends ISuccessHttpResponse {
  data: Blueprint[];
}
export interface DesignedProductDto {
  designedPrice: number;
  imagePreviews: {
    image: string;
    position: string;
  }[];
  bluePrintDtos: Blueprint[];
  factoryId: number;
  productId: number;
}

export interface ColorDto {
  data: { id: number; name: string; image: string }[];
}

export interface getDesignProductDto {
  data: DesignedProduct;
}

export interface getAllDesignProductDto {
  data: {
    content: ShownDesignedProduct[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
