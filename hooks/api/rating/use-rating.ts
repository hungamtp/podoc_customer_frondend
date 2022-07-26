import { useQuery } from 'react-query';
import {Filter, getAllRating } from '@/services/rating';

const useRating = (id: string, filter: Filter) => {
	return useQuery(['Ratings', filter ],
        async () => { 
           return await getAllRating(id, filter)
        }
	);
};

export default useRating;
