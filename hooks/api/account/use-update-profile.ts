import { UpdateAccountDto } from '@/services/account/dto';
import { updateAccount } from '@/services/account/index';
import { useMutation, useQueryClient } from 'react-query';


const useUpdateProfile = () => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdateAccountDto) => {
            return await updateAccount(data);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
			},
		}
	);
};

export default useUpdateProfile;
