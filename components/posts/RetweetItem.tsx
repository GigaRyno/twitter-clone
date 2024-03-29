import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { BiRepost } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModel from '@/hooks/useLoginModel';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar';
import useLike from '@/hooks/useLike';
import useRetweet from '@/hooks/useRetweet';

interface RetweetItemProps {
  data: Record<string, any>;
  userId?: string;
  post?: Record<string, any>;
//   retweetUser: Record<string, any>;
}

const RetweetItem: React.FC<RetweetItemProps> = ({ data, userId, post }) => {
    const router = useRouter();
    const loginModel = useLoginModel();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, like } = useLike({postId: data.post.id, userId});

    // console.log("Data: ", data);
    // console.log("Post: ", post);

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.userId}`)
    }, [router, data.userId]);

    const goToRetweetUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.post?.userId}`)
    }, [router, data.post?.userId]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback(async (event: any) => {
        event.stopPropagation();

        if (!currentUser)
            return loginModel.onOpen();

        like();

    }, [loginModel, currentUser, like]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt)
            return null;

        return data.createdAt.split('T')[0].split('-')[1] + '/' + data.createdAt.split('T')[0].split('-')[2] + '/' + data.createdAt.split('T')[0].split('-')[0]
    }, [data.createdAt])

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
    const onLikeColor = hasLiked ? 'red' : '';

    return (
        <div 
        onClick={goToPost}
        className="
            border-b-[1px] 
            border-neutral-800 
            p-5 
            cursor-pointer 
            hover:bg-neutral-900 
            transition
        ">
        <div className="flex flex-row items-start gap-3">
            <div className='p-1'>
                <div className='flex flex-col items-end'>
                    <BiRepost size={20} color='#888'/>
                </div>
                <Avatar userId={data.post.userId}/>
            </div>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='text-neutral-500 font-bold' onClick={goToUser}>{data.user?.name ? `${data.user?.name} has reposted` : `Loading...`}</p>
                        {/* USERNAME MUST BE REPLACED WITH THE USER THAT RETWEETS IT */}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <p 
                        onClick={goToRetweetUser} 
                        className="
                            text-white 
                            font-semibold 
                            cursor-pointer 
                            hover:underline
                        ">
                        {data.post.user.name}
                        </p>
                        <span 
                        onClick={goToRetweetUser} 
                        className="
                            text-neutral-500
                            cursor-pointer
                            hover:underline
                            hidden
                            md:block
                        ">
                        @{data.post.user.username}
                        </span>
                        <span className='text-neutral-500 font-bold'>
                            ·
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            onClick={onLike}
                            className="
                            flex 
                            flex-row 
                            items-center 
                            text-neutral-500 
                            gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-red-500
                        ">
                            <LikeIcon size={20} color={onLikeColor}/>
                            <p>
                                {data.post.likedIds?.length || 0}
                            </p>
                        </div>
                        <div 
                        className="
                            flex 
                            flex-row 
                            items-center 
                            text-neutral-500 
                            gap-2 
                            cursor-pointer 
                            transition 
                            hover:text-sky-500
                        ">
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.post.comments?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RetweetItem;