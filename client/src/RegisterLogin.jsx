import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";

const RegisterLogin = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(true);
    const [acknowledgment,setAcknowledgement] = useState('');
    const [isPasswordVisible,setIsPasswordVisible] = useState(false);
    const{setUsername:setLoggedInUsername,setId} = useContext(UserContext);


    const togglePassword = () => {
        setIsPasswordVisible((prev)=>!prev);
    }

    const handleForm = async(e) => {
        e.preventDefault();
        const endPoint = (isLogin) ? 'login' : 'register';
        const response = await axios.post(`/api/v1/user/${endPoint}`,{username,password});
        setAcknowledgement(response.data.message);
        if(response.data.status!==200){
            document.getElementById('ack-div').style.color='red';
            setPassword('');
            return;
        }
        document.getElementById('ack-div').style.color='green';
        setLoggedInUsername(username);
        setId(response.data.id);
    }

    return(
        <>
            <section className={'flex justify-center items-center gap-2 text-center pt-3'}>
                <h1 className={'text-[#ffe6a7] text-2xl'}>QuickChat</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffe6a7" className="w-6 h-6">
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                </svg>
            </section>

            <section className={'form'}>
                <form onSubmit={handleForm} className={'flex-col justify-center text-center w-64 mx-auto px-3'}>
                    <input value={username} onChange={(e)=>{setUsername(e.target.value);setAcknowledgement('');}}
                           className={'text-[#ffe6a7] bg-[#3b393e] border-2 border-white block w-full rounded-sm p-1 mt-2'} type={'text'} placeholder={'Username'} required={true} autoComplete={'username'}/>
                    <div className={'bg-[#3b393e] border-2 border-white flex gap-1 rounded-sm justify-between items-center mt-3 p-1'}>
                        <input id={'password'} value={password} onChange={(e)=>{setPassword(e.target.value);setAcknowledgement('');}}
                               className={'text-[#ffe6a7] bg-[#3b393e] border-white block w-full'} type={isPasswordVisible ? 'text' : 'password'} placeholder={'Password'} required={true} autoComplete={'current-password'}/>
                        {
                            isPasswordVisible ? (
                                <svg onClick={togglePassword} className={"text-white w-5 h-5 cursor-pointer"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                                    <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                                </svg>

                            ) : (
                                <svg onClick={togglePassword} className="text-[#ffe6a7] w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            )
                        }
                    </div>
                    <button className={'mt-5 py-1 block w-full rounded-md border-2 border-white bg-blue-500 hover:bg-[#3b393e] text-white'} type={'submit'}>
                        {isLogin ? ('Login') : ('Register')}
                    </button>
                <div id={'ack-div'} className={'py-2 text-white text-center'}>
                    {acknowledgment}
                </div>
                <div className={'text-center text-white'}>
                    {
                        (isLogin) ? (
                            <>
                                <button className={'no-underline bg-[#e3ae3e] py-1 px-2 rounded-md text-white hover:text-black'} type={'button'} onClick={()=>{setUsername('');setPassword('');setAcknowledgement('');setIsLogin(!isLogin)}}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Don't have account yet? Sign-up Here
                                </button>
                            </>
                        ) : (
                            <>
                                <button className={'no-underline bg-[#e3ae3e] py-1 px-2 rounded-md text-white hover:text-black'} type={'button'} onClick={()=>{setUsername('');setPassword('');setAcknowledgement('');setIsLogin(!isLogin)}}>
                                Already a user? <br></br> Login Here
                                </button>
                            </>
                        )
                    }
                </div>
                    {
                        isLogin && (
                            <div className={'text-xs text-center flex justify-center items-center mt-2 text-white'}>
                                Test User-1:Coder1, password:coder123<br></br>
                                Test User-2:Coder2, password:coder321
                            </div>
                        )
                    }
                </form>
            </section>
        </>
    )
}

export default RegisterLogin;