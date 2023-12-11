import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";

const RegisterLogin = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(true);
    const [acknowledgment,setAcknowledgement] = useState('');

    const{setUsername:setLoggedInUsername,setId} = useContext(UserContext);

    const handleForm = async(e) => {
        e.preventDefault();
        console.log(username,password);
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
            <section className={'flex justify-center text-center pt-3'}>
                <h1 className={'text-white text-2xl'}>QuickChat - A Messaging Platform</h1>
            </section>

            <section className={'form'}>
                <form onSubmit={handleForm} className={'flex-col justify-center text-center w-64 mx-auto px-3'}>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} className={'block w-full rounded-sm p-1 mt-2'} type={'text'} placeholder={'Username'} required={true} autoComplete={'username'}/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className={'block w-full rounded-sm p-1 mt-2'} type={'password'} placeholder={'Password'} required={true} autoComplete={'current-password'}/>
                    <button className={'block w-full rounded-sm mt-2 bg-blue-500 text-white'} type={'submit'}>
                        {isLogin ? ('Login') : ('Register')}
                    </button>
                </form>
                <div id={'ack-div'} className={'py-2 text-white text-center'}>
                    {acknowledgment}
                </div>
                <div className={'text-center text-white'}>
                    {
                        (isLogin) ? (
                            <>
                                Don't have account yet?
                                <button className={'text-purple-700 underline px-1'} type={'button'} onClick={()=>{setUsername('');setPassword('');setAcknowledgement('');setIsLogin(!isLogin)}}>
                                    Sign-up Here
                                </button>
                            </>
                        ) : (
                            <>
                                Already a user?
                                <button className={'text-purple-700 underline px-1'} type={'button'} onClick={()=>{setUsername('');setPassword('');setAcknowledgement('');setIsLogin(!isLogin)}}>
                                    Login Here
                                </button>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default RegisterLogin;