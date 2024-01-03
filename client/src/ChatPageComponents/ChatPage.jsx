import {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { uniqBy } from 'lodash';
import ChatHeader from './ChatHeader';
import ChatSidebar from './ChatSidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { UserContext } from '../UserContext.jsx';
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
                <ChatSidebar username={username} onlinePeople={onlinePeople} offlinePeople={offlinePeople}
                    selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}
                    setSelectedUsername={setSelectedUsername} setIsSelectedOnline={setIsSelectedOnline}
                    logoutFunc={handleLogout}
                />
                <div className="flex flex-col bg-blue-200 lg:w-3/4 w-full p-2 pt-0 pl-0">
                    {(!selectedUserId && (
                        <div className="flex justify-center items-center h-screen text-gray-500">
                            Select a person from the side-bar to message
                        </div>
                    ))}
                    {selectedUserId && (
                        <>
                            <ChatHeader selectedUserId={selectedUserId} selectedUsername={selectedUsername} isSelectedOnline={isSelectedOnline} setSelectedUserId={setSelectedUserId} />
                            <MessageList scrollToBottom={scrollToBottom} handleScroll={handleScroll} id={id}
                                         formattedMessages={formattedMessages} messageContainerRef={messageContainerRef} />
                            {selectedUserId && (
                                <>
                                    {!isScrollAtBottom && (
                                        <div className="flex justify-end pr-3 pb-1 cursor-pointer">
                                            <svg style={{ opacity: 0.8 }} onClick={scrollToBottom} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
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