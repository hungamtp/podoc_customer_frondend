import { ResetPasswordDto } from "@/services/account/dto";
import { resetPassword } from "@/services/account/index";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useResetPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: ResetPasswordDto) => {
      return await resetPassword(data);
    },
    {
      onSuccess: () => {
        router.push("/auth/reset-password-success-form");
      },
      onError: () => {
        // router.push("/auth/reset-password-success-form");
        enqueueSnackbar("Đổi mật khẩu thất bại do chờ quá lâu!", {
          autoHideDuration: 6000,
          variant: "warning",
        });
      },
    }
  );
};

export default useResetPassword;
