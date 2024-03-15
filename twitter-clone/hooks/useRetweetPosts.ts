// import useSWR from 'swr';
// import fetcher from '@/libs/fetcher';

// const useRetweetPosts = (userId?: string) => {
//     const url =  userId ? `/api/retweets?userId=${userId}` : '/api/retweets';``
//     const { data, error, isLoading, mutate } = useSWR(url, fetcher);

//     console.log('Retweet User ID: ', userId);
//     console.log('Retweet Posts: ', data);
//     console.log('Retweet URL:', url);

//     return {
//         data, 
//         error, 
//         isLoading, 
//         mutate
//     };
// };

// export default useRetweetPosts;

import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useRetweetPosts = (userId?: string) => {
    // const url =  userId ? `/api/retweets?userId=${userId}` : '/api/retweets';``
    const url = '/api/retweets';
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    };
};

export default useRetweetPosts;