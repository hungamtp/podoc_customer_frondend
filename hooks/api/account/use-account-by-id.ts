import { useQuery } from 'react-query';
import { getAccountById } from '@/services/account/index';

const useGetAccountById = (id: string) => {
	return useQuery(['GetAccountById'],
        async () => { 
           return await getAccountById(id)
        }
	);
};

export default useGetAccountById;
