import { useQuery } from 'react-query';
import { forgotPassword } from '@/services/account/index';
import { ForgotPasswordDto } from '@/services/account/dto';

const useForgotPassword = (email: string) => {
	return useQuery(['useForgetPassword'],
        async () => { 
           return await forgotPassword(email);
        }
	);
};

export default useForgotPassword;
