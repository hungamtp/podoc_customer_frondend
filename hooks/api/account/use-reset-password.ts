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
        enqueueSnackbar("Phiên làm việc quá hạn, vui lòng thao tác lại!", {
          autoHideDuration: 6000,
          variant: "warning",
        });
      },
    }
  );
};

export default useResetPassword;
