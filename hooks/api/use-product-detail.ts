import { useQuery } from "react-query";
import { PageDTO, ProductDetailDTO } from "@/services/type.dto";
import { API } from "@/api-client/axios";

const useProductDetail = (id: string) => {
  return useQuery(["Category", id], async () => {
    return await getProductDetail(id);
  });
};

export const getProductDetail = async (id: string) => {
  const { data } = await API.get<{
    data: ProductDetailDTO;
  }>(`/product/${id}`);
  return data.data;
};

export default useProductDetail;
