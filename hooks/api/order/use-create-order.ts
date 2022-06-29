import { addOrder } from "@/services/order";
import { ShippingInfo } from "@/services/order/dto";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useAddOrder = () => {
  const query = useQueryClient();
  return useMutation(
    ["updateShippingList"],
    async (data: { cartId: number; shippingInfo: ShippingInfo }) => {
      return await addOrder(data.cartId, data.shippingInfo);
    },
    {
      onSuccess: () => {
        query.invalidateQueries("allShippingInfo");
      },
    }
  );
};

export default useAddOrder;
