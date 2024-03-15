import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import { useRouter } from "next/router";

export default function Home () {
  const router = useRouter();
  const { userId } = router.query;

  console.log('Index - Router: ', router);
// 
  console.log('Index - User ID: ', userId);

  return (
    <>
      <Header label="Home"/>
      <Form placeholder="What's happening?"/>
      <PostFeed userId={userId as string}/>
      {/* <PostFeed/> */}
    </>
  )
}
