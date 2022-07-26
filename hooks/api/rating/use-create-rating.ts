import { UpdateAccountDto } from '@/services/account/dto';
import { updateAccount } from '@/services/account/index';
import { createRating } from '@/services/rating';
import { CreateRatingDto } from '@/services/rating/dto';
import { useMutation, useQueryClient } from 'react-query';


const useCreateRating = (handleCloseDialog: () => void) => {
    const queryClient = useQueryClient();
	return useMutation(
        async (data: CreateRatingDto) => {
            return await createRating(data);
		},
		{
			onSuccess: (data) => {
                queryClient.invalidateQueries("AllOrderDetail")
                handleCloseDialog();
			},
		}
	);
};

export default useCreateRating;
