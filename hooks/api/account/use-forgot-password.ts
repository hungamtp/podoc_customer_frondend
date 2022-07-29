import { ErrorHttpResponse } from '@/models/error_http_response.interface';
import { ForgotPasswordDto, UpdateAccountDto, UpdatePasswordDto } from '@/services/account/dto';
import { forgotPassword, updateAccount, updatePassword } from '@/services/account/index';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useForgotPassword = () => {
    const router = useRouter();
	return useMutation(
        async (data: ForgotPasswordDto) => {
            return await forgotPassword(data.email);
		},
		{
			onSuccess: (data) => {
                router.push("forgot-password-message")
			},
			onError: (error: AxiosError<ErrorHttpResponse>) => {
				 
			},
		}
	);
};

export default useForgotPassword;
