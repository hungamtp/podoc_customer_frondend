import { API } from "@/api-client/axios";
import { BestSeller } from "@/services/type.dto";
import { useQuery } from "react-query";

export const useGetBestSeller = () => {
  return useQuery(["BestSeller"], async () => {
    return await getBestSeller();
  });
};

export const getBestSeller = async () => {
  const { data } = await API.get<BestSeller>(`/design/4bestSeller`);
  return data.data;
};
