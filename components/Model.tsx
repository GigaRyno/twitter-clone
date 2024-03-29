import { on } from "events";
import { useCallback } from "react";
import { AiOutlineClose} from "react-icons/ai";
import Button from "./Button";

interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
}

const Model: React.FC<ModelProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled
}) => {
    const handleClose = useCallback(() => {
        if(disabled) return;

        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    if(!isOpen) return null;

    return (  
        <>
            <div className="
               justify-center
               items-center
               flex
               overflow-x-hidden
               overflow-y-auto
               fixed
               inset-0
               z-50
               outline-none
               focus:outline-none
               bg-zinc-900
               bg-opacity-70
            ">
                <div className="
                    relative
                    w-full
                    lg:w-3/6
                    my-6
                    mx-auto
                    lg:max-w-3xl
                    h-full
                    lg:h-auto
                ">
                    {/* Content */}
                    <div className="
                        h-full
                        lg:h-auto
                        border-0
                        rounded-lg
                        shadow-lg
                        relative
                        flex
                        flex-col
                        w-full
                        bg-black
                        outline-none
                        focus:outline-none
                    ">
                        {/* Header */}
                        <div className="
                            flex
                            items-center
                            justify-between
                            px-5 pt-5
                            rounded-t
                        ">
                            <h3 className="text-3xl font-semibold text-white">{title}</h3>
                            <button
                                onClick={handleClose}
                                className="
                                    p-1
                                    ml-auto
                                    border-0
                                    text-white
                                    hover-oppacity-70
                                    transition
                                ">
                                <AiOutlineClose size={20}/>
                            </button>
                        </div>
                        {/* Body */}
                        <div className="relative p-5 flex-auto bg-black">
                            {body}
                        </div>
                        {/* Footer */}
                        <div className="flex flex-col gap-2 px-5 pb-5 rounded-lg bg-black">
                            <Button 
                                disabled={disabled}
                                label={actionLabel}
                                className="h-[48px]"
                                secondary
                                fullWidth
                                large
                                onClick={handleSubmit}/>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>   
        </>

     );
}

export default Model;