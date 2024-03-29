import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useRetweetPosts from "./useRetweetPosts";
// import useRetweetPost from "./useRetweetPost";
// import useRetweetPosts from "./useRetweetPosts";

const useRetweet = ({ postId, userId }: { postId: string, userId?: string }) => {

  // console.log('Post ID: ', postId);
  // console.log('User ID: ', userId);
  const { data: currentUser } = useCurrentUser(); 
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId as string);
  // const { data: retweetPost } = useRetweetPost(postId);
  // const { mutate: mutateFetchedPosts } = useRetweetPosts(userId);
  // console.log('Fetched Post: ', useRetweetPosts(userId));

  // console.log('postid: ', postId);

  const loginModel = useLoginModel();

  // console.log('Fetched Post: ', fetchedPost);

  // Change this to useRetweetPost and find if the current user has retweeted the post and that they are the owner of the retweet
  let hasRetweeted = useMemo(() => {
    const list = fetchedPost?.retweetedIds || [];
    // console.log('Retweeted List: ', list);
    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);


  // console.log('Has Retweeted: ', hasRetweeted);
  // console.log('Current User: ', currentUser);
  // console.log('Fetched Post: ', fetchedPost);
  // console.log('Mutate Fetched Post: ', mutateFetchedPost);
  // console.log('Mutate Fetched Posts: ', mutateFetchedPosts);
  // console.log('Post ID: ', postId);

  const retweet = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    if (!postId) {
      // console.log('Invalid ID: ', postId);
      return toast.error('Invalid ID');
    }
    
    if(currentUser.id === fetchedPost?.userId) {
      return toast.error('You cannot retweet your own post');
    }

    try {
      let request;

      if (!hasRetweeted) {
        request = () => axios.post('/api/retweets',  { postId });
      } else {
        request = () => axios.delete('/api/retweets', { data: { postId } });
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