import { API } from "@/api-client/axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { CartDetailDTO, UpdateCartResponseDTO } from "@/services/type.dto";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
let cartDetailId: number;
const useUpdateCart = () => {
  const dispatch = useAppDispatch();
  return useMutation(
    async (cart: CartDetailDTO[]) => {
      return await updateCart(cart);
    },
    {
      onSuccess: (data) => {},
      onError: (error: AxiosError<ErrorHttpResponse>) => {},
    }
  );
};

export const updateCart = async (cart: CartDetailDTO[]) => {
  const data = await API.put<UpdateCartResponseDTO>(`/cart`, cart);
  return data;
};

export default useUpdateCart;
