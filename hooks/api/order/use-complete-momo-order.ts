import { useQuery } from "react-query";
import { API } from "@/api-client/axios";
const useCompleteOrder = (orderId : string) => {
  return useQuery(["Order"] ,async () => {
    return await completeMomoOrder(orderId);
  });
};

export const completeMomoOrder = async (orderId : string) => {
  const data = await API.get<any>(`/order/complete?orderId=${orderId}`);
  return data;
};

export default useCompleteOrder;
