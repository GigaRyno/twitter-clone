import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from 'react-icons/ai';
import { BiDotsHorizontal } from 'react-icons/bi';
import { BsBookmark } from "react-icons/bs";
import { FiShare } from "react-icons/fi";

import useLoginModel from '@/hooks/useLoginModel';
import useCurrentUser from '@/hooks/useCurrentUser';
import useRetweet from '@/hooks/useRetweet';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';
import PostSettings from './PostSettings';

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModel = useLoginModel();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, like } = useLike({postId: data.id, userId});
    const { hasRetweeted, retweet } = useRetweet({postId: data.id, userId: data.userId});

    // console.log('userId', userId);
    // console.log('currentuser', currentUser);

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user?.id}`)
    }, [router, data.user?.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback(async (event: any) => {
        event.stopPropagation();

        if (!currentUser)
            return loginModel.onOpen();

        like();

    }, [loginModel, currentUser, like]);

    const onRetweet = useCallback(async (event: any) => {
        event.stopPropagation();

        if (!currentUser)
            return loginModel.onOpen();
        retweet();

    }, [loginModel, currentUser, retweet]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt)
            return null;

        return data.createdAt.split('T')[0].split('-')[1] + '/' + data.createdAt.split('T')[0].split('-')[2] + '/' + data.createdAt.split('T')[0].split('-')[0]
    }, [data.createdAt])

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
    const onLikeColor = hasLiked ? 'red' : '';
    const onRetweetColor = hasRetweeted ? 'green' : '';

    // return (
    //     <div 
    //     onClick={goToPost}
    //     className="
    //         border-b-[1px] 
    //         border-neutral-800 
    //         p-5 
    //         cursor-pointer 
    //         hover:bg-neutral-900 
    //         transition
    //     ">
    //     <div className="flex flex-row items-start gap-3">
    //         <Avatar userId={data.userId} />
    //             <div>
    //                 <div className="flex flex-row items-center gap-2">
    //                     {/* <div> */}
    //                         <p 
    //                         onClick={goToUser} 
    //                         className="
    //                             text-white 
    //                             font-semibold 
    //                             cursor-pointer 
    //                             hover:underline
    //                         ">
    //                         {data.user?.name}
    //                         </p>
    //                         <span 
    //                         onClick={goToUser} 
    //                         className="
    //                             text-neutral-500
    //                             cursor-pointer
    //                             hover:underline
    //                             hidden
    //                             md:block
    //                         ">
    //                         @{data.user?.username}
    //                         </span>
    //                         <span className="text-neutral-500 text-sm">
    //                             {createdAt}
    //                         </span>
    //                     {/* </div> */}
    //                         <div className='flex cursor-pointer hover:bg-blue-500 rounded-full hover:bg-opacity-50 p-1'>
    //                             <PostSettings userId={data.userId}/>
    //                         </div>
    //                 </div>
    //                 <div className="text-white mt-1">
    //                     {data.body}
    //                 </div>
    //                 <div className="flex flex-row items-center mt-3 gap-10">
    //                     <div
    //                         onClick={onLike}
    //                         className="
    //                         flex 
    //                         flex-row 
    //                         items-center 
    //                         text-neutral-500 
    //                         gap-2 
    //                             cursor-pointer 
    //                             transition 
    //                             hover:text-red-500
    //                     ">
    //                         <LikeIcon size={20} color={onLikeColor}/>
    //                         <p>
    //                             {data.likedIds?.length || 0}
    //                         </p>
    //                     </div>
    //                     <div 
    //                     className="
    //                         flex 
    //                         flex-row 
    //                         items-center 
    //                         text-neutral-500 
    //                         gap-2 
    //                         cursor-pointer 
    //                         transition 
    //                         hover:text-sky-500
    //                     ">
    //                         <AiOutlineMessage size={20} />
    //                         <p>
    //                             {data.comments?.length || 0}
    //                         </p>
    //                     </div>
    //                     <div
    //                         onClick={onRetweet}
    //                         className="
    //                         flex 
    //                         flex-row 
    //                         items-center 
    //                         text-neutral-500 
    //                         gap-2 
    //                             cursor-pointer 
    //                             transition 
    //                             hover:text-green-500
    //                     ">
    //                         <AiOutlineRetweet size={20} color={onRetweetColor} />
    //                         <p>
    //                             {data.retweetedIds?.length || 0}
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className=" bg-black flex flex-col items-end p-5 max-w-full text-white border-b-[1px]  border-neutral-800">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-1.5 pl-0 box-border max-w-full [row-gap:20px]">
                <div className="flex-1 flex flex-row items-start justify-start gap-3 max-w-full">
                <Avatar userId={data.userId} />
                    <div className="flex-1 flex flex-col items-start justify-start gap-[5px] min-w-[261px] max-w-full">
                         <div className="flex flex-row items-start justify-start gap-[4px]">
                        <div className="
                        relative
                        inline-block
                        text-white 
                        font-semibold 
                        cursor-pointer 
                        hover:underline">
                            {data.user?.name}
                        </div>
                        <div className="
                        relative
                        text-neutral-500
                        cursor-pointer
                        hover:underline
                        hidden
                        md:block">
                            @{data.user?.username}
                        </div>
                        <span className='text-neutral-500 font-bold'>
                            ·
                        </span>
                        <div className="relative inline-block z-[1] text-neutral-500 text">
                            {createdAt}
                        </div>
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
                            {data.likedIds?.length || 0}
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
                            {data.comments?.length || 0}
                        </p>
                    </div>
                    <div
                        onClick={onRetweet}
                        className="
                        flex 
                        flex-row 
                        items-center 
                        text-neutral-500 
                        gap-2 
                            cursor-pointer 
                            transition 
                            hover:text-green-500
                    ">
                        <AiOutlineRetweet size={20} color={onRetweetColor} />
                        <p>
                            {data.retweetedIds?.length || 0}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-start ml-[-16px] cursor-pointer hover:bg-blue-500 rounded-full hover:bg-opacity-50 p-1">
                <PostSettings userId={data.userId}/>
            </div>
        </div>
    </div>
    )
}

export default PostItem;