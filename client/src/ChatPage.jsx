import {useContext, useEffect, useRef, useState} from "react";
import Avatar from "./Avatar.jsx";
import {UserContext} from "./UserContext.jsx";
import Logo from "./Logo.jsx";
import axios from "axios";
import {uniqBy} from "lodash";
import {Contact} from "./Contact.jsx";
import Message from "./Message.jsx";

const ChatPage = () => {
    const [ws,setWs] = useState(null);
    const [onlinePeople,setOnlinePeople] = useState({});
    const [offlinePeople,setOfflinePeople] = useState({});
    const [selectedUserId,setSelectedUserId] = useState(null);
    const [selectedUsername,setSelectedUsername] = useState('');
    const [textMessage,setTextMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const [isScrollAtBottom,setIsScrollAtBottom] = useState(true);
    const [isSelectedOnline,setIsSelectedOnline] = useState(false);
    const {username,id} = useContext(UserContext);
    const messageContainerRef = useRef();
    useEffect(() => {
        connectToWS();
    }, [selectedUserId]);


    function connectToWS(){
        const ws = new WebSocket('ws://localhost:4040');
        setWs(ws);
        ws.addEventListener('message',handleMessage);
        ws.addEventListener('close',()=>{
            setTimeout(()=>{
                console.log('Disconnected!! Trying to reconnect!!');
                connectToWS();
            },1000);
        })
    }


    function showOnlinePeople(peopleArray){
        let people = {};
        peopleArray.forEach(person=>{
            if(person.username!==username){
                people[person.userId]=person.username;
            }
        })
        setOnlinePeople(people);
    }
    function handleMessage(e){
        const messageData = JSON.parse(e.data);
        if('online' in messageData){
            showOnlinePeople(messageData.online);
        } else if('text' in messageData){
            setMessages(prevState => ([...prevState,{...messageData}]));
        }
    }

    function sendMessage(e){
        e.preventDefault();
        const createdAt = new Date().toISOString();
        ws.send(JSON.stringify({
            recipient:selectedUserId,
            text:textMessage,
            createdAt
        }));
        setMessages(prevState => ([...prevState,{text:textMessage,sender:id,recipient:selectedUserId,_id:Date.now(),createdAt:new Date().toISOString()}]));
        setTextMessage('');
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

    const formattedMessages = uniqBy(messages,'_id');
    function scrollToBottom(){
        const container = messageContainerRef.current;
        if (container){
            container.scrollTop = container.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [formattedMessages]);

    function handleScroll(){
        const container = messageContainerRef.current;
        if(container){
            const marginOfError = 1;
            // Check if the scroll is close to the bottom within the margin of error
            const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - marginOfError;
            setIsScrollAtBottom(isAtBottom);
        }
    }

    useEffect(()=>{
        if (selectedUserId){
            axios.get(`/api/v1/message/${selectedUserId}`).then((response)=>{
                setMessages(response.data);
            });
        }
    },[selectedUserId])

    useEffect(()=>{
        axios.get('/api/v1/people').then((response)=>{
            const people = response.data.filter(p=>p._id!==id);
            const offlinePeopleArr = people.filter(p=>!Object.keys(onlinePeople).includes(p._id));
            const offlinePeople = {};
            offlinePeopleArr.forEach(p=>{
                offlinePeople[p._id] = p;
            });
            setOfflinePeople(offlinePeople);
        });
    },[onlinePeople]);

    return(
        <>
            <div className={'flex h-screen'}>
                <div className={'bg-blue-100 flex flex-col w-1/4 p-2'}>
                    <div className={'flex-grow'}>
                    <Logo/>
                    {
                        Object.keys(onlinePeople).map((userId)=> {
                            return(
                                    <Contact
                                        key={userId}
                                        id={userId}
                                        online={true}
                                        username={onlinePeople[userId]}
                                        onClick={()=>{setSelectedUserId(userId);setSelectedUsername(onlinePeople[userId]);setIsSelectedOnline(true);}}
                                        selected={userId===selectedUserId}
                                    />
                            )})
                    }
                    {
                        Object.keys(offlinePeople).map((userId)=> {
                            return(
                                <Contact
                                    key={userId}
                                    id={userId}
                                    online={false}
                                    username={offlinePeople[userId].username}
                                    onClick={()=>{setSelectedUserId(userId);setSelectedUsername(offlinePeople[userId].username);setIsSelectedOnline(false);}}
                                    selected={userId===selectedUserId}
                                />
                            )})
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
                <div className={'flex flex-col bg-blue-200 w-3/4 p-2 pt-0 pl-0'}>
                    {
                        (!selectedUserId) && (
                            <div className={'flex justify-center items-center h-screen text-gray-500'}>
                                Select a person from the side-bar to message
                            </div>
                        )
                    }
                    {
                        (selectedUserId) && (
                            <>
                                <div className={'flex items-center gap-1 w-full max-h-fit bg-blue-400 pl-2 py-2'}>
                                    <div onClick={()=>setSelectedUserId(null)} className={'cursor-pointer'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <Avatar online={isSelectedOnline} username={selectedUsername} userId={selectedUserId}/>
                                    <span> {selectedUsername}</span>
                                </div>

                            <div onScroll={handleScroll} className={'flex flex-col flex-grow overflow-y-scroll'} ref={messageContainerRef}>
                                {formattedMessages.map(message=>{
                                    return(
                                        <div key={message._id} className={' ' + (message.sender===id ? 'text-right' : 'text-left')}>
                                            <Message message={message} id={id}/>
                                        </div>
                                    )
                                })}
                            </div>
                            </>
                        )
                    }
                    {
                        (selectedUserId) && (
                            <>{
                                !isScrollAtBottom && (
                            <div className={'flex justify-end pr-3 pb-1 cursor-pointer'}>
                                <svg onClick={scrollToBottom} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                                </svg>
                            </div>
                                )
                            }
                            <form onSubmit={sendMessage} className={'flex gap-1 mx-1'}>
                                <input value={textMessage} onChange={(e)=>setTextMessage(e.target.value)}
                                       type={'text'} placeholder={'Type Your Message'}
                                       className={'flex-grow bg-white border p-1 rounded'}
                                />
                                <button type={'submit'} className={'bg-blue-500 p-1 text-white'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                </button>
                            </form>
                            </>
                        )}
                </div>
            </div>
        </>
    )
}

export default ChatPage;