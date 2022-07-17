  import { API } from "@/api-client/axios";
import { ForgotPasswordDto, ForgotPasswordResponse, getAccountByIdResponse, ResetPasswordDto, ResetPasswordResponse, UpdateAccountDto, UpdateAccountResponse, UpdatePasswordDto, UpdatePasswordResponse } from "./dto";


  export const getAccountById = async (id: string) => {
    const { data } = await API.get<getAccountByIdResponse>(
      `/user/${id}`
    );
    return data;
  };

  export const updateAccount = async (requestData: UpdateAccountDto) => {
    const { data } = await API.put<UpdateAccountResponse>(
      `/user/update/${requestData.id}`,
      requestData
    );
    return data;
  };

  export const resetPassword = async (requestData: ResetPasswordDto) => {
    const { data } = await API.put<ResetPasswordResponse>(
      `/user/reset`,
      requestData
    );
    return data;
  };

  export const forgotPassword = async (email: string) => {
    const { data } = await API.get(
      `/user/forgot-password?email=${email}`,
    );
    return data;
  };
  export const verifyEmail = async () => {
    const { data } = await API.get(
      `/user/verify`,
    );
    return data;
  };

  export const updatePassword = async (requestData: UpdatePasswordDto, id: string) => {
    const { data } = await API.patch<UpdatePasswordResponse>(
      `/user/password-change/${id}`,
      requestData
    );
    return data;
  };
  export const confirmEmail = async (email: string, id: string) => {
    const { data } = await API.patch(
      `/user/confirm/${email}/${id}`,
    );
    return data;
  };