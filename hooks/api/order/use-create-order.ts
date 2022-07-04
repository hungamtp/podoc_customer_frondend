import { addOrder } from "@/services/order";
import { ShippingInfo } from "@/services/order/dto";
import { useMutation, useQueryClient } from "react-query";

const useAddOrder = () => {
  const query = useQueryClient();
  return useMutation(
    ["updateShippingList"],
    async (data: { shippingInfo: ShippingInfo; paymentMethod: number }) => {
      return await addOrder(data.shippingInfo, data.paymentMethod);
    },
    {
      onSuccess: () => {
        query.invalidateQueries("allShippingInfo");
      },
    }
  );
};

export default useAddOrder;
