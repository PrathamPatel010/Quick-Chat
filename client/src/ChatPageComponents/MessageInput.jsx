// MessageInput.jsx

// eslint-disable-next-line react/prop-types
const MessageInput = ({ sendMessage, textMessage, setTextMessage }) => {
    return (
        <form onSubmit={sendMessage} className="sticky bottom-0 flex justify-evenly mx-1">
            <>
            <input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                placeholder="Type Your Message"
                className="w-full bg-[#1f1f1f] text-white border-none p-1 rounded"
                required={true}
            />
            <button style={{backgroundColor:'#2b2824'}} type="submit" className="p-1 text-white rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#2f2f2f" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </button>
            </>
        </form>
    );
};

export default MessageInput;