import { useQuery } from 'react-query';
import { Filter, getAllOrderDetail } from '@/services/order';

const useAllOrderDetail = (filter: Filter) => {
	return useQuery(['AllOrderDetail', filter ],
        async () => { 
           return await getAllOrderDetail(filter)
        }
	);
};

export default useAllOrderDetail;
