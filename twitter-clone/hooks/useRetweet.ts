import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useRetweet = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModel = useLoginModel();

  const hasRetweeted = useMemo(() => {
    const list = fetchedPost?.retweetedIds || [];

    console.log('LIST', list);
    console.log('CURRENT USER', currentUser?.id);
    console.log('HAS RETWEETED', list.includes(currentUser?.id));
    console.log('Fetched Post', fetchedPost);

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const retweet = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    try {
      let request;

      if(currentUser.id == fetchedPost?.userId) {
        return toast.error('You cannot retweet your own post');
      }

      if (hasRetweeted) {
        request = () => axios.delete('/api/retweet', { data: { postId } });
      } else {
        request = () => axios.post('/api/retweet', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success(hasRetweeted ? 'UnRetweeted' : 'Retweeted');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasRetweeted, postId, mutateFetchedPosts, mutateFetchedPost, loginModel]);

  return {
    hasRetweeted,
    retweet,
  }
}

export default useRetweet;