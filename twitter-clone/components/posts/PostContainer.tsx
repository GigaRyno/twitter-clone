import RetweetItem from './RetweetItem';
import PostItem from './PostItem';

interface PostContainerProps {
  data: Record<string, any>;
  userId?: string;
  retweetUser?: Record<string, any>;
}

const PostContainer: React.FC<PostContainerProps> = ({ data, userId }) => {

    console.log('PostContainer Data: ', data);

    if(data.post) {
        return <RetweetItem userId={userId} data={data} post={data.post}/>
    } else if(data) {
        return <PostItem userId={userId} data={data}/>
    } 

    // return (
    //     <>
    //         {isRetweet && <RetweetItem userId={userId} data={data} post={data}/>}
    //         {isPost && <PostItem userId={userId} data={data}/>}
    //     </>
    // )
}

export default PostContainer;