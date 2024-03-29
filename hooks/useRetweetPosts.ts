import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useRetweetPosts = (userId?: string) => {
    const url =  userId ? `/api/retweets?userId=${userId}` : '/api/retweets';``
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    // console.log('Retweet Data: ', data);
    // console.log('User Data: ', userId);

    return {
        data, 
        error, 
        isLoading, 
        mutate
    };
};

export default useRetweetPosts;

// import useSWR from 'swr';
// import fetcher from '@/libs/fetcher';
// import useCurrentUser from './useCurrentUser';

// const useRetweetPosts = () => {
//   const { data: currentUser } = useCurrentUser();
//   const followingIds = currentUser?.followingIds.join(',');

//   console.log('FollowingIds: ', followingIds);

//   const url = followingIds ? `/api/retweets?followingIds=${followingIds}` : '/api/retweets';
//   const { data, error, isLoading, mutate } = useSWR(url, fetcher);

//   console.log('Retweet Data: ', data);

//   return {
//     data, 
//     error, 
//     isLoading, 
//     mutate
//   };
// };

// export default useRetweetPosts;
