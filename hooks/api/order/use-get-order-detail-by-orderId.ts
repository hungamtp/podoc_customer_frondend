import { UpdateAccountDto, UpdatePasswordDto } from "@/services/account/dto";
import { updateAccount, updatePassword } from "@/services/account/index";
import { getOrderDetailByOrderId, payUnpaidOrder } from "@/services/order";
import { PayUnpaidOrderDto } from "@/services/order/dto";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useGetOrderDetailByOrderId = (orderId?: string) => {
  const queryClient = useQueryClient();

  return useQuery(
    ["OrderDetail", orderId],
    async () => {
      return await getOrderDetailByOrderId(orderId || "");
    },
    { enabled: !!orderId }
  );
};

export default useGetOrderDetailByOrderId;
