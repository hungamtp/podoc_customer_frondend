import { API } from "@/api-client/axios";
import { addOrder } from "@/services/order";
import { ShippingInfo } from "@/services/order/dto";
import { useMutation, useQueryClient } from "react-query";

const useDeleteOrder = () => {
  const query = useQueryClient();
  return useMutation(
    ["DeleteOrder"],
    async (orderId: string) => {
      return await deleteOrder(orderId);
    },
    {
      onSuccess: () => {
        query.invalidateQueries("MyOrders");
      },
    }
  );
};

export default useDeleteOrder;

export const deleteOrder = async (orderId: string) => {
  const data = await API.delete<any>(`/order?orderId=${orderId}`);
  return data;
};
