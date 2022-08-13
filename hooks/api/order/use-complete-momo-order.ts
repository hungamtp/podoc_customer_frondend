import { useQuery } from "react-query";
import { API } from "@/api-client/axios";
const useCompleteOrder = (orderId : any, appTransId : any) => {
  return useQuery(["Order"] ,async () => {
    return await completeMomoOrder(orderId , appTransId);
  });
};

export const completeMomoOrder = async (orderId : any , appTransId : any) => {
  const data = await API.get<any>(`/order/complete?orderId=${orderId}&appTransId=${appTransId}`);
  return data;
};

export default useCompleteOrder;
