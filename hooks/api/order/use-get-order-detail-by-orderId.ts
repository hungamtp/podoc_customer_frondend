import { UpdateAccountDto, UpdatePasswordDto } from "@/services/account/dto";
import { updateAccount, updatePassword } from "@/services/account/index";
import { getOrderDetailByOrderId, payUnpaidOrder } from "@/services/order";
import { PayUnpaidOrderDto } from "@/services/order/dto";
import { useMutation, useQueryClient } from "react-query";

const useGetOrderDetailByOrderId = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (orderId: string) => {
      return await getOrderDetailByOrderId(orderId);
    },
    {
      onSuccess: (data: any) => {},
    }
  );
};

export default useGetOrderDetailByOrderId;
