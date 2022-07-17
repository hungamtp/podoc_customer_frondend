import { ForgotPasswordDto, UpdateAccountDto, UpdatePasswordDto } from '@/services/account/dto';
import { forgotPassword, updateAccount, updatePassword, verifyEmail } from '@/services/account/index';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';


const useVerifyEmail = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
	return useMutation(
        async () => {
            return await verifyEmail();
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("GetAccountById")
			},
		}
	);
};

export default useVerifyEmail;
