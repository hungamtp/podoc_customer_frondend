import { API } from "@/api-client/axios";
import {
  ColorDto,
  DesignedProductDto,
  getAllDesignProductDto,
  GetBlueprintDto,
  getDesignProductDto,
} from "./dto";

export interface Filter {
  pageSize: number;
  pageNumber: number;
  sort?: string;
  search?: string;
}
export interface GetAllDesignFilter {
  pageSize: number;
  pageNumber: number;
  name?: string;
  category?: string;
  sort?: string;
}

export const getBluprintFromProduct = async (productId: number) => {
  const { data } = await API.get<GetBlueprintDto>(
    `/product/design/${productId}`
  );
  return data.data;
};

export const createDesignedProduct = async (
  designedProduct: DesignedProductDto,
  factoryId: number,
  productId: number
) => {
  const { data } = await API.post<GetBlueprintDto>(
    `/design?productId=${productId}&factoryId=${factoryId}`,
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

export const getDesignById = async (designId: number) => {
  const { data } = await API.get<getDesignProductDto>(`/design`);
  return data.data;
};

export const getAllDesignedProducts = async (filter: GetAllDesignFilter) => {
  const pageNumber = 0;
  const pageSize = 9;
  let search = filter.name ? `name:${filter.name},` : "";
  if (filter.category) search = search + `category:${filter.category}`;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<getAllDesignProductDto>(
    `/design?${query.toString()}`
  );
  return data.data;
};
