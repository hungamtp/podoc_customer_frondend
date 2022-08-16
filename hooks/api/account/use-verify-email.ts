import {
  ForgotPasswordDto,
  UpdateAccountDto,
  UpdatePasswordDto,
} from "@/services/account/dto";
import {
  forgotPassword,
  updateAccount,
  updatePassword,
  verifyEmail,
} from "@/services/account/index";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async () => {
      return await verifyEmail();
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("GetAccountById");
      },
      onError: (err) => {
        enqueueSnackbar(
          "Có lỗi xảy ra trong quá trình xác nhận, vui lòng thử lại sau!",
          {
            autoHideDuration: 6000,
            variant: "warning",
          }
        );
      },
    }
  );
};

export default useVerifyEmail;
