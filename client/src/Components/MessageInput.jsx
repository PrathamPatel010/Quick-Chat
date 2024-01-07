// MessageInput.jsx

// eslint-disable-next-line react/prop-types
const MessageInput = ({ sendMessage, textMessage, setTextMessage }) => {
    const sendFile = async(e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            sendMessage(null,{
                name:e.target.files[0].name,
                data:reader.result
            });
        }
    }

    return (
        <form onSubmit={sendMessage} className="sticky bottom-0 flex gap-1 justify-evenly mx-1">
            <>
            <input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                placeholder="Type Your Message"
                className="w-full bg-[#1f1f1f] text-white border-none p-1 rounded"
                required={true}
            />
            <label className={'p-1 bg-[#2f2f2f] rounded-sm border border-[#2f2f2f] text-white cursor-pointer'}>
                <input type={'file'} className={'hidden'} onChange={sendFile} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
            </label>
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