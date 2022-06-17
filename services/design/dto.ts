import { Blueprint } from "@/models/design";
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
}
