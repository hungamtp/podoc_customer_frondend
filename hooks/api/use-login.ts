import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { LoginDto } from "@/services/type.dto";
import { login as loginAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";

import { useRouter } from "next/router";
import { login } from "@/services/apiClient";
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(async (data: LoginDto) => {
    return await login(data);
  });
};

export default useLogin;
