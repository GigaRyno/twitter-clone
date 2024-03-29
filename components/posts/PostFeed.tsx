import usePosts from '@/hooks/usePosts';
import PostContainer from './PostContainer';
import useRetweetsPosts from '@/hooks/useRetweetPosts';
import useCurrentUser from '@/hooks/useCurrentUser';

interface PostFeedProps {
    userId?: string;
    isProfile?: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, isProfile }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: posts = [] } = usePosts(currentUser?.userId);
    const { data: retweets = [] } = useRetweetsPosts(currentUser?.followingIds);

    // Defined filtering for the posts and retweets that the user is following
    const filteredposts = posts.filter((post: { userId: any; }) => currentUser?.followingIds.includes(post.userId));
    const filteredRetweets = retweets.filter((retweet: { userId: any; }) => currentUser?.followingIds.includes(retweet.userId));

    // Defined filtering for the posts and retweets that are from the user for the profile page
    const profilePosts = posts.filter((post: { userId: any; }) => post.userId === userId);
    const profileRetweets = retweets.filter((retweet: { userId: any; }) => retweet.userId === userId);

    // Defined conditional for the posts and retweets
    let isProfilePosts = isProfile ? profilePosts : filteredposts;
    let isProfileRetweets = isProfile ? profileRetweets : filteredRetweets;

    // sort the posts and retweets by the date
    const sortedPosts = [...isProfilePosts, ...isProfileRetweets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return (
        <>
            {sortedPosts.map((post: Record<string, any>) => (
                <PostContainer userId={post?.userId} key={post?.id} data={post}/>
            ))}
        </>
    )
}
export default PostFeed;