const ChatPage = () => {
    return(
        <>
            <div className={'flex h-screen'}>
                <div className={'bg-blue-100 w-1/4'}>Contacts</div>
                <div className={'flex flex-col bg-blue-300 w-3/4 p-2'}>
                    <div className={'flex-grow'}>
                        Messages With The Person
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