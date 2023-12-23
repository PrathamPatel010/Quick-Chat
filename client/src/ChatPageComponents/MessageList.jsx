import { useEffect } from 'react';
import Message from './Message.jsx';

// eslint-disable-next-line react/prop-types
const MessageList = ({ scrollToBottom ,formattedMessages, id, handleScroll,messageContainerRef}) => {

    useEffect(() => {
        handleScroll();
        scrollToBottom();
    }, [formattedMessages]);

    return (
        <div onScroll={handleScroll} className="flex flex-col flex-grow overflow-y-scroll" ref={messageContainerRef}>
            {/* eslint-disable-next-line react/prop-types */}
            {formattedMessages.map((message) => (
                <div key={message._id} className={' ' + (message.sender === id ? 'text-right' : 'text-left')}>
                    <Message iSender={message.sender === id} message={message} id={id} />
                </div>
            ))}
        </div>
    );
};

export default MessageList;