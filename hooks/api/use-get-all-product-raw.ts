import { useQuery } from "react-query";
import { PageDTO } from "@/services/type.dto";
import { API } from "@/api-client/axios";
import { data } from "jquery";

const useRawProduct = (filter: RawProductFilter) => {
  return useQuery(["RawProduct", filter], async () => {
    return await getAllRawProduct(filter);
  });
};

export interface RawProductFilter {
  pageSize: number;
  pageNumber: number;
  name?: string;
  category?: string;
  sort?: string;
}

export const getAllRawProduct = async (filter: RawProductFilter) => {
  const pageNumber = 0;
  const pageSize = 9;
  const sort = "";
  let search = filter.name ? `name:${filter.name},` : "";
  if (filter.category) search = search + `category:${filter.category}`;

  const query = new URLSearchParams({
    pageNumber: filter.pageNumber?.toString() || pageNumber.toString(),
    pageSize: filter.pageSize?.toString() || pageSize.toString(),
    search: search,
    sort: filter.sort || sort,
  });
  const { data } = await API.get<PageDTO>(`/product?${query.toString()}`);
  return data.data;
};

export default useRawProduct;
