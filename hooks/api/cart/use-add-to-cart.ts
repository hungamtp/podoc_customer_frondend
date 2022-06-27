import { useMutation } from "react-query";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { AddToCartDTO, AddToCartResponseDTO } from "@/services/type.dto";
import { API } from "@/api-client/axios";
const useAddToCart = () => {
  const dispatch = useAppDispatch();
  return useMutation(async (data: AddToCartDTO) => {
    return await addToCart(data);
  });
};

export const addToCart = async (requestData: AddToCartDTO) => {
  const { data } = await API.put<AddToCartResponseDTO>(
    "/cart/addToCart",
    requestData
  );
  return data.data;
};

export default useAddToCart;
