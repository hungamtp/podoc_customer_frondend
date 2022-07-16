import { UpdateAccountDto, UpdatePasswordDto } from '@/services/account/dto';
import { updateAccount, updatePassword } from '@/services/account/index';
import { payUnpaidOrder } from '@/services/order';
import { PayUnpaidOrderDto } from '@/services/order/dto';
import { useMutation, useQueryClient } from 'react-query';


const usePayUnpaidOrder = () => {
    const queryClient = useQueryClient();
	return useMutation(
		      
        async (data: PayUnpaidOrderDto) => {
            return await payUnpaidOrder(data);
		},
		{
			onSuccess: (data: any) => {
				window.location.href = data.payUrl;
			},
		}
	);
};

export default usePayUnpaidOrder;
