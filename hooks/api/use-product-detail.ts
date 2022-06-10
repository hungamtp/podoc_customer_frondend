import {  useQuery } from 'react-query'; 
import { PageDTO} from '@/services/type.dto'; 
import { API } from '@/api-client/axios';

 


const useProductDetail = (id: number) => {
	return useQuery(['Category', id ],
        async () => { 
           return await getProductDetail(id)
        }
	);
};
 


export const getProductDetail = async (id: number) => { 
 
    const { data } = await API.get<PageDTO>(
      `/product/${id}` 
    );
    return data.data;
};
 
export default useProductDetail;