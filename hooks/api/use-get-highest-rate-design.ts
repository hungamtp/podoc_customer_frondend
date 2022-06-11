import {  useQuery } from 'react-query'; 
import { ProductHomePage ,Best4DesignedProduct} from '@/services/type.dto'; 
import { API } from '@/api-client/axios';
import { data } from 'jquery';
 
export const useGetHighestRateDesign = () => {
	return useQuery(['HighestRateDesign' ],
        async () => { 
           return await getHighestRateDesign()
        }
	);
};

  export const getHighestRateDesign = async () => { 
    const query = new URLSearchParams({ 
    });
    const { data } = await API.get<Best4DesignedProduct>(
      `/design/4highestDRateDesignedProduct`
    );
    return data.data;
  };
 
