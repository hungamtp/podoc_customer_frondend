import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { LoginDto } from "@/services/login/dto/login.dto";
import { login as loginAction } from "@/redux/slices/auth";
import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { login } from "@/services/login";

import { useRouter } from "next/router";
const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation(
    async (data: LoginDto) => {
      console.log(data)
      return await login(data);
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("jwt" ,data.token );
        dispatch(loginAction(data)); 
        //because data:any
        router.push('/home');
        // router.back();
      },
      onError: (error: AxiosError<ErrorHttpResponse>) => {
         
      },
    }
  );
};

export default useLogin;
