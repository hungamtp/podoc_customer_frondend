import { ForgotPasswordDto, UpdateAccountDto, UpdatePasswordDto } from '@/services/account/dto';
import { forgotPassword, updateAccount, updatePassword } from '@/services/account/index';
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
		}
	);
};

export default useForgotPassword;
