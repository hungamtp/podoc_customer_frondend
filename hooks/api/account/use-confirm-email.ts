import { confirmEmail } from "@/services/account/index";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

const useConfirmEmail = (email: string, id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(
    async () => {
      return await confirmEmail(email, id);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("GetAccountById");
        router.push("/account/account-setting");
      },
    }
  );
};

export default useConfirmEmail;
