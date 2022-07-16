import { API } from "@/api-client/axios";
import { ShownDesignedProduct } from "@/models/design";
import {
  ColorDto,
  CreateDesignedProduct,
  DesignedProductDto,
  EditDesignedProduct,
  getAllDesignProductDto,
  getAllSimpleDesignProductDto,
  GetBlueprintDto,
  getDesignProductDto,
  getOthersDesignProductDto,
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

export const getBluprintFromProduct = async (productId: string) => {
  const { data } = await API.get<GetBlueprintDto>(
    `/product/design/${productId}`
  );
  return data.data;
};

export const getBluprintFromDesign = async (designId: string) => {
  const { data } = await API.get<GetBlueprintDto>(
    `/product/design/${designId}`
  );
  return data.data;
};

export const createDesignedProduct = async (
  designedProduct: CreateDesignedProduct,
  factoryId: string,
  productId: string
) => {
  const { data } = await API.post<DesignedProductDto>(
    `/design?productId=${productId}&factoryId=${factoryId}`,
    designedProduct
  );
  return data.data;
};

export const editDesignedProduct = async (
  designedProduct: EditDesignedProduct,
  designProductId: string
) => {
  const { data } = await API.post<DesignedProductDto>(
    `design/edit/${designProductId}`,
    designedProduct
  );
  return data.data;
};

export const getColorsByFactoryAndProductId = async (
  factoryId: string,
  productId: string
) => {
  const { data } = await API.get<ColorDto>(
    `/product/colors?productId=${productId}&factoryId=${factoryId}`
  );
  return data.data;
};

export const getDesignById = async (designId: string) => {
  const { data } = await API.get<getDesignProductDto>(`/design/${designId}`);
  return data.data;
};

export const getOthersDesignById = async (designId: string) => {
  const { data } = await API.get<getOthersDesignProductDto>(
    `/design/details/${designId}`
  );
  return data.data;
};

export const getAllDesignedProducts = async (filter: GetAllDesignFilter) => {
  console.log(filter, "filter ne");
  const pageNumber = 0;
  const pageSize = 9;
  let search = filter.name ? `search=name:${filter.name},` : "search=";
  if (filter.category) search = search + `category:${filter.category}`;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const submitQuery = search
    ? `${query.toString()}&${search}`
    : query.toString();
  const { data } = await API.get<getAllDesignProductDto>(
    `/design?${submitQuery}`
  );
  return data.data;
};
export const getAllMyDesign = async (filter: GetAllDesignFilter) => {
  const pageNumber = 0;
  const pageSize = 9;
  let search = filter.name ? `name:${filter.name},` : "";
  if (filter.category) search = search + `category:${filter.category}`;
  const query = new URLSearchParams({
    pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter?.pageSize?.toString() || pageSize.toString(),
  });
  const { data } = await API.get<getAllSimpleDesignProductDto>(
    `/design/mydesign?${query.toString()}`
  );
  return data.data;
};

export const pulishUnpublishDesign = async (publish: boolean, id: string) => {
  if (publish) {
    return await API.put(`/design/publish/${id}`);
  } else {
    return await API.put(`/design/unpublish/${id}`);
  }
};

// export const getAllMyDesign = async (
//   filter: GetAllDesignFilter
// ) => {
//   const pageNumber = 0;
//   const pageSize = 9;
//   let search = filter.name ? `name:${filter.name},` : "";
//   if (filter.category) search = search + `category:${filter.category}`;
//   const query = new URLSearchParams({
//     pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
//     pageSize: filter?.pageSize?.toString() || pageSize.toString(),
//   });
//   const { data } = await API.get<getAllSimpleDesignProductDto>(
//     `/design/view?${query.toString()}`
//   );
//   return data.data;
// };
