import { useEffect } from 'react';
import Message from './Message.jsx';

// eslint-disable-next-line react/prop-types
const MessageList = ({ isSmallScreen,scrollToBottom ,formattedMessages, id, handleScroll,messageContainerRef}) => {

    useEffect(() => {
        handleScroll();
        scrollToBottom();
    }, [formattedMessages]);

    return (
        // eslint-disable-next-line react/prop-types
        <div onScroll={handleScroll} className={`${isSmallScreen ? 'min-h-screen ' : 'min-h-32 '} ${formattedMessages.length===0 ? 'items-center justify-center ' : ' '}flex flex-col flex-grow overflow-y-scroll`} ref={messageContainerRef}>
            {/* eslint-disable-next-line react/prop-types */}
            {
                // eslint-disable-next-line react/prop-types
                formattedMessages.length===0 && (
                    <span className={'text-[#6b7280]'}>
                        There are no messages
                    </span>
                )
            }
            {formattedMessages.map((message) => (
                <div key={message._id} className={' ' + (message.sender === id ? 'text-right ' : 'text-left')}>
                    <Message iSender={message.sender === id} message={message} id={id} />
                </div>
            ))}
        </div>
    );
};

export default MessageList;