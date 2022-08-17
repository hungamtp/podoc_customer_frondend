import { ErrorHttpResponse } from "@/models/error_http_response.interface";
import { UpdateAccountDto, UpdatePasswordDto } from "@/services/account/dto";
import { updateAccount, updatePassword } from "@/services/account/index";
import { AxiosError } from "axios";
import { Router } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdatePassword = (id: string, closeChangePassword: () => void) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: UpdatePasswordDto) => {
      return await updatePassword(data, id);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("GetAccountById");
        closeChangePassword();
        enqueueSnackbar("Đổi mật khẩu thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
    }
  );
};

export default useUpdatePassword;
