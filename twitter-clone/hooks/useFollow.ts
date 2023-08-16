import { use, useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModel from "./useLoginModel";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModel = useLoginModel();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];
        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);

    const follow = useCallback(async () => {
        if(!currentUser)
            return loginModel.onOpen();

        try {
            let request;

            if(isFollowing) {
                request = () => axios.delete('/api/follow', {data: {userId}});
            } else {
                request = () => axios.post('/api/follow', {userId});
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();

        } catch (err) {
            console.log(err);
            toast.error('Something went wrong');
        }

    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModel]);

    return { isFollowing, follow}
}

export default useFollow;