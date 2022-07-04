import { useQuery } from "react-query";
import { ProductHomePage, Best4DesignedProduct } from "@/services/type.dto";
import { API } from "@/api-client/axios";
import { data } from "jquery";

export const useGetHighestRateDesignById = (productid: string) => {
  return useQuery(["HighestRateDesign"], async () => {
    return await getHighestRateDesignById(productid);
  });
};

export const getHighestRateDesignById = async (productId: string) => {
  const query = new URLSearchParams({});
  const { data } = await API.get<Best4DesignedProduct>(
    `/design/4highestDRateDesignedProduct/${productId}`
  );
  return data.data;
};
