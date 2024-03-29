import React from "react";

interface ButtonProps {
    label?: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    follow?: boolean;
    itemButton?: boolean;
    profileButton?: boolean;
    onClick: () => void;
    disabled?: boolean;
    outline?: boolean;
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    large,
    follow,
    profileButton,
    itemButton,
    onClick,
    disabled,
    outline,
    className,
    onMouseEnter,
    onMouseLeave
    }) => {
    return ( 
        <button
            disabled={disabled}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`
                disabled:opacity-50
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                text-justyify
                items-center
                hover:bg-opacity-70
                transition
                text-center
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-white' : 'bg-sky-500'}
                ${secondary ? 'text-black' : 'text-white'}
                ${secondary ? 'border-black' : 'border-sky-500'}
                ${large ? 'text-xl' : 'text-md'}
                ${follow ? 'hover:bg-red-900 hover:border-red-500 hover:text-red-500 hover:bg-opacity-25' : ''}
                ${itemButton ? 'px-4' : 'px-4'}
                ${profileButton ? 'w-[104px] h-8' : 'w-[104px] h-8'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
                ${className}
                `}
        >
            {label}
        </button>

    );
}

export default Button;