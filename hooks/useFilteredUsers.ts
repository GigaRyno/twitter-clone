import useSWR from 'swr';
import fetcher from '@/libs/fetcher';
import useCurrentUser from './useCurrentUser';

const useFilteredUser = () => {
    const { data: currentUser } = useCurrentUser();
    const { data, error, isLoading, mutate } = useSWR(`/api/users/`, fetcher);

    console.log('Filtered User: ', data);
    console.log('Current User: ', currentUser);

    // data.filter(data.id !== currentUser.id && !currentUser.followingIds.includes(data.id));
    
    return {
      data, 
      error, 
      isLoading, 
      mutate
    };
};

export default useFilteredUser;
