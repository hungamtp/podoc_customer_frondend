import { useQuery } from 'react-query';
import { Filter, getAllMyOrders } from '@/services/order';

const useMyOrders = (filter: Filter) => {
	return useQuery(['MyOrders', filter ],
        async () => { 
           return await getAllMyOrders(filter)
        }
	);
};

export default useMyOrders;
