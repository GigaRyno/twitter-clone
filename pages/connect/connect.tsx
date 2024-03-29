import { ClipLoader } from "react-spinners";

import Button from "@/components/Button";
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import useUsers from "@/hooks/useUsers";
import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import useCurrentUser from "@/hooks/useCurrentUser";
import FollowUserItem from "@/components/follow/FollowUserItem";
import useFilteredUsers from "@/hooks/useFilteredUsers";

const ConnectView = () => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();

    const { data: users = [] } = useUsers();
    const { data: currentUser } = useCurrentUser();
    const { data: filteredUsers } = useFilteredUsers();
    const { data: fetchedUser, isLoading } = useUser(currentUser?.id as string);

    console.log('ConnectView - UserId: ', currentUser);
    console.log('ConnectView - Users: ', users);
    console.log('ConnectView - Fetched User: ', fetchedUser);

    if(isLoading) {
        return(
            <div className="
                flex
                justify-center
                items-center
                h-full
            ">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    };

    return (
        <div>
            {currentUser ? (
                <>
                    <Header showBackButton label="Connect"/>
                    {users.map((user: Record<string, any>) => {
                        return <FollowUserItem user={user} useBio={true}/>
                    })}
                </>
            ):(
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to the Tweeter</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button label="Login" className="w-[90px] h-8" onClick={loginModel.onOpen}/>
                        <Button label="Register" className="w-[90px] h-9" onClick={registerModel.onOpen} secondary/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectView;