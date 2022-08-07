import { API } from "@/api-client/axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { CartDetailDTO, CartNotEnoughQuantity } from "@/services/type.dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const useCheckCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (cart: CartDetailDTO[]) => {
      return await checkQuantityBefore(cart);
    }
  );
};

export const checkQuantityBefore = async (cart: CartDetailDTO[]) => {
  const data = await API.put<CartNotEnoughQuantity[]>(
    `/cart/checkQuantity`,
    cart
  );
  return data.data;
};

export default useCheckCart;
