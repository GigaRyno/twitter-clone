import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';
import RetweetItem from './RetweetItem';
import useRetweet from '@/hooks/useRetweet';

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);
    return (
        <>
            {posts.map((post: Record<string, any>,) => (
                <RetweetItem userId={userId} key={post.id} data={post}/>
            ))}
            {posts.map((post: Record<string, any>,) => (
                <PostItem userId={userId} key={post.id} data={post}/>
            ))}
        </>
    )
}
export default PostFeed;