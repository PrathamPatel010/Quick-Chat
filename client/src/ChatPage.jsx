import {useContext, useEffect, useState} from "react";
import Avatar from "./Avatar.jsx";
import {UserContext} from "./UserContext.jsx";
import Logo from "./Logo.jsx";
import axios from "axios";

const ChatPage = () => {
    const [ws,setWs] = useState(null);
    const [onlinePeople,setOnlinePeople] = useState({});
    const [selectedUserId,setSelectedUserId] = useState(null);
    const {username} = useContext(UserContext);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4040');
        setWs(ws);
        ws.addEventListener('message',handleMessage);
    }, []);


    function showOnlinePeople(peopleArray){
        let people = {};
        peopleArray.forEach(person=>{
            if(person.username!==username){
                people[person.userId]=person.username;
            }
        })
        setOnlinePeople(people);
        console.log(people);
    }
    function handleMessage(e){
        const messageData = JSON.parse(e.data);
        if('online' in messageData){
            showOnlinePeople(messageData.online);
        }
    }

    async function handleLogout(){
        const response = await axios.get('/api/v1/user/logout');
        if(response.data.status!==200){
            console.log('Some Error Occurred!! Try again after some time');
            return;
        }
        console.log(response.data);
        window.location.href="/";
    }
    return(
        <>
            <div className={'flex h-screen'}>
                <div className={'bg-blue-100 flex flex-col w-1/4 p-2'}>
                    <div className={'flex-grow'}>
                    <Logo/>
                    {
                        Object.keys(onlinePeople).map((userId)=> {
                            return(
                            <div onClick={()=>setSelectedUserId(userId)} key={userId}
                            className={
                                "flex items-center cursor-pointer gap-2 border-2 border-gray-300 py-2 pl-2 " + (userId===selectedUserId ? 'bg-blue-300 pl-4' : '')}>
                                <Avatar username={onlinePeople[userId]} userId={userId}/>
                                {onlinePeople[userId]}
                            </div>
                            )
                        })
                    }
                    </div>
                    <div className={'p-2 flex justify-center items-center gap-2 text-center'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                        {username}
                        <button onClick={handleLogout} className={'text-sm rounded text-gray-700 bg-blue-300 py-1 px-2'}>Logout</button>
                    </div>
                </div>
                <div className={'flex flex-col bg-blue-300 w-3/4 p-2'}>
                    <div className={'flex-grow text-black-20'}>
                        Select a person from the side-bar to message
                    </div>
                    <div className={'flex gap-1 mx-1'}>
                        <input type={'text'} placeholder={'Type Your Message'}
                               className={'flex-grow bg-white border p-1 rounded'}
                        />
                        <button className={'bg-blue-500 p-1 text-white'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage;