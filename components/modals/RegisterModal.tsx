import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen()
    }, [isLoading, registerModal, loginModal])
    

    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true)
            // Todo Reg add login
            registerModal.onClose()
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }, [registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
               <Input
            placeholder="Name"
            type="text"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
            />
               <Input
            placeholder="Username"
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
            />
            <Input
            placeholder="Email"
            type="text"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            />
              <Input
            placeholder="Password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            />
        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account? <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign in</span></p>
        </div>
    )
    return (
        <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}/>
    )
}
export default RegisterModal