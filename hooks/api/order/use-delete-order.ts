import { API } from "@/api-client/axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { CancelOrderStatusDto } from "@/services/order/dto";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useDeleteOrder = (handleCloseDialog: () => void) => {
  return useMutation(async (data: CancelOrderStatusDto) => {
    return await deleteOrder(data);
  });
};

export default useDeleteOrder;

export const deleteOrder = async (requestData: CancelOrderStatusDto) => {
  const data = await API.put<ISuccessHttpResponse>(
    `/order/cancel-by-user`,
    requestData
  );
  return data;
};
