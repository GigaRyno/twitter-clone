import useFollow from "@/hooks/useFollow";
import Avatar from "../Avatar";
import Button from "../Button";
import { useState } from "react";

interface FollowUserItemProps {
    user: Record<string, any>;
    useBio?: boolean;
}

const FollowUserItem: React.FC<FollowUserItemProps> = ({user, useBio}) => {
    const { isFollowing, follow } = useFollow(user.id);
    const [isHovered, setIsHovered] = useState(false);
  
    return (
        <section className="flex flex-col items-start justify-start px-4 py-3 max-w-full text-white">
            <div className="relative bg-black hidden max-w-full" />
                <div className="self-stretch flex flex-row items-center text-center justify-between">
                    <div className="flex flex-row items-start justify-start gap-1">
                        <div className="h-10 w-10 relative m-1">
                            <Avatar userId={user.id}/>
                        </div>
                        <div className="flex flex-row pt-1">
                            <div className="flex flex-col flex-grow items-start">
                                <p className="text-white font-semibold text-sm">{user.name}</p>
                                <p className="text-neutral-400 text-sm">@{user.username}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center text-center">
                        <Button
                            label={isFollowing ? (isHovered ? 'Unfollow' : 'Following') : 'Follow'}
                            outline={isFollowing} 
                            follow={isFollowing}
                            itemButton={isFollowing}
                            onClick={follow}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            />
                    </div>
                </div>
            <div className="flex flex-row items-start justify-start py-0 pr-10 pl-14 text-left">
                <p className="tracking-[-0.04em] m-0">
                    {useBio && <p className="text-white text-sm">{user.bio}</p>}
                </p>
            </div>
        </section>
    )
  };

  export default FollowUserItem;