import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { deleteCartDetail } from "@/redux/slices/cart";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { API } from "@/api-client/axios";
import { useRouter } from "next/router";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
let cartDetailId: string;
const useDeleteCartDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (cartDetailIdRequest: string) => {
      cartDetailId = cartDetailIdRequest;
      return await deleteCartDetailApi(cartDetailIdRequest);
    },
    {
      onSuccess: (data) => {
        dispatch(deleteCartDetail(cartDetailId));
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {},
    }
  );
};

export const deleteCartDetailApi = async (cartDetail: string) => {
  const { data } = await API.delete<ISuccessHttpResponse>(
    `/cart/${cartDetail}`
  );
  return data;
};

export default useDeleteCartDetail;
