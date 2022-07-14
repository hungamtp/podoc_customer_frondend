import { UpdateAccountDto, UpdatePasswordDto } from '@/services/account/dto';
import { updateAccount, updatePassword } from '@/services/account/index';
import { useMutation, useQueryClient } from 'react-query';


const useUpdatePassword = (id: string) => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdatePasswordDto) => {
            return await updatePassword(data, id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
			},
		}
	);
};

export default useUpdatePassword;
