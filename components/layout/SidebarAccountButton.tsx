import useLoginModel from "@/hooks/useLoginModel";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiDotsVerticalRounded, BiLogOut } from "react-icons/bi";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";

interface SidebarAccountButtonProps {
  label?: string;
  href?: string;
  username?: string;
}

const SidebarAccountButton: React.FC<SidebarAccountButtonProps> = ({
  label,
  href,
  username,
}) => {
  const router = useRouter();
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if(!currentUser)
        loginModel.onOpen();

  }, [loginModel]);

  return (
    <Popover>
      <PopoverHandler>
        <Button>
        <div className="flex flex-col gap-6 mt-4">
         <div key={currentUser.id} className="flex flex-row gap-4">
           <Avatar userId={currentUser.id} />
           <div className="flex flex-col">
               <p className="text-white font-semibold text-sm">{currentUser.name}</p>
               <p className="text-neutral-400 text-sm">@{currentUser.username}</p>
           </div>
           <div className="align-center">
             <BiDotsVerticalRounded color="white" size={30}/>
           </div>
         </div>
       </div>
        </Button>
      </PopoverHandler>
      <PopoverContent className="bg-neutral-800 p-0">
        <div className=" relative flex flex-row">
          <Button
            size="md"
            variant="text"
            className="flex items-center text-white text-base"
            onClick={() => signOut()}
          >
            <div className="p-1">
              <BiLogOut color="white" size={20}/>
            </div>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SidebarAccountButton;
