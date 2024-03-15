import useSWR from 'swr';
import fetcher from '@/libs/fetcher';
import { useSession } from 'next-auth/react';

const usePosts = (userId?: string) => {
    const url =  userId ? `/api/posts?userId=${userId}` : '/api/posts';``
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    

    return {
        data, 
        error, 
        isLoading, 
        mutate
    };
};

export default usePosts;

// import useSWR from 'swr';
// import fetcher from '@/libs/fetcher';
// import useUser from './useUser';

// const usePosts = (userId?: string) => {
//     const url =  userId ? `/api/posts?userId=${userId}` : '/api/posts';
//     const { data, error, isLoading, mutate } = useSWR(url, fetcher);

//     // console.log('Data: ', data);
//     // console.log('userId: ', userId);

//     // Fetch the list of people that the user is following
//     const { data: followingIds } = useSWR(userId ? `/api/users/${userId}` : '/api/users/', fetcher);
//     // const { data: followingIds } = useUser(userId ?? '');
// // 
//     // console.log('Following IDs: ', followingIds);

//     // Filter out the posts from people that the user isn't following
//     const filteredData = data?.filter((post: any) => data?.includes(post.userId));

//     return {
//         data: filteredData, 
//         error, 
//         isLoading, 
//         mutate
//     };
// };

// export default usePosts;