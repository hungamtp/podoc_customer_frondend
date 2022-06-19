import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook"; 
import {deleteCartDetail } from "@/redux/slices/cart";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { ResponseDTO } from "@/services/type.dto";
import { API } from "@/api-client/axios";
import { useRouter } from "next/router";
let cartDetailId : number;
const useDeleteCartDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (cartDetailIdRequest: number) => { 
        cartDetailId = cartDetailIdRequest;
      return await deleteCartDetailApi(cartDetailIdRequest);
    },
    {
      onSuccess: (data) => { 
        dispatch(deleteCartDetail(cartDetailId)); 
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
         
      },
    }
  );
};

export const deleteCartDetailApi = async (cartDetail: Number) => {
    const {data} = await API.delete<ResponseDTO>(`/cart/${cartDetail}`);
    return data;
};

export default useDeleteCartDetail;
