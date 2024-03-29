import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { SignUpDTO } from "@/services/type.dto";
import { signup as signupAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { signup } from "@/services/apiClient";

import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
const useSignup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: SignUpDTO) => {
      return await signup(data);
    },
    {
      onSuccess: (data) => {
        dispatch(signupAction(data));
        //because data:any
        router.push("/login");
        enqueueSnackbar("Đăng kí tài khoản thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {},
    }
  );
};

export default useSignup;
