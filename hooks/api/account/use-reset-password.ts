import { ResetPasswordDto } from "@/services/account/dto";
import { resetPassword } from "@/services/account/index";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const useResetPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    async (data: ResetPasswordDto) => {
      return await resetPassword(data);
    },
    {
      onSuccess: () => {
        router.push("/auth/reset-password-success-form");
      },
    }
  );
};

export default useResetPassword;
