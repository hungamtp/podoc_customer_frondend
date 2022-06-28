import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { PaymentResponse } from "@/services/type.dto";
import { login as loginAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

import { useRouter } from "next/router";
import { login } from "@/services/apiClient";
import { API } from "@/api-client/axios";
const useCreatePaymentTransaction = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(async () => {
    return await createPaymentTransaction();
  });
};

export const createPaymentTransaction = async () => {
    const data  = await API.get<PaymentResponse>(`/order`);
    return data;
  };

export default useCreatePaymentTransaction;
