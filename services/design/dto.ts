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
  description: string;
  colors: string[];
  imagePreviews: {
    image: string;
    position: string;
  }[];
  bluePrintDtos: Blueprint[];
}
export interface CreateDesignedProduct {
  designedPrice: number;
  description: string;
  name: string;
  colors: string[];
  imagePreviews: {
    image: string;
    position: string;
  }[];
  bluePrintDtos: Blueprint[];
  factoryId: string;
  productId: string;
}
export interface EditDesignedProduct {
  designedProductId: string;
  designedPrice: number;
  description: string;
  colors: string[];
  name: string;
  imagePreviews: {
    image: string;
    position: string;
  }[];
  bluePrintDtos: Blueprint[];
}

export interface ColorDto extends ISuccessHttpResponse {
  data: { id: string; name: string; image: string }[];
}
export interface SimpleDesignProduct {
  id: string;
  name: string;
  publish: boolean;
  soldCount: number;
  designedPrice: number;
  productOfDesignDeleted: boolean;
  factory?: string;
  user: {
    id: string;
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

export interface getAllSimpleDesignProductDto extends ISuccessHttpResponse {
  data: {
    content: SimpleDesignProduct[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
export interface getAllShownDesignProductDto extends ISuccessHttpResponse {
  data: {
    content: ShownDesignedProduct[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
export interface getAllDesignProductDto extends ISuccessHttpResponse {
  data: {
    data: ShownDesignedProduct[];
    page: number;
    elements: number;
  };
}
