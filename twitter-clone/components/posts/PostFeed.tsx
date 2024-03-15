import usePosts from '@/hooks/usePosts';
import PostContainer from './PostContainer';
import useRetweets from '@/hooks/useRetweetPosts';

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);
    const { data: retweets = [] } = useRetweets(userId);

    // sorts the posts and retweets by date
    const sortedPosts = [...posts, ...retweets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <>
            {sortedPosts.map((post: Record<string, any>) => (
                <PostContainer userId={post.userId} key={post.id} data={post}/>
            ))}
        </>
    )
}
export default PostFeed;