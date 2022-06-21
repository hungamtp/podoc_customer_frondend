import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook"; 
import {deleteCartDetail } from "@/redux/slices/cart";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { CartDetailDTO, CartNotEnoughQuantity } from "@/services/type.dto";
import { API } from "@/api-client/axios";
import { useRouter } from "next/router";

const useCheckCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (cart: CartDetailDTO[]) => { 
      return await checkQuantityBefore(cart);
    },
    {
      onSuccess: (data) => {
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
         
      },
    }
  );
};

export const checkQuantityBefore = async (cart: CartDetailDTO[]) => {
    const data = await API.put<CartNotEnoughQuantity[]>(`/cart/checkQuantity` , cart);
    return data.data;
};

export default useCheckCart;
