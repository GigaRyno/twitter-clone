import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";
// import { post } from "axios";

const useRetweet = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModel = useLoginModel();

  const hasRetweeted = useMemo(() => {
    const list = fetchedPost?.retweetedIds || [];

    // console.log('LIST', list);
    // console.log('CURRENT USER', currentUser?.id);
    // console.log('HAS RETWEETED', list.includes(currentUser?.id));
    // console.log('Fetched Post', fetchedPost);

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const retweet = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    try {
      let request;

      if(currentUser.id === fetchedPost?.userId) {
        return toast.error('You cannot retweet your own post');
      }

      // if(fetchedPost?.retweetedIds?.includes(currentUser?.id ?? 0)) {
      //   request = () => axios.delete('/api/retweet', { data: { postId } });
      // } 

      //check if the current user is the owner of the post and if they are, they cannot retweet their own post
      // if(currentUser.id === fetchedPost?.userId) {
      //   return toast.error('You cannot retweet your own post');
      // }

      // if the current user has already retweeted the post, then unretweet it
      if(!hasRetweeted) {
        request = () => axios.post('/api/retweet', { postId });
        console.log('POST: hasRetweeted', hasRetweeted);
      } else {
        request = () => axios.delete('/api/retweet', { data: { postId } });
        console.log('DELETE: hasRetweeted', hasRetweeted);
      }

      console.log(request);
    
      console.log('HERE1');
      // await request?.();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success(hasRetweeted ? 'UnRetweeted' : 'Retweeted');
      console.log(hasRetweeted ? `UnRetweeted | ${hasRetweeted} | ${postId}` : `Retweeted | ${hasRetweeted} | ${postId}`);
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

