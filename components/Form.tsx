import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
import usePosts from "@/hooks/usePosts";
import useRegisterModel from "@/hooks/useRegisterModel";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    isRetweet?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({placeholder, isComment, isRetweet, postId}) => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts(postId as string);
    const { mutate: mutatePost } = usePost(postId as string);

    const [percentage, setPercentage] = useState(0);
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : isRetweet ? `/api/retweet?postId=${postId}` : '/api/posts';

            await axios.post(url, { body });

            toast.success('Tweeted successfully!');
            setBody('');
            mutatePosts();
            mutatePost();
        } catch (error) {
            toast.error('Something went wrong');   
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts, isComment, postId]);

    const getProgressbarStyle = () => {
        if (body.length > 0 && body.length < 175) {
          return buildStyles({
            rotation: 0,
            strokeLinecap: "butt",
            pathTransitionDuration: 0,
            trailColor: "#2F3336",
            pathColor: "#1D9BF0",
            textSize: "40px",
          });
        }
        if (body.length >= 175 && body.length < 250) {
          return buildStyles({
            rotation: 0,
            strokeLinecap: "butt",
            pathTransitionDuration: 0,
            textSize: "40px",
            textColor: "#71767b",
            trailColor: "#2F3336",
            pathColor: "#FFD400",
          });
        }
        if (body.length >= 250) {
          return buildStyles({
            rotation: 0,
            strokeLinecap: "butt",
            pathTransitionDuration: 0,
            textSize: "40px",
            textColor: "#F4212E",
            trailColor: "#2F3336",
            pathColor: "#F4212E",
          });
        }
      };
    
      useEffect(() => {
        const calculatePercentage = () => {
          const currentLength = body.length;
          const maxLength = 250;
          const calculatedPercentage = (currentLength / maxLength) * 100;
    
          setPercentage(calculatedPercentage);
        };
    
        calculatePercentage();
      }, [body]);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser?.id}/>
                    </div>
                    <div className="w-full">
                        <textarea
                            className="w-full resize-y outline-none bg-black mt-2 text-xl text-white placeholder-neutral-500 peer scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm"
                            placeholder={placeholder}
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            maxLength={250}
                        />
                        <hr className="
                            opacity-0
                            peer-focus:opacity-100
                            h-[1px]
                            w-full
                            border-neutral-800
                            transition
                            "/>
                            <div className="mt-2 flex flex-row justify-end">
                                <div className="flex items-center px-5 cursor-pointer">
                                    {body.length > 0 && body.length < 175 && body.trim() ? (
                                        <CircularProgressbar
                                            className="w-5 h-5 ease-in duration-300"
                                            value={percentage}
                                            styles={getProgressbarStyle()}
                                        />
                                    ) : body.length >= 175 && body.trim() ? (
                                        <CircularProgressbar
                                            className="w-7 h-7 text-center ease-out duration-300"
                                            value={percentage}
                                            styles={getProgressbarStyle()}
                                            text={`${250 - body.length}`}
                                        />
                                    ) : null}
                                </div>
                                <Button disabled={isLoading || !body} label="Tweet" className="w-[84px] h-9" onClick={onSubmit}/>
                            </div>
                    </div>
                </div>
            ):(
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to the Tweeter</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button label="Login" onClick={loginModel.onOpen}/>
                        <Button label="Register" className="h-9" onClick={registerModel.onOpen} secondary/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form;