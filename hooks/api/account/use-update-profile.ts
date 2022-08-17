import { UpdateAccountDto } from "@/services/account/dto";
import { updateAccount } from "@/services/account/index";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "react-query";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    async (data: UpdateAccountDto) => {
      return await updateAccount(data);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("GetAccountById");
        enqueueSnackbar("Chỉnh sửa thông tin tài khoản thành công!", {
          autoHideDuration: 3000,
          variant: "success",
        });
      },
    }
  );
};

export default useUpdateProfile;
