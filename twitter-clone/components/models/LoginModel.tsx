import useLoginModel from "@/hooks/useLoginModel";
import { log } from "console";
import { useCallback, useState } from "react";
import Model from "../Model";
import Input from "../input";
import useRegisterModel from "@/hooks/useRegisterModel";
import { signIn } from "next-auth/react";

const LoginModel = () => {
    const loginModel = useLoginModel();
    const registerModel = useRegisterModel();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading) return;

        loginModel.onClose();
        registerModel.onOpen();
    }, [isLoading, registerModel, loginModel]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await signIn('credentials', {email, password});

            loginModel.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModel, email, password]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Dont have an account?
                <span 
                    onClick={onToggle}
                    className="
                    text-white
                    cursor-pointer
                    hover:underline
                "> Create an account</span>
            </p>
        </div>
    )

    return (
        <Model
            disabled={isLoading}
            isOpen={loginModel.isOpen}
            title="Log in"
            actionLabel="Sign in"
            onClose={loginModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModel;