import {  useQuery } from 'react-query'; 
import { PageDTO} from '@/services/type.dto'; 
import { API } from '@/api-client/axios';
import { data } from 'jquery';
 


const useCategory = (filter: CategoryFilter) => {
	return useQuery(['Category', filter ],
        async () => { 
           return await getAllCategory(filter)
        }
	);
};

  export interface CategoryFilter {
    pageSize?: number;
    pageNumber?: number; 
  }



  export const getAllCategory = async (filter?: CategoryFilter) => { 
    const pageNumber = 0;
    const pageSize = 9; 

    const query = new URLSearchParams({
      pageNumber: filter?.pageNumber?.toString() || pageNumber.toString(),
      pageSize: filter?.pageSize?.toString() || pageSize.toString(),
 
    });
    const { data } = await API.get<PageDTO>(
      `/category?${query.toString()}` 
    );
    return data.data;
  };
 
export default useCategory;