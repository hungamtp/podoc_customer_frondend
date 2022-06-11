import {  useQuery } from 'react-query'; 
import { CategoryDTO, PageDTO} from '@/services/type.dto'; 
import { API } from '@/api-client/axios';
 
 


const useCategory = ( ) => {
	return useQuery(['Category',   ],
        async () => { 
           return await getAllCategory( )
        }
	);
};
 



  export const getAllCategory = async () => { 
 
    const { data } = await API.get<{data:CategoryDTO[]}>(
      `/category/all` 
    );
    return data.data;
  };
 
export default useCategory;