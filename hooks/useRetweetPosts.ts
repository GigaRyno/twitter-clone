import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useRetweetPosts = (userId?: string) => {
    const url =  userId ? `/api/retweets?userId=${userId}` : '/api/retweets';``
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    };
};

export default useRetweetPosts;
