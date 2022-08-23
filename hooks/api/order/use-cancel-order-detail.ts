export const cancelOrderStatusFactory = async (
  requestData: CancelOrderDetailDto
) => {
  const { data } = await API.put<CancelOrderStatusResponse>(
    `order/cancel`,
    requestData
  );
  return data;
};

export interface CancelOrderDetailDto {
  orderDetailIds: string[];
  cancelReason: string;
}

export interface CancelOrderStatusResponse extends ISuccessHttpResponse {
  data: CancelOrderDetailDto[];
}

import { API } from "@/api-client/axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useCancelOrderDetail = (handleCloseDialog: () => void) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  let orderStatus = "";
  return useMutation(
    async (data: CancelOrderDetailDto) => {
      return await cancelOrderStatusFactory(data);
    },
    {
      onSuccess: (data) => {
        //because data:any
        queryClient.invalidateQueries("MyOrders");
        queryClient.invalidateQueries("OrderDetail");
        // setIsShowOrderDetail(true);
        handleCloseDialog();
        enqueueSnackbar("Hủy đơn hàng thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: any) => {
        if (error) {
          enqueueSnackbar("Có một hoặc nhiều nhà in đang tiến hành xử lý đơn", {
            autoHideDuration: 9000,
            variant: "warning",
          });
        }
      },
    }
  );
};

export default useCancelOrderDetail;
