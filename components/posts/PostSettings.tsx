import useLoginModel from "@/hooks/useLoginModel";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiDotsHorizontalRounded, BiDotsVerticalRounded, BiLogOut } from "react-icons/bi";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";

interface PostSettingsButtonProps {
  label?: string;
  href?: string;
  username?: string;
  userId?: string;
}

const PostSettings: React.FC<PostSettingsButtonProps> = ({
  label,
  href,
  username,
  userId,
}) => {
  const router = useRouter();
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser();

//   console.log("userId", userId);
//   console.log("currentuser", currentUser);

  const onClick = useCallback(() => {
    if(!currentUser)
        loginModel.onOpen();

  }, [loginModel]);

  return (
    <Popover>
      <PopoverHandler>
        <Button className="p-0 flex-end">
             <BiDotsHorizontalRounded color="white" size={20}/>
        </Button>
      </PopoverHandler>
      <PopoverContent className="bg-neutral-800 p-0">
        <div className=" relative flex flex-row">
          <Button
            size="md"
            variant="text"
            className="flex items-center text-white text-base"
            // onClick={() => signOut()}
          >
            <div className="p-1">
              <BiLogOut color="white" size={20}/>
            </div>
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostSettings;
