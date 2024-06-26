import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useRetweetPost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(postId ? `/api/retweets/${postId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useRetweetPost;