import { API } from "@/api-client/axios";
import { BestSeller } from "@/services/type.dto";
import { useQuery } from "react-query";

export const useGetBestSellerByProductId = (productId: string) => {
  return useQuery(["BestSellerByProductId", "productId"], async () => {
    return await getBestSellerByProductId(productId);
  });
};

export const getBestSellerByProductId = async (productId: string) => {
  const { data } = await API.get<BestSeller>(
    `/design/4bestSeller/${productId}`
  );
  return data.data;
};
