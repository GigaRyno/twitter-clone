// import usePost from "./usePost";
// import useCurrentUser from "./useCurrentUser";
// import usePosts from "./usePosts";
// import useLoginModel from "./useLoginModel";
// import { useCallback, useMemo } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// const useLike = ({postId, userId}:{ postId: string, userId: string }) => {
//     const { data: currentUser } = useCurrentUser();
//     const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
//     const { mutate: mutateFetchedPosts } = usePosts(userId);

//     const loginModel = useLoginModel();

//     const hasLiked = useMemo(() => {
//         const list = fetchedPost?.likedIds || [];

//         return list.includes(currentUser?.id);
//     }, [currentUser?.id, fetchedPost?.likedIds]);

//     const like = useCallback(async () => {
//         if(!currentUser) {
//             return loginModel.onOpen();
//         }

//         try{
//             let request;

//             if(hasLiked) {
//                 request = () => axios.delete(`/api/like/${postId}`);
//             } else {
//                 request = () => axios.post(`/api/like/${postId}`);
//             }
//             await request();
//             mutateFetchedPost();
//             mutateFetchedPosts();

//             toast.success('Liked');

//         } catch(err) { 
//          toast.error('Something went wrong!');       
//         }


//     }, [currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModel]);

//     return {
//         hasLiked,
//         like
//     }
// };

// export default useLike;


import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModel from "./useLoginModel";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModel = useLoginModel();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const like = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success(hasLiked ? 'Unliked' : 'Liked');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModel]);

  return {
    hasLiked,
    like,
  }
}

export default useLike;