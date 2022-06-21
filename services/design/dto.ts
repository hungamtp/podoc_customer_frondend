import {
  Blueprint,
  DesignedProduct,
  ShownDesignedProduct,
} from "@/models/design";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface GetBlueprintDto extends ISuccessHttpResponse {
  data: Blueprint[];
}
export interface DesignedProductDto extends ISuccessHttpResponse {
  designedPrice: number;
  imagePreviews: {
    image: string;
    position: string;
  }[];
  bluePrintDtos: Blueprint[];
  factoryId: number;
  productId: number;
}

export interface ColorDto extends ISuccessHttpResponse {
  data: { id: number; name: string; image: string }[];
}
export interface SimpleDesignProduct {
  id: number;
  name: string;
  publish: string;
  price: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    credentialImage: string;
  };
  imagePreviews: { image: string; position: string }[];
}

export interface getDesignProductDto extends ISuccessHttpResponse {
  data: DesignedProduct;
}
export interface getOthersDesignProductDto extends ISuccessHttpResponse {
  data: ShownDesignedProduct;
}

export interface getAllDesignProductDto extends ISuccessHttpResponse {
  data: {
    content: ShownDesignedProduct[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
export interface getAllSimpleDesignProductDto extends ISuccessHttpResponse {
  data: {
    content: SimpleDesignProduct[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
