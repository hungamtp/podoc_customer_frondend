import { getDashboard } from '@/services/dashboard';
import { useQuery } from 'react-query';

const useUserDashboard = () => {
	return useQuery(['UserDashboard'],
        async () => { 
           return await getDashboard()
        }
	);
};

export default useUserDashboard;
