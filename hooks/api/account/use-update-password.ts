import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import { UpdateAccountDto, UpdatePasswordDto } from '@/services/account/dto';
import { updateAccount, updatePassword } from '@/services/account/index';
import { AxiosError } from 'axios';
import { Router } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useUpdatePassword = (id: string,closeChangePassword: () => void) => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: UpdatePasswordDto) => {
            return await updatePassword(data, id);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
				closeChangePassword();
			},
			onError: (error: AxiosError<ErrorHttpResponse>) => {
				 
			},
		}
	);
};

export default useUpdatePassword;
