import useLoginModel from "@/hooks/useLoginModel";
import { log } from "console";
import { useRouter } from "next/router";
import { on } from "process";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModel = useLoginModel();

    const onClick = useCallback(() => {
        loginModel.onOpen();
    }, [loginModel]);

    return (
        <div onClick={onClick}>
            <div className="
                mt-6
                lg:hidden
                rounded-full
                h-14
                w-14
                p-4
                flex
                items-center
                justify-center
                bg-gradient-to-r from-cyan-500 to-blue-500
                hover:bg-oppacity-80
                transition
                cusror-pointer
                "
            >
                <FaFeather size={24} color="white"/>
            </div>
            <div className="
                mt-6
                hidden
                lg:block
                px-4
                py-2
                rounded-full
                bg-gradient-to-r from-cyan-500 to-blue-500
                hover:bg-opacity-90
                cursor-pointer
                transition
                ">
                    <p className="
                        hidden
                        lg:block
                        text-center
                        font-semibold
                        text-white
                        text-[20px]
                    ">
                        Tweet
                    </p>
                </div>
        </div>
    );
}

export default SidebarTweetButton;