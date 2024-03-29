import RetweetItem from './RetweetItem';
import PostItem from './PostItem';

interface PostContainerProps {
  data: Record<string, any>;
  userId?: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ data, userId }) => {
    if(data && !data?.post) {
        return <PostItem userId={userId} data={data}/>
    }
    if(data?.post) {
        return <RetweetItem userId={userId} data={data} post={data.post}/>
    }
}

export default PostContainer;