import {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { uniqBy } from 'lodash';
import ChatHeader from './Components/ChatHeader.jsx';
import ChatSidebar from './Components/ChatSideBar.jsx';
import MessageList from './Components/MessageList.jsx';
import MessageInput from './Components/MessageInput.jsx';
import { UserContext } from './UserContext.jsx';
import {useMediaQuery} from "react-responsive";
const ChatPage = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = import.meta.env.VITE_HOST_URL;
    const isSmallScreen = useMediaQuery({query:'(max-width: 1000px)'});
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
        const ws = new WebSocket(`${protocol}${host}`);
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

    async function sendMessage(e,file=null){
        if(e) e.preventDefault();
        const createdAt = new Date().toISOString();
        ws.send(JSON.stringify({
            recipient:selectedUserId,
            text:textMessage,
            createdAt,
            file
        }));
        if (file){
            const res = await axios.get(`/api/v1/message/${selectedUserId}`);
            setMessages(res.data);
        } else{
            setMessages(prevState => ([...prevState,{text:textMessage,sender:id,recipient:selectedUserId,_id:Date.now(),createdAt:new Date().toISOString(),delivered:true}]));
            setTextMessage('');
        }
    }

    async function handleLogout(){
        const response = await axios.get('/api/v1/user/logout');
        if(response.data.status!==200){
            console.log('Some Error Occurred!! Try again after some time');
            return;
        }
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
    },[onlinePeople,id]);


    return (
        <>
            <div className="lg:flex h-screen">
                {
                    (isSmallScreen && !selectedUserId) && (
                        <ChatSidebar username={username} onlinePeople={onlinePeople} offlinePeople={offlinePeople}
                            selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}
                            setSelectedUsername={setSelectedUsername} setIsSelectedOnline={setIsSelectedOnline}
                            logoutFunc={handleLogout}
                        />
                    )
                }
                {
                    !isSmallScreen && (
                        <ChatSidebar username={username} onlinePeople={onlinePeople} offlinePeople={offlinePeople}
                                     selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}
                                     setSelectedUsername={setSelectedUsername} setIsSelectedOnline={setIsSelectedOnline}
                                     logoutFunc={handleLogout}
                        />
                    )
                }
                <div className={`flex flex-col bg-[#181818] ${isSmallScreen ? 'min-w-full' : 'lg:w-3/4'} p-2 pt-0 pl-0`}>
                {(!selectedUserId && (
                        <div className={`flex justify-center items-center ${isSmallScreen ? 'h-10 ' :'h-screen '} text-gray-500`}>
                            Select a person {isSmallScreen ? ' to message ' : ' from the side-bar to message'}
                        </div>
                    ))}
                    {selectedUserId && (
                        <>
                            <ChatHeader selectedUserId={selectedUserId} selectedUsername={selectedUsername} isSelectedOnline={isSelectedOnline} setSelectedUserId={setSelectedUserId} />
                            <MessageList isSmallScreen={isSmallScreen} scrollToBottom={scrollToBottom} handleScroll={handleScroll} id={id}
                                         formattedMessages={formattedMessages} messageContainerRef={messageContainerRef} />
                            {selectedUserId && (
                                <>
                                    {!isScrollAtBottom && (
                                        <div className="flex bg-[] justify-end pr-3 pb-1 cursor-pointer">
                                            <svg style={{ opacity: 0.8 }} onClick={scrollToBottom} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fill={'white'} fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                    <MessageInput scrollToBottom={scrollToBottom} sendMessage={sendMessage} textMessage={textMessage} setTextMessage={setTextMessage} />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatPage;