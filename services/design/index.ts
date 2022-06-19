import { API } from "@/api-client/axios";
import { ColorDto, DesignedProductDto, GetBlueprintDto } from "./dto";

export const getBluprintFromProduct = async (productId: number) => {
  const { data } = await API.get<GetBlueprintDto>(
    `/product/design/${productId}`
  );
  return data.data;
};

export const createDesignedProduct = async (
  productId: number,
  designedProduct: DesignedProductDto
) => {
  const { data } = await API.post<GetBlueprintDto>(
    `/design/${productId}`,
    designedProduct
  );
  return data.data;
};

export const getColorsByFactoryAndProductId = async (
  factoryId: number,
  productId: number
) => {
  const { data } = await API.get<ColorDto>(
    `/product/colors?productId=${productId}&factoryId=${factoryId}`
  );
  return data.data;
};
